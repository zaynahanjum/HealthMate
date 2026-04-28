'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Droplet, Pill, Moon, Utensils, PlayCircle, Lightbulb, Flame, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState("Hello");

  // Run animations and calculate time of day when page loads
  useEffect(() => {
    setMounted(true);
    
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans text-[#2F3E38] bg-[#FDFDF9] selection:bg-[#E1EAE5] overflow-hidden">
      <main className="flex-grow p-6 md:p-8 max-w-6xl mx-auto w-full">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16 pt-6 animate-in fade-in duration-700 slide-in-from-bottom-4">
          <div className="bg-[#E1EAE5] text-[#455D54] px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 mb-8 shadow-sm border border-[#C5D8CD] hover:scale-105 transition-transform cursor-default">
            <Flame size={16} className="text-orange-500 fill-orange-500" />
            5 days consistent
          </div>

          <div className="relative w-72 h-72 mb-8 group">
            {/* Background glowing blur */}
            <div className="absolute inset-0 bg-[#E1EAE5] rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
            
            <svg className="w-full h-full transform -rotate-90 relative z-10 drop-shadow-lg">
              {/* Background Track */}
              <circle cx="144" cy="144" r="115" stroke="#EBECE7" strokeWidth="18" fill="transparent" />
              {/* Progress Track (Animated) */}
              <circle
                cx="144" cy="144" r="115"
                stroke="#455D54" strokeWidth="18" fill="transparent" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 115}
                strokeDashoffset={mounted ? 2 * Math.PI * 115 * (1 - 0.82) : 2 * Math.PI * 115}
                className="transition-all duration-[1500ms] ease-out delay-300"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 transition-transform duration-500 group-hover:scale-105">
              <span className="text-7xl font-extrabold text-[#2F3E38] tracking-tighter">82</span>
              <span className="text-[#8E9F97] font-bold tracking-widest uppercase text-xs mt-1">Daily Score</span>
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-[#2F3E38] mb-3">{greeting}, Alex!</h2>
          <p className="text-[#5A7067] font-medium max-w-md mx-auto text-lg">
            You're doing great. Just a few more tasks to hit your wellness goal today.
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
              <div className="text-3xl font-extrabold text-[#2F3E38] mb-4">2<span className="text-xl text-[#8E9F97]">/3</span></div>
              <div className="h-2.5 w-full bg-[#FAFAFA] rounded-full overflow-hidden mb-4 border border-[#EBECE7]/50">
                <div className="h-full bg-[#8C5A5D] rounded-full transition-all duration-1000 delay-100 ease-out" style={{ width: mounted ? '66%' : '0%' }} />
              </div>
              <p className="text-[#5A7067] text-xs font-semibold flex items-center gap-1">Next: 8:00 PM</p>
            </div>

            {/* Water Card */}
            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-[#EBECE7] hover:shadow-xl hover:shadow-[#455D54]/5 hover:-translate-y-1.5 transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                <Droplet size={26} />
              </div>
              <h4 className="text-[#8E9F97] font-bold text-xs uppercase tracking-widest mb-1">Water</h4>
              <div className="text-3xl font-extrabold text-[#2F3E38] mb-4">1.8<span className="text-xl text-[#8E9F97]">L</span></div>
              <div className="h-2.5 w-full bg-[#FAFAFA] rounded-full overflow-hidden mb-4 border border-[#EBECE7]/50">
                <div className="h-full bg-blue-500 rounded-full transition-all duration-1000 delay-200 ease-out" style={{ width: mounted ? '72%' : '0%' }} />
              </div>
              <p className="text-[#5A7067] text-xs font-semibold">Goal: 2.5L</p>
            </div>

            {/* Sleep Card */}
            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-[#EBECE7] hover:shadow-xl hover:shadow-[#455D54]/5 hover:-translate-y-1.5 transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#E1EAE5] rounded-2xl flex items-center justify-center mb-6 text-[#455D54] group-hover:scale-110 group-hover:rotate-3 transition-transform">
                <Moon size={26} />
              </div>
              <h4 className="text-[#8E9F97] font-bold text-xs uppercase tracking-widest mb-1">Sleep</h4>
              <div className="text-3xl font-extrabold text-[#2F3E38] mb-4">7.5<span className="text-xl text-[#8E9F97]">h</span></div>
              <div className="h-2.5 w-full bg-[#FAFAFA] rounded-full overflow-hidden mb-4 border border-[#EBECE7]/50">
                <div className="h-full bg-[#455D54] rounded-full transition-all duration-1000 delay-300 ease-out" style={{ width: mounted ? '90%' : '0%' }} />
              </div>
              <p className="text-[#5A7067] text-xs font-semibold">Quality: Deep</p>
            </div>

            {/* Diet Card */}
            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-[#EBECE7] hover:shadow-xl hover:shadow-[#455D54]/5 hover:-translate-y-1.5 transition-all duration-300 group">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-orange-500 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                <Utensils size={26} />
              </div>
              <h4 className="text-[#8E9F97] font-bold text-xs uppercase tracking-widest mb-1">Diet</h4>
              <div className="text-3xl font-extrabold text-[#2F3E38] mb-4">1.4<span className="text-xl text-[#8E9F97]">k</span></div>
              <div className="h-2.5 w-full bg-[#FAFAFA] rounded-full overflow-hidden mb-4 border border-[#EBECE7]/50">
                <div className="h-full bg-orange-400 rounded-full transition-all duration-1000 delay-500 ease-out" style={{ width: mounted ? '60%' : '0%' }} />
              </div>
              <p className="text-[#5A7067] text-xs font-semibold">Protein: 65g</p>
            </div>

          </div>
        </section>

        {/* Activities and Tips Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Activity Card */}
          <div className="bg-white rounded-[32px] p-5 sm:p-7 shadow-sm border border-[#EBECE7] flex flex-col sm:flex-row items-center gap-8 group hover:shadow-lg hover:shadow-[#455D54]/5 transition-all duration-300">
            <div className="w-full sm:w-48 h-56 sm:h-48 rounded-[24px] overflow-hidden flex-shrink-0 bg-[#E1EAE5] relative">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#455D54_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <img src="/yoga.png" alt="Yoga" className="w-full h-full object-cover relative z-10 group-hover:scale-110 transition-transform duration-700" onError={(e) => e.target.style.display='none'} />
            </div>
            <div className="text-center sm:text-left">
              <div className="inline-block px-3 py-1 bg-[#F3F4F1] text-[#5A7067] rounded-lg text-xs font-bold uppercase tracking-wider mb-3">Suggested Activity</div>
              <h4 className="text-2xl font-bold text-[#2F3E38] mb-3">Morning Yoga</h4>
              <p className="text-[#5A7067] text-base mb-6 leading-relaxed">
                15 min stretching to start your day mindfully and boost circulation.
              </p>
              <Link href="#" className="inline-flex items-center gap-2 bg-[#455D54] text-[#FDFDF9] font-bold text-sm px-6 py-3 rounded-xl hover:bg-[#344840] transition-all active:scale-95 shadow-md shadow-[#455D54]/20">
                <PlayCircle size={18} />
                Start Session 
              </Link>
            </div>
          </div>

          {/* Health Tip Card */}
          <div className="bg-gradient-to-br from-[#E1EAE5] to-[#C5D8CD] rounded-[32px] p-8 shadow-sm border border-[#C5D8CD]/50 flex flex-col justify-center relative overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/40 rounded-full blur-3xl opacity-50 z-0 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="flex items-center justify-between mb-8 relative z-10">
              <h4 className="text-xl font-bold text-[#2F3E38] uppercase tracking-wider">Daily Insight</h4>
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md text-[#455D54] group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                <Lightbulb size={28} />
              </div>
            </div>
            <p className="text-[#2F3E38] text-xl font-medium leading-relaxed relative z-10">
              "Drinking water before meals can boost your metabolism by <span className="font-extrabold text-[#455D54] bg-white/50 px-2 py-0.5 rounded-md">24-30%</span> over a period of 1.5 hours."
            </p>
          </div>
        </div>
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