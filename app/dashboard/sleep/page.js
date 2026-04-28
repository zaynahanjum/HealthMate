"use client";

import React, { useState, useEffect } from "react";
import { Moon, Clock, Sparkles, Plus, Star, MoonStar } from "lucide-react";

export default function SleepLog() {
  const [sleepRecords, setSleepRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [hours, setHours] = useState("");
  const [quality, setQuality] = useState("Good");

  // Fetch initial data
  useEffect(() => {
    const fetchSleepData = async () => {
      try {
        const res = await fetch("/api/sleep");
        const data = await res.json();
        // Assuming your backend returns an array under 'records'
        // setSleepRecords(data.records || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch sleep data", error);
        setLoading(false);
      }
    };
    fetchSleepData();
  }, []);

  // Handle form submission
  const handleAddSleep = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/sleep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hours, quality }),
      });
      
      if (res.ok) {
        setSleepRecords([
          { date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }), hours, quality },
          ...sleepRecords
        ]);
        setHours("");
        setQuality("Good");
      }
    } catch (error) {
      console.error("Failed to save sleep record", error);
    }
  };

  // Helper to color-code the quality badges using your earthy aesthetic
  const getQualityColor = (quality) => {
    switch (quality) {
      case "Excellent": return "bg-[#E1EAE5] text-[#455D54] border-[#C5D8CD]"; // Sage Green
      case "Good": return "bg-blue-50 text-blue-800 border-blue-200"; 
      case "Fair": return "bg-orange-50 text-orange-800 border-orange-200";
      case "Poor": return "bg-[#F3E8E8] text-[#8C5A5D] border-[#E3D1D2]"; // Muted Mauve (from your Quick Meds button)
      default: return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDF9] font-sans text-[#2F3E38] selection:bg-[#E1EAE5]">
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Header Section */}
        <header className="mb-12 flex items-center space-x-4">
          <div className="p-3 bg-[#455D54] text-[#FDFDF9] rounded-2xl shadow-lg shadow-[#455D54]/20">
            <MoonStar size={32} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-[#2F3E38] tracking-tight mb-1">Sleep Dashboard</h1>
            <p className="text-[#5A7067] font-medium">Track your rest, optimize your recovery.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add Record Form - Left Column */}
          <section className="lg:col-span-1">
            <div className="bg-white p-7 rounded-3xl border border-[#EBECE7] shadow-xl shadow-[#455D54]/5 sticky top-8">
              <div className="flex items-center space-x-2 mb-6">
                <Plus size={20} className="text-[#455D54]" />
                <h2 className="text-xl font-bold text-[#2F3E38]">Log Sleep</h2>
              </div>
              
              <form onSubmit={handleAddSleep} className="space-y-5">
                {/* Hours Input */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-[#4A5D56] mb-2">
                    <Clock size={16} className="mr-2 text-[#8E9F97]" />
                    Hours Slept
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      step="0.5"
                      min="0"
                      max="24"
                      required
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-[#EBECE7] text-[#2F3E38] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#455D54] focus:border-[#455D54] focus:bg-white transition-all outline-none"
                      placeholder="e.g., 7.5"
                    />
                    <span className="absolute right-4 top-3.5 text-[#8E9F97] font-medium text-sm">hrs</span>
                  </div>
                </div>

                {/* Quality Select */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-[#4A5D56] mb-2">
                    <Sparkles size={16} className="mr-2 text-[#8E9F97]" />
                    Sleep Quality
                  </label>
                  <div className="relative">
                    <select 
                      value={quality}
                      onChange={(e) => setQuality(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-[#EBECE7] text-[#2F3E38] rounded-xl px-4 py-3 appearance-none focus:ring-2 focus:ring-[#455D54] focus:border-[#455D54] focus:bg-white transition-all outline-none"
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                    {/* Custom Dropdown Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#8E9F97]">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="w-full mt-4 bg-[#455D54] hover:bg-[#344840] text-[#FDFDF9] font-semibold py-3.5 rounded-xl transition-all active:scale-[0.98] shadow-md shadow-[#455D54]/20 flex justify-center items-center space-x-2"
                >
                  <span>Save Record</span>
                </button>
              </form>
            </div>
          </section>

          {/* Records Display Area - Right Column */}
          <section className="lg:col-span-2">
            <h2 className="text-xl font-bold text-[#2F3E38] mb-6 flex items-center">
              <Star size={20} className="mr-2 text-amber-400 fill-amber-400" />
              Recent Records
            </h2>
            
            <div className="space-y-4">
              {loading ? (
                // Loading Skeleton
                <div className="animate-pulse bg-[#EBECE7] rounded-2xl h-24 w-full"></div>
              ) : sleepRecords.length === 0 ? (
                // Empty State
                <div className="bg-white border border-dashed border-[#C5D8CD] rounded-3xl p-12 text-center shadow-sm">
                  <div className="bg-[#E1EAE5] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Moon className="text-[#455D54]" size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-[#2F3E38] mb-1">No sleep data yet</h3>
                  <p className="text-[#5A7067]">Your logged sleep records will appear right here.</p>
                </div>
              ) : (
                // Populated List
                <div className="grid gap-4">
                  {sleepRecords.map((record, index) => (
                    <div 
                      key={index} 
                      className="bg-white border border-[#EBECE7] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-[#E1EAE5] text-[#455D54] p-3 rounded-xl group-hover:bg-[#455D54] group-hover:text-white transition-colors">
                          <Moon size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="font-semibold text-[#2F3E38] text-lg">
                            {record.hours} <span className="text-sm text-[#5A7067] font-normal">hours</span>
                          </p>
                          <p className="text-sm text-[#8E9F97]">{record.date || "Today"}</p>
                        </div>
                      </div>
                      
                      <div>
                        <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${getQualityColor(record.quality)}`}>
                          {record.quality}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}