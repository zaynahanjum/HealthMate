"use client";

import React, { useState, useEffect } from "react";
import { User, Mail, Settings, Bell, Shield, LogOut, Activity, Edit3, ChevronRight } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Alex",
    email: "alex@example.com",
    age: "28",
    height: "175", 
    weight: "72.0",  
    goal: "Gain Muscle",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch the user's data from the database on page load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setProfile({
            name: data.name || "",
            email: data.email || "",
            age: data.age || "",
            height: data.height || "",
            weight: data.weight || "",
            goal: data.goal || "Maintain Weight",
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // 2. Save the updated data back to the database
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        // Optional: Show a success message
        console.log("Profile successfully updated!");
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error saving profile", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return <div className="min-h-screen bg-[#FDFDF9] flex items-center justify-center text-[#455D54] font-semibold text-xl">Loading Profile...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FDFDF9] font-sans text-[#2F3E38] selection:bg-[#E1EAE5]">
      <main className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Header Section */}
        <header className="mb-10 flex items-center space-x-4">
          <div className="p-3 bg-[#455D54] text-[#FDFDF9] rounded-2xl shadow-lg shadow-[#455D54]/20">
            <User size={32} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-[#2F3E38] tracking-tight mb-1">Your Profile</h1>
            <p className="text-[#5A7067] font-medium">Manage your personal information and settings.</p>
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
                <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full border border-[#EBECE7] shadow-sm text-[#455D54] hover:bg-[#FAFAFA] transition-colors">
                  <Edit3 size={16} />
                </button>
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
              <button className="w-full flex items-center justify-between p-5 hover:bg-[#FAFAFA] transition-colors group">
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

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-[#4A5D56] mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={profile.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#FAFAFA] border border-[#EBECE7] text-[#2F3E38] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#455D54] focus:border-[#455D54] focus:bg-white transition-all outline-none"
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm font-semibold text-[#4A5D56] mb-2">Age</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        name="age"
                        value={profile.age}
                        onChange={handleInputChange}
                        className="w-full bg-[#FAFAFA] border border-[#EBECE7] text-[#2F3E38] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#455D54] focus:border-[#455D54] focus:bg-white transition-all outline-none"
                        placeholder="Years"
                      />
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