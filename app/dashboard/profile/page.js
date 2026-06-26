"use client";

import React, { useState, useEffect } from "react";
import { User, Mail, Settings, Bell, Shield, LogOut, Activity, Edit3, ChevronRight, AlertCircle, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { calculateGoals } from "@/lib/goals";

export default function ProfilePage() {
  const { user, loading: authLoading, token, logout } = useAuth();
  const router = useRouter();
  const [incomplete, setIncomplete] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    height: "", 
    weight: "",  
    goal: "Maintain Weight",
    activityLevel: "Sedentary",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setIncomplete(params.get('incomplete') === 'true');
      setIsNew(params.get('new') === 'true');
    }
  }, []);

  // 1. Fetch the user's data from the database on page load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setProfile({
            name: data.name || "",
            email: data.email || "",
            age: data.age || "",
            gender: data.gender || "",
            height: data.height || "",
            weight: data.weight || "",
            goal: data.goal || "Maintain Weight",
            activityLevel: data.activityLevel || "Sedentary",
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (token) {
      fetchProfile();
    } else if (!authLoading) {
      setIsLoading(false);
    }
  }, [token, authLoading]);

  // 2. Save the updated data back to the database
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const idToken = user ? await user.getIdToken() : token;

      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`
        },
        body: JSON.stringify(profile),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage("Profile saved successfully!");
        if (data.profile) {
          setProfile({
            name: data.profile.name || "",
            email: data.profile.email || "",
            age: data.profile.age || "",
            gender: data.profile.gender || "",
            height: data.profile.height || "",
            weight: data.profile.weight || "",
            goal: data.profile.goal || "Maintain Weight",
            activityLevel: data.profile.activityLevel || "Sedentary",
          });
        }
        if ((incomplete || isNew) && profile.name && profile.age && profile.gender && profile.height && profile.weight) {
          router.push('/');
        }
      } else {
        setErrorMessage(data.details || data.error || "Failed to update profile");
      }
    } catch (error) {
      setErrorMessage("Error saving profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const previewGoals = calculateGoals({
    weight: parseFloat(profile.weight) || null,
    height: parseFloat(profile.height) || null,
    age: parseInt(profile.age) || null,
    gender: profile.gender || null,
    activityLevel: profile.activityLevel,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  if (authLoading || isLoading) {
    return <div className="min-h-screen bg-[#FDFDF9] flex items-center justify-center text-[#455D54] font-semibold text-xl">Loading Profile...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FDFDF9] font-sans text-[#2F3E38] selection:bg-[#E1EAE5]">
      <main className="max-w-5xl mx-auto px-6 py-12">
        
        {isNew && (
          <div className="bg-[#455D54] text-white p-5 rounded-3xl mb-8 flex items-start gap-3.5 text-sm font-semibold shadow-lg shadow-[#455D54]/20">
            <Sparkles size={22} className="text-[#B8DBCF] shrink-0 mt-0.5" />
            <div>
              <p className="text-base font-extrabold text-white mb-1">Welcome to HealthMate! 🎉</p>
              You're all set. Fill in your details below so we can personalise your wellness dashboard just for you.
            </div>
          </div>
        )}

        {incomplete && !isNew && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-5 rounded-3xl mb-8 flex items-start gap-3.5 text-sm font-semibold shadow-sm">
            <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-base font-extrabold text-amber-900 mb-1">Incomplete Profile</p>
              Please complete your details (Name, Age, Gender, Height, Weight) to activate your Daily Wellness Tracker dashboard.
            </div>
          </div>
        )}

        {/* Header Section */}
        <header className="mb-10 flex items-center space-x-4">
          <div className="p-3 bg-[#455D54] text-[#FDFDF9] rounded-2xl shadow-lg shadow-[#455D54]/20">
            <User size={32} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-[#2F3E38] tracking-tight mb-1">
              {isNew ? 'Set Up Your Profile' : 'Your Profile'}
            </h1>
            <p className="text-[#5A7067] font-medium">
              {isNew ? 'Just a few details to personalise your experience.' : 'Manage your personal information and settings.'}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - User Summary & Navigation */}
          <section className="lg:col-span-1 space-y-6">
            
            {/* User Card */}
            <div className="bg-white p-7 rounded-3xl border border-[#EBECE7] shadow-xl shadow-[#455D54]/5 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-[#E1EAE5]/50 -z-10"></div>
              
              <div className="relative inline-block mb-4 mt-2">
                <div className="w-24 h-24 bg-[#455D54] text-white rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white shadow-sm mx-auto uppercase">
                  {profile.name ? profile.name.charAt(0) : "?"}
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-[#2F3E38]">{profile.name || "Add your name"}</h2>
              <p className="text-[#8E9F97] text-sm font-medium mb-6">{profile.email || "No email provided"}</p>
              
              <div className="flex justify-center space-x-4 border-t border-[#EBECE7] pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#455D54]">{profile.weight || "--"}</p>
                  <p className="text-xs font-semibold text-[#8E9F97] uppercase tracking-wider mt-1">kg</p>
                </div>
                <div className="w-px bg-[#EBECE7]"></div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#455D54]">{profile.height || "--"}</p>
                  <p className="text-xs font-semibold text-[#8E9F97] uppercase tracking-wider mt-1">cm</p>
                </div>
              </div>
            </div>

            {/* Quick Links Menu */}
            <div className="bg-white rounded-3xl border border-[#EBECE7] shadow-sm overflow-hidden">
              <button className="w-full flex items-center justify-between p-5 hover:bg-[#FAFAFA] transition-colors border-b border-[#EBECE7] group">
                <div className="flex items-center space-x-3 text-[#2F3E38] font-semibold">
                  <Bell size={20} className="text-[#8E9F97] group-hover:text-[#455D54] transition-colors" />
                  <span>Notifications</span>
                </div>
                <ChevronRight size={18} className="text-[#D1D5DB]" />
              </button>
              <button className="w-full flex items-center justify-between p-5 hover:bg-[#FAFAFA] transition-colors border-b border-[#EBECE7] group">
                <div className="flex items-center space-x-3 text-[#2F3E38] font-semibold">
                  <Shield size={20} className="text-[#8E9F97] group-hover:text-[#455D54] transition-colors" />
                  <span>Privacy & Security</span>
                </div>
                <ChevronRight size={18} className="text-[#D1D5DB]" />
              </button>
              <button 
                onClick={logout}
                className="w-full flex items-center justify-between p-5 hover:bg-red-50/50 transition-colors group"
              >
                <div className="flex items-center space-x-3 text-red-600 font-semibold">
                  <LogOut size={20} className="text-red-400 group-hover:text-red-600 transition-colors" />
                  <span>Sign Out</span>
                </div>
              </button>
            </div>
          </section>

          {/* Right Column - Edit Profile Form */}
          <section className="lg:col-span-2">
            <div className="bg-white p-8 rounded-3xl border border-[#EBECE7] shadow-sm">
              <div className="flex items-center space-x-2 mb-8">
                <Settings size={20} className="text-[#455D54]" />
                <h2 className="text-xl font-bold text-[#2F3E38]">Personal Information</h2>
              </div>
              
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-[#4A5D56] mb-2">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={profile.name}
                      onChange={handleInputChange}
                      className="w-full bg-[#FAFAFA] border border-[#EBECE7] text-[#2F3E38] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#455D54] focus:border-[#455D54] focus:bg-white transition-all outline-none"
                    />
                  </div>

                  {/* Email (read-only, managed by Firebase) */}
                  <div>
                    <label className="block text-sm font-semibold text-[#4A5D56] mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      readOnly
                      value={profile.email}
                      className="w-full bg-[#F0F0F0] border border-[#EBECE7] text-[#8E9F97] rounded-xl px-4 py-3 cursor-not-allowed outline-none"
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm font-semibold text-[#4A5D56] mb-2">Age</label>
                    <input 
                      type="number" 
                      name="age"
                      value={profile.age}
                      onChange={handleInputChange}
                      className="w-full bg-[#FAFAFA] border border-[#EBECE7] text-[#2F3E38] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#455D54] focus:border-[#455D54] focus:bg-white transition-all outline-none"
                      placeholder="Years"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-semibold text-[#4A5D56] mb-2">Gender</label>
                    <div className="relative">
                      <select 
                        name="gender"
                        value={profile.gender || ""}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-[#FAFAFA] border border-[#EBECE7] text-[#2F3E38] rounded-xl px-4 py-3 appearance-none focus:ring-2 focus:ring-[#455D54] focus:border-[#455D54] focus:bg-white transition-all outline-none"
                      >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#8E9F97]">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  {/* Activity Level */}
                  <div>
                    <label className="block text-sm font-semibold text-[#4A5D56] mb-2">Activity Level</label>
                    <div className="relative">
                      <select 
                        name="activityLevel"
                        value={profile.activityLevel}
                        onChange={handleInputChange}
                        className="w-full bg-[#FAFAFA] border border-[#EBECE7] text-[#2F3E38] rounded-xl px-4 py-3 appearance-none focus:ring-2 focus:ring-[#455D54] focus:border-[#455D54] focus:bg-white transition-all outline-none"
                      >
                        <option value="Sedentary">Sedentary</option>
                        <option value="Lightly Active">Lightly Active</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Very Active">Very Active</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#8E9F97]">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  {/* Goal */}
                  <div>
                    <label className="block text-sm font-semibold text-[#4A5D56] mb-2">Primary Goal</label>
                    <div className="relative">
                      <select 
                        name="goal"
                        value={profile.goal}
                        onChange={handleInputChange}
                        className="w-full bg-[#FAFAFA] border border-[#EBECE7] text-[#2F3E38] rounded-xl px-4 py-3 appearance-none focus:ring-2 focus:ring-[#455D54] focus:border-[#455D54] focus:bg-white transition-all outline-none"
                      >
                        <option value="Lose Weight">Lose Weight</option>
                        <option value="Maintain Weight">Maintain Weight</option>
                        <option value="Gain Muscle">Gain Muscle</option>
                        <option value="Improve Sleep">Improve Sleep</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#8E9F97]">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#EBECE7]">
                  {/* Height */}
                  <div>
                    <label className="block text-sm font-semibold text-[#4A5D56] mb-2">Height</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        name="height"
                        value={profile.height}
                        onChange={handleInputChange}
                        className="w-full bg-[#FAFAFA] border border-[#EBECE7] text-[#2F3E38] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#455D54] focus:border-[#455D54] focus:bg-white transition-all outline-none"
                        placeholder="cm"
                      />
                    </div>
                  </div>

                  {/* Weight */}
                  <div>
                    <label className="block text-sm font-semibold text-[#4A5D56] mb-2">Current Weight</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        name="weight"
                        step="0.1"
                        value={profile.weight}
                        onChange={handleInputChange}
                        className="w-full bg-[#FAFAFA] border border-[#EBECE7] text-[#2F3E38] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#455D54] focus:border-[#455D54] focus:bg-white transition-all outline-none"
                        placeholder="kg"
                      />
                    </div>
                  </div>
                </div>

                {/* Calculated Goals Preview */}
                <div className="pt-4 border-t border-[#EBECE7]">
                  <div className="flex items-center space-x-2 mb-4">
                    <Activity size={18} className="text-[#455D54]" />
                    <h3 className="text-sm font-bold text-[#2F3E38]">Your Daily Goals</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#FAFAFA] rounded-xl p-4 text-center border border-[#EBECE7]">
                      <p className="text-lg font-bold text-[#455D54]">{previewGoals.waterGoal.toLocaleString()}</p>
                      <p className="text-xs font-semibold text-[#8E9F97] uppercase">ml water</p>
                    </div>
                    <div className="bg-[#FAFAFA] rounded-xl p-4 text-center border border-[#EBECE7]">
                      <p className="text-lg font-bold text-[#455D54]">{previewGoals.calorieGoal.toLocaleString()}</p>
                      <p className="text-xs font-semibold text-[#8E9F97] uppercase">kcal</p>
                    </div>
                    <div className="bg-[#FAFAFA] rounded-xl p-4 text-center border border-[#EBECE7]">
                      <p className="text-lg font-bold text-[#455D54]">{previewGoals.proteinGoal}g</p>
                      <p className="text-xs font-semibold text-[#8E9F97] uppercase">protein</p>
                    </div>
                  </div>
                </div>

                {/* Feedback Messages */}
                {successMessage && (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl text-sm font-semibold">
                    {successMessage}
                  </div>
                )}
                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-sm font-semibold">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="w-full md:w-auto px-8 bg-[#455D54] hover:bg-[#344840] disabled:bg-[#8E9F97] text-[#FDFDF9] font-semibold py-3.5 rounded-xl transition-all active:scale-[0.98] shadow-md shadow-[#455D54]/20 flex items-center justify-center space-x-2"
                  >
                    {isSaving ? "Saving Changes..." : "Save Changes"}
                  </button>
                </div>
              </form>

            </div>
          </section>

        </div>
      </main>
    </div>
  );
}