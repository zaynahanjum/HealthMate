'use client';

import React, { useState, useEffect } from 'react';

const WaterTrackerPage = () => {
  const [currentIntake, setCurrentIntake] = useState(0);
  const goal = 2500;
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({
    streak: 0,
    sinceLastDrink: 'No logs yet',
    weeklyTrend: []
  });
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [logsRes, statsRes] = await Promise.all([
        fetch('/api/water'),
        fetch('/api/water/stats')
      ]);

      const logsData = await logsRes.json();
      const statsData = await statsRes.json();

      if (logsData.logs) {
        setLogs(logsData.logs);
        setCurrentIntake(logsData.totalIntake);
      }
      if (!statsData.error) {
        setStats(statsData);
      }
    } catch (error) {
      console.error("Failed to fetch water data:", error);
    } finally {
      setLoading(false);
    }
  };

  const addIntake = async (amount, name = 'Custom Intake') => {
    const numAmount = parseInt(amount);
    try {
      const res = await fetch('/api/water', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: numAmount, name }),
      });

      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Failed to add water intake:", error);
    }
  };

  const handleQuickAdd = (amount, label) => {
    const nameMap = {
      'SMALL GLASS': 'Small Glass',
      'STANDARD BOTTLE': 'Standard Bottle',
      'LARGE BOTTLE': 'Large Bottle'
    };
    setSelectedAmount(amount);
    addIntake(amount, nameMap[label] || label);
  };

  const handleCustomAdd = (e) => {
    e.preventDefault();
    if (customAmount) {
      addIntake(customAmount);
      setCustomAmount('');
      setIsModalOpen(false);
    }
  };

  const progress = Math.min((currentIntake / goal) * 100, 100).toFixed(0);

  return (
    <div className="min-h-screen flex flex-col font-outfit text-foreground bg-background">
      <main className="flex-grow p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto w-full">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-8">
          {/* Progress Card */}
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] flex flex-col items-center justify-center text-center shadow-xl group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: 'url("/water-bg.png")' }}
            />
            <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="relative w-64 h-64">
                {/* Circular Progress SVG */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="100"
                    stroke="white"
                    strokeWidth="20"
                    fill="transparent"
                    className="opacity-50"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="100"
                    stroke="currentColor"
                    strokeWidth="20"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 100}
                    strokeDashoffset={2 * Math.PI * 100 * (1 - progress / 100)}
                    className="text-primary transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <svg className="text-primary mb-2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                  <span className="text-4xl font-bold text-primary">{currentIntake.toLocaleString()}</span>
                  <span className="text-secondary text-sm">ml of {goal.toLocaleString()}ml</span>
                </div>
              </div>

              <div className="mt-8 space-y-2">
                <h2 className="text-xl font-bold text-primary">
                  {progress >= 100 ? "Goal achieved!" : "Quenching your thirst"}
                </h2>
                <p className="text-secondary max-w-xs mx-auto px-4">
                  {progress >= 100
                    ? "Fantastic job! You've reached your hydration goal for today."
                    : `You've reached ${progress}% of your daily goal. Keep it up!`}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Add Section */}
          <div className="bg-soft-green/30 rounded-3xl p-8 space-y-6">
            <h3 className="text-lg font-bold text-primary">Quick Add</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { amount: 250, label: 'SMALL GLASS', icon: 'M7 2h10l1 10H6L7 2zM6 12h12v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8z' },
                { amount: 500, label: 'STANDARD BOTTLE', icon: 'M7 2h10l1 10H6L7 2zM6 12h12v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8z' },
                { amount: 750, label: 'LARGE BOTTLE', icon: 'M7 2h10l1 10H6L7 2zM6 12h12v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8z' },
                { amount: 'Custom', label: 'ADD MANUAL', icon: 'M12 5v14M5 12h14', custom: true },
              ].map((item, i) => {
                const isSelected = selectedAmount === item.amount && !item.custom;
                return (
                  <button
                    key={i}
                    onClick={() => item.custom ? setIsModalOpen(true) : handleQuickAdd(item.amount, item.label)}
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 active:scale-95 ${item.custom
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : isSelected
                          ? 'bg-white border-2 border-primary shadow-lg'
                          : 'bg-white hover:shadow-md border-2 border-transparent'
                      }`}
                  >
                    <svg className={`mb-3 ${item.custom ? 'text-white' : 'text-primary'}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {item.custom ? (
                        <><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></>
                      ) : (
                        <path d="M7 2h10l1 10H6L7 2zM6 12h12v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8z" />
                      )}
                    </svg>
                    <span className="font-bold text-sm uppercase tracking-wider">{item.amount}{!item.custom && " ml"}</span>
                    <span className={`text-[10px] opacity-60 font-medium ${item.custom ? 'text-white/80' : 'text-secondary'}`}>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 space-y-8">
          {/* Stats Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-soft-green/30 rounded-3xl p-6 flex flex-col items-center text-center space-y-2">
              <div className="bg-white p-2 rounded-lg shadow-sm mb-1">
                <svg className="text-primary" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
              </div>
              <span className="text-2xl font-bold text-primary">{stats.streak} Days</span>
              <span className="text-xs text-secondary font-medium uppercase tracking-tight">Current Streak</span>
            </div>
            <div className="bg-soft-green/30 rounded-3xl p-6 flex flex-col items-center text-center space-y-2">
              <div className="bg-white p-2 rounded-lg shadow-sm mb-1">
                <svg className="text-primary" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <span className="text-2xl font-bold text-primary">{stats.sinceLastDrink}</span>
              <span className="text-xs text-secondary font-medium uppercase tracking-tight">Since Last Drink</span>
            </div>
          </div>

          {/* Today's Log */}
          <div className="bg-soft-green/20 rounded-3xl p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-primary">Today's Log</h3>
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {logs.map((item, i) => {
                const time = new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const icon = item.amount >= 750 ? 'bottle' : item.amount >= 500 ? 'bottle' : 'glass';

                return (
                  <div key={item._id || i} className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm group hover:shadow-md transition-all animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-soft-green flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                        <svg className="text-primary" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          {icon === 'bottle' && <path d="M7 2h10l1 10H6L7 2zM6 12h12v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8z" />}
                          {icon === 'glass' && <path d="M7 2l2 20h6l2-20H7z" />}
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-bold text-primary text-sm">{item.amount}ml Log</h5>
                        <span className="text-xs text-secondary opacity-70">{time}</span>
                      </div>
                    </div>
                    <span className="font-bold text-primary">{item.amount} ml</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Trend */}
          <div className="bg-soft-green/20 rounded-3xl p-8 space-y-6">
            <h3 className="text-lg font-bold text-primary">Weekly Trend</h3>
            <div className="flex items-end justify-between h-40 pt-4 px-2">
              {(stats.weeklyTrend.length > 0 ? stats.weeklyTrend : [
                { day: 'Mon', height: '0%', active: false },
                { day: 'Tue', height: '0%', active: false },
                { day: 'Wed', height: '0%', active: false },
                { day: 'Thu', height: '0%', active: false },
                { day: 'Fri', height: '0%', active: false },
                { day: 'Sat', height: '0%', active: false },
                { day: 'Sun', height: '0%', active: true },
              ]).map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-3 h-full justify-end group">
                  <div className="relative w-8 bg-white/50 rounded-full h-full overflow-hidden">
                    <div
                      className={`absolute bottom-0 w-full rounded-full transition-all duration-500 group-hover:opacity-90 bg-primary ${item.active ? 'opacity-100' : 'opacity-60'}`}
                      style={{ height: item.height }}
                    />
                  </div>
                  <span className={`text-[10px] font-bold ${item.active ? 'text-primary' : 'text-secondary/50'}`}>{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Custom Amount Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] p-8 w-full max-w-md shadow-2xl border border-[#EFF1EA]">
            <h3 className="text-2xl font-bold text-primary mb-6">Custom Water Intake</h3>
            <form onSubmit={handleCustomAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Amount (ml)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 350"
                  className="w-full bg-[#FBFBF2] border border-[#EFF1EA] rounded-2xl px-4 py-3 outline-none focus:border-primary transition-colors"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-secondary hover:bg-[#FBFBF2] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 rounded-2xl bg-primary text-white font-bold hover:opacity-90 transition-opacity"
                >
                  Add Intake
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-soft-green p-12 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-secondary text-sm">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-xl font-bold text-primary">HealthMate</h2>
            <p>© 2024 HealthMate. Nurturing your digital zen.</p>
          </div>
          <div className="flex gap-8 font-medium">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WaterTrackerPage;
