'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Droplet, Pill, Moon, Utensils, PlayCircle, Lightbulb, Flame, ArrowRight, Activity } from 'lucide-react';

const HomePage = () => {
  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState("Hello");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      if (!data.error) {
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDF9]">
        <Activity className="animate-spin text-[#455D54]" size={48} />
      </div>
    );
  }

  const waterP = stats ? Math.min((stats.water.current / stats.water.goal) * 100, 100) : 0;
  const sleepP = stats ? Math.min((stats.sleep.current / stats.sleep.goal) * 100, 100) : 0;
  const dietP = stats ? Math.min((stats.diet.calories / stats.diet.goal) * 100, 100) : 0;
  const dailyScore = Math.round((waterP + sleepP + dietP) / 3);

  const formatTime = (timeStr) => {
    if (!timeStr) return null;
    const [h, m] = timeStr.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    return `${hour12}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-[#2F3E38] bg-[#FDFDF9] selection:bg-[#E1EAE5] overflow-hidden">
      <main className="flex-grow p-6 md:p-8 max-w-6xl mx-auto w-full">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16 pt-6 animate-in fade-in duration-700 slide-in-from-bottom-4">
          <div className="relative w-72 h-72 mb-8 group">
            <div className="absolute inset-0 bg-[#E1EAE5] rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
            
            <svg className="w-full h-full transform -rotate-90 relative z-10 drop-shadow-lg">
              <circle cx="144" cy="144" r="115" stroke="#EBECE7" strokeWidth="18" fill="transparent" />
              <circle
                cx="144" cy="144" r="115"
                stroke="#455D54" strokeWidth="18" fill="transparent" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 115}
                strokeDashoffset={mounted ? 2 * Math.PI * 115 * (1 - dailyScore/100) : 2 * Math.PI * 115}
                className="transition-all duration-[1500ms] ease-out delay-300"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 transition-transform duration-500 group-hover:scale-105">
              <span className="text-7xl font-extrabold text-[#2F3E38] tracking-tighter">{dailyScore}</span>
              <span className="text-[#8E9F97] font-bold tracking-widest uppercase text-xs mt-1">Daily Score</span>
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-[#2F3E38] mb-3">{greeting}, Alex!</h2>
          <p className="text-[#5A7067] font-medium max-w-md mx-auto text-lg">
            {dailyScore > 80 ? "You're crushing it! Keep up the amazing work." : "You're doing great. Just a few more tasks to hit your wellness goal today."}
          </p>
        </div>

        {/* Today's Progress Section */}
        <section className="mb-14">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h3 className="text-2xl font-extrabold text-[#2F3E38]">Today's Progress</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard/water" className="bg-[#455D54] text-[#FDFDF9] px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#344840] transition-all active:scale-95 shadow-md shadow-[#455D54]/20">
                <Droplet size={18} />
                Quick Water
              </Link>
              <Link href="/dashboard/medicine" className="bg-[#8C5A5D] text-[#FDFDF9] px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#7A4D50] transition-all active:scale-95 shadow-md shadow-[#8C5A5D]/20">
                <Pill size={18} />
                Quick Meds
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Medicines Card */}
            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-[#EBECE7] hover:shadow-xl hover:shadow-[#455D54]/5 hover:-translate-y-1.5 transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#F3E8E8] rounded-2xl flex items-center justify-center mb-6 text-[#8C5A5D] group-hover:scale-110 group-hover:rotate-3 transition-transform">
                <Pill size={26} />
              </div>
              <h4 className="text-[#8E9F97] font-bold text-xs uppercase tracking-widest mb-1">Medicines</h4>
              <div className="text-xl font-extrabold text-[#2F3E38] mb-4 min-h-[40px] flex items-center">
                {stats?.medicine?.next ? (
                  <span>Next: <span className="text-2xl">{stats.medicine.next}</span></span>
                ) : (
                  <span className="text-[#8E9F97]">No medicine today</span>
                )}
              </div>
              <div className="h-2.5 w-full bg-[#FAFAFA] rounded-full overflow-hidden mb-4 border border-[#EBECE7]/50">
                <div className="h-full bg-[#8C5A5D] rounded-full transition-all duration-1000 delay-100 ease-out" style={{ width: mounted ? (stats?.medicine?.count > 0 ? '100%' : '0%') : '0%' }} />
              </div>
              <p className="text-[#5A7067] text-xs font-semibold flex items-center gap-1">
                {stats?.medicine?.count || 0} scheduled for today
              </p>
            </div>

            {/* Water Card */}
            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-[#EBECE7] hover:shadow-xl hover:shadow-[#455D54]/5 hover:-translate-y-1.5 transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                <Droplet size={26} />
              </div>
              <h4 className="text-[#8E9F97] font-bold text-xs uppercase tracking-widest mb-1">Water</h4>
              <div className="text-3xl font-extrabold text-[#2F3E38] mb-4">{stats ? (stats.water.current / 1000).toFixed(1) : '0.0'}<span className="text-xl text-[#8E9F97]">L</span></div>
              <div className="h-2.5 w-full bg-[#FAFAFA] rounded-full overflow-hidden mb-4 border border-[#EBECE7]/50">
                <div className="h-full bg-blue-500 rounded-full transition-all duration-1000 delay-200 ease-out" style={{ width: mounted ? `${waterP}%` : '0%' }} />
              </div>
              <p className="text-[#5A7067] text-xs font-semibold">Goal: {stats ? (stats.water.goal / 1000).toFixed(1) : '2.5'}L</p>
            </div>

            {/* Sleep Card */}
            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-[#EBECE7] hover:shadow-xl hover:shadow-[#455D54]/5 hover:-translate-y-1.5 transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#E1EAE5] rounded-2xl flex items-center justify-center mb-6 text-[#455D54] group-hover:scale-110 group-hover:rotate-3 transition-transform">
                <Moon size={26} />
              </div>
              <h4 className="text-[#8E9F97] font-bold text-xs uppercase tracking-widest mb-1">Sleep</h4>
              <div className="text-3xl font-extrabold text-[#2F3E38] mb-4">{stats?.sleep?.current || 0}<span className="text-xl text-[#8E9F97]">h</span></div>
              <div className="h-2.5 w-full bg-[#FAFAFA] rounded-full overflow-hidden mb-4 border border-[#EBECE7]/50">
                <div className="h-full bg-[#455D54] rounded-full transition-all duration-1000 delay-300 ease-out" style={{ width: mounted ? `${sleepP}%` : '0%' }} />
              </div>
              <p className="text-[#5A7067] text-xs font-semibold">Goal: {stats?.sleep?.goal || 8}h</p>
            </div>

            {/* Diet Card */}
            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-[#EBECE7] hover:shadow-xl hover:shadow-[#455D54]/5 hover:-translate-y-1.5 transition-all duration-300 group">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-orange-500 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                <Utensils size={26} />
              </div>
              <h4 className="text-[#8E9F97] font-bold text-xs uppercase tracking-widest mb-1">Diet</h4>
              <div className="text-3xl font-extrabold text-[#2F3E38] mb-4">{stats ? (stats.diet.calories / 1000).toFixed(1) : '0.0'}<span className="text-xl text-[#8E9F97]">k</span></div>
              <div className="h-2.5 w-full bg-[#FAFAFA] rounded-full overflow-hidden mb-4 border border-[#EBECE7]/50">
                <div className="h-full bg-orange-400 rounded-full transition-all duration-1000 delay-500 ease-out" style={{ width: mounted ? `${dietP}%` : '0%' }} />
              </div>
              <p className="text-[#5A7067] text-xs font-semibold">Protein: {stats?.diet?.protein || 0}g</p>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#EBECE7] py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[#5A7067] text-sm">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-extrabold text-[#455D54] mb-2 flex items-center gap-2 justify-center md:justify-start">
              <Droplet size={20} className="fill-[#455D54]" /> HealthMate
            </h2>
            <p className="font-medium">© 2026 HealthMate. Nurturing your digital zen.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 font-bold text-[#2F3E38]">
            <Link href="#" className="hover:text-[#455D54] hover:underline underline-offset-4 transition-all">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#455D54] hover:underline underline-offset-4 transition-all">Terms of Service</Link>
            <Link href="#" className="hover:text-[#455D54] hover:underline underline-offset-4 transition-all flex items-center gap-1">
              Support <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;