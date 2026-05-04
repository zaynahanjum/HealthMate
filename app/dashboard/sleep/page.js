"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun, Clock, TrendingUp } from "lucide-react";

export default function SleepTracker() {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [averageHours, setAverageHours] = useState(0);
  const [trend, setTrend] = useState([]);

  const [wentToBed, setWentToBed] = useState("22:30");
  const [wokeUpAt, setWokeUpAt] = useState("06:45");
  const [efficiency, setEfficiency] = useState(94);
  const [deepSleep, setDeepSleep] = useState("2h 10m");

  useEffect(() => {
    fetchSleepData();
  }, []);

  const fetchSleepData = async () => {
    try {
      const res = await fetch("/api/sleep");
      const data = await res.json();
      if (!data.error) {
        setRecords(data.records);
        setAverageHours(data.averageHours);
        setTrend(data.trend);
        
        if (data.records.length > 0) {
          const latest = data.records[0];
          setWentToBed(latest.wentToBed);
          setWokeUpAt(latest.wokeUpAt);
          setEfficiency(latest.efficiency || 94);
        }
      }
    } catch (error) {
      console.error("Failed to fetch sleep data", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateHours = (bed, wake) => {
    if (!bed || !wake) return 0;
    const [bedH, bedM] = bed.split(':').map(Number);
    const [wakeH, wakeM] = wake.split(':').map(Number);
    
    let bedDate = new Date();
    bedDate.setHours(bedH, bedM, 0, 0);
    
    let wakeDate = new Date();
    wakeDate.setHours(wakeH, wakeM, 0, 0);
    
    if (wakeDate < bedDate) {
      wakeDate.setDate(wakeDate.getDate() + 1);
    }
    
    const diffMs = wakeDate - bedDate;
    return diffMs / (1000 * 60 * 60);
  };

  const handleLogSleep = async () => {
    const hours = calculateHours(wentToBed, wokeUpAt);
    try {
      const res = await fetch("/api/sleep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wentToBed,
          wokeUpAt,
          hours,
          efficiency,
          quality: "Good"
        }),
      });
      if (res.ok) {
        fetchSleepData();
      }
    } catch (error) {
      console.error("Failed to log sleep session", error);
    }
  };

  const currentHours = calculateHours(wentToBed, wokeUpAt);
  const h = Math.floor(currentHours);
  const m = Math.round((currentHours - h) * 60);

  const ringRadius = 80;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const progress = Math.min((currentHours / 8) * 100, 100);
  const strokeDashoffset = ringCircumference - (progress / 100) * ringCircumference;

  return (
    <div className="min-h-screen bg-[#FDFDF9] font-sans text-[#2F3E38] selection:bg-[#E1EAE5]">
      <main className="max-w-6xl mx-auto px-6 py-12">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-[#2F3E38] tracking-tight mb-2">Sleep Tracking</h1>
          <p className="text-[#5A7067] font-medium max-w-md mx-auto">Sync your body's natural rhythm with deep insights into your nightly restoration.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Sleep Controls */}
          <div className="bg-[#F5F5F0] rounded-[32px] p-10 flex flex-col justify-between shadow-sm border border-[#EBECE7]">
            <div className="space-y-8">
              <div>
                <label className="block text-xs font-bold text-[#8E9F97] uppercase tracking-widest mb-4">Went to bed</label>
                <div className="flex items-center bg-[#EBECE7] rounded-2xl p-4 gap-4 transition-all focus-within:ring-2 focus-within:ring-[#455D54]">
                  <Moon className="text-[#455D54]" size={20} />
                  <input 
                    type="time" 
                    value={wentToBed}
                    onChange={(e) => setWentToBed(e.target.value)}
                    className="bg-transparent text-2xl font-bold text-[#2F3E38] outline-none w-full"
                  />
                  <Clock className="text-[#8E9F97]" size={20} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8E9F97] uppercase tracking-widest mb-4">Woke up at</label>
                <div className="flex items-center bg-[#EBECE7] rounded-2xl p-4 gap-4 transition-all focus-within:ring-2 focus-within:ring-[#455D54]">
                  <Sun className="text-[#455D54]" size={20} />
                  <input 
                    type="time" 
                    value={wokeUpAt}
                    onChange={(e) => setWokeUpAt(e.target.value)}
                    className="bg-transparent text-2xl font-bold text-[#2F3E38] outline-none w-full"
                  />
                  <Clock className="text-[#8E9F97]" size={20} />
                </div>
              </div>
            </div>

            <button 
              onClick={handleLogSleep}
              className="mt-12 w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 rounded-2xl transition-all active:scale-95 shadow-lg shadow-primary/20"
            >
              {records.some(r => new Date(r.date).toDateString() === new Date().toDateString()) ? "Update Sleep Session" : "Log Sleep Session"}
            </button>
          </div>

          {/* Sleep Status Graph */}
          <div className="bg-[#F5F5F0] rounded-[32px] p-10 flex flex-col items-center justify-center shadow-sm border border-[#EBECE7]">
            <div className="relative w-72 h-72 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90 drop-shadow-sm">
                <circle
                  cx="144" cy="144" r={ringRadius}
                  stroke="#E1EAE5" strokeWidth="12" fill="transparent"
                />
                <circle
                  cx="144" cy="144" r={ringRadius}
                  stroke="#455D54" strokeWidth="12" fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-700 ease-in-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-[#2F3E38]">{h}h {m}m</span>
                <span className="text-[10px] font-bold text-[#8E9F97] uppercase tracking-widest mt-1">Total Duration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Average Chart */}
        <div className="max-w-xl mx-auto">
          <div className="bg-[#F3F4ED] rounded-[32px] p-8 shadow-sm border border-[#EBECE7] flex flex-col justify-between group hover:shadow-lg transition-all duration-300 min-h-[300px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#8E9F97] uppercase tracking-widest">Weekly Average</span>
                <TrendingUp size={16} className="text-[#455D54]" />
              </div>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-extrabold text-[#2F3E38]">{averageHours}h</span>
                <span className="text-[#455D54] font-bold text-sm">/ night</span>
              </div>
            </div>
            
            <div className="flex items-end justify-between h-32 px-4">
              {trend.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-8 bg-[#E1EAE5] rounded-full h-full relative overflow-hidden group-hover:bg-white/50 transition-colors">
                    <div 
                      className={`absolute bottom-0 w-full bg-primary rounded-full transition-all duration-1000 ${item.hours > 0 ? (new Date().toLocaleDateString('en-US', { weekday: 'short' }) === item.day ? 'opacity-100' : 'opacity-60') : 'opacity-0'}`}
                      style={{ height: item.height }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-[#8E9F97]">{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#EBECE7] p-12 mt-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[#8E9F97] text-sm">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-xl font-extrabold text-[#455D54]">HealthMate</h2>
            <p className="font-medium">© 2026 HealthMate. Nurturing your digital zen.</p>
          </div>
          <div className="flex gap-8 font-bold text-[#2F3E38]">
            <a href="#" className="hover:text-[#455D54] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#455D54] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#455D54] transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}