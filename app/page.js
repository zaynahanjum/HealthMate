'use client';

import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col font-outfit text-foreground bg-[#FBFBF2]">
      <main className="flex-grow p-8 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16 pt-8">
          <div className="bg-[#D6E6E1] text-primary px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            5 days consistent 🔥
          </div>

          <div className="relative w-64 h-64 mb-8">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="100"
                stroke="#EFF1EA"
                strokeWidth="16"
                fill="transparent"
              />
              <circle
                cx="128"
                cy="128"
                r="100"
                stroke="currentColor"
                strokeWidth="16"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 100}
                strokeDashoffset={2 * Math.PI * 100 * (1 - 0.82)}
                className="text-primary"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-bold text-primary leading-none">82</span>
              <span className="text-secondary text-sm font-medium mt-1">Daily Score</span>
            </div>
          </div>

          <p className="text-secondary font-medium max-w-md mx-auto">
            You're doing great! Just a few more tasks to hit your wellness goal today.
          </p>
        </div>

        {/* Today's Progress Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h3 className="text-xl font-bold text-primary">Today's Progress</h3>
            <div className="flex gap-3">
              <Link href="/dashboard/water" className="bg-[#445E54] text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-[#384C44] transition-colors shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                Quick Water
              </Link>
              <Link href="/dashboard/medicine" className="bg-[#8E5D5D] text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-colors shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.77 7.77l-6.96 6.96a1 1 0 0 1-1.41-1.41l6.96-6.96a6 6 0 1 1 7.77-7.77l-3.77 3.77z"></path></svg>
                Quick Meds
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Medicines Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#EFF1EA] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#D6E6E1] rounded-full flex items-center justify-center mb-6">
                <svg className="text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.77 7.77l-6.96 6.96a1 1 0 0 1-1.41-1.41l6.96-6.96a6 6 0 1 1 7.77-7.77l-3.77 3.77z"></path></svg>
              </div>
              <h4 className="text-secondary font-bold text-sm uppercase tracking-wider mb-2">Medicines</h4>
              <div className="text-2xl font-bold text-primary mb-4">2/3</div>
              <div className="h-2 w-full bg-[#EFF1EA] rounded-full overflow-hidden mb-6">
                <div className="h-full bg-primary rounded-full w-[66%]" />
              </div>
              <p className="text-secondary/60 text-xs font-bold uppercase tracking-tighter">Next: 8:00 PM</p>
            </div>

            {/* Water Card */}
            <div className="bg-[#D6E6E1]/30 rounded-3xl p-6 shadow-sm border border-[#D6E6E1] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                <svg className="text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
              <h4 className="text-secondary font-bold text-sm uppercase tracking-wider mb-2">Water</h4>
              <div className="text-2xl font-bold text-primary mb-4">1.8L</div>
              <div className="h-2 w-full bg-[#EFF1EA] rounded-full overflow-hidden mb-6">
                <div className="h-full bg-primary rounded-full w-[72%]" />
              </div>
              <p className="text-secondary/60 text-xs font-bold uppercase tracking-tighter">Goal: 2.5L</p>
            </div>

            {/* Sleep Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#EFF1EA] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#EFF1EA] rounded-full flex items-center justify-center mb-6">
                <svg className="text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              </div>
              <h4 className="text-secondary font-bold text-sm uppercase tracking-wider mb-2">Sleep</h4>
              <div className="text-2xl font-bold text-primary mb-4">7.5h</div>
              <div className="h-2 w-full bg-[#EFF1EA] rounded-full overflow-hidden mb-6">
                <div className="h-full bg-primary rounded-full w-[90%]" />
              </div>
              <p className="text-secondary/60 text-xs font-bold uppercase tracking-tighter">Quality: Deep</p>
            </div>

            {/* Diet Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#EFF1EA] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#FDEAE4] rounded-full flex items-center justify-center mb-6">
                <svg className="text-[#E57A7A]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>
              </div>
              <h4 className="text-secondary font-bold text-sm uppercase tracking-wider mb-2">Diet</h4>
              <div className="text-2xl font-bold text-[#E57A7A] mb-4">1.4k</div>
              <div className="h-2 w-full bg-[#EFF1EA] rounded-full overflow-hidden mb-6">
                <div className="h-full bg-[#E57A7A] rounded-full w-[60%]" />
              </div>
              <p className="text-secondary/60 text-xs font-bold uppercase tracking-tighter">Protein: 65g</p>
            </div>
          </div>
        </section>

        {/* Activities and Tips Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Activity Card */}
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-[#EFF1EA] flex items-center gap-6 group hover:shadow-md transition-all">
            <div className="w-40 h-40 rounded-2xl overflow-hidden flex-shrink-0">
              <img src="/yoga.png" alt="Yoga" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-primary mb-2">Morning Yoga</h4>
              <p className="text-secondary/70 text-sm mb-4 leading-relaxed">
                15 min stretching to start your day mindfully.
              </p>
              <Link href="#" className="text-primary font-bold text-sm flex items-center gap-2 hover:translate-x-1 transition-transform">
                Start Session 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
            </div>
          </div>

          {/* Health Tip Card */}
          <div className="bg-soft-green/30 rounded-[32px] p-8 shadow-sm border border-[#EFF1EA] flex flex-col justify-center relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold text-primary">Health Tip</h4>
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
              </div>
            </div>
            <p className="text-primary/80 italic leading-relaxed">
              "Drinking water before meals can boost metabolism by 24-30% over a period of 1-1.5 hours."
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#EFF1EA] p-12 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-secondary text-sm">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-xl font-bold text-primary">HealthMate</h2>
            <p>© 2024 HealthMate. Nurturing your digital zen.</p>
          </div>
          <div className="flex gap-8 font-medium">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
