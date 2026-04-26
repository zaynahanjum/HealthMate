import React from 'react';

const WaterTrackerPage = () => {
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
                    strokeDashoffset={2 * Math.PI * 100 * (1 - 0.74)}
                    className="text-primary"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <svg className="text-primary mb-2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  <span className="text-4xl font-bold text-primary">1,850</span>
                  <span className="text-secondary text-sm">ml of 2,500ml</span>
                </div>
              </div>
              
              <div className="mt-8 space-y-2">
                <h2 className="text-xl font-bold text-primary">Quenching your thirst</h2>
                <p className="text-secondary max-w-xs mx-auto px-4">
                  You've reached 74% of your daily goal. Just three more glasses to go!
                </p>
              </div>
            </div>
          </div>

          {/* Quick Add Section */}
          <div className="bg-soft-green/30 rounded-3xl p-8 space-y-6">
            <h3 className="text-lg font-bold text-primary">Quick Add</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { amount: '250 ml', label: 'SMALL GLASS', icon: 'M17 2H7a2 2 0 0 0-2 2v18l7-4 7 4V4a2 2 0 0 0-2-2z', active: false },
                { amount: '500 ml', label: 'STANDARD BOTTLE', icon: 'M17 2H7a2 2 0 0 0-2 2v18l7-4 7 4V4a2 2 0 0 0-2-2z', active: true },
                { amount: '750 ml', label: 'LARGE BOTTLE', icon: 'M17 2H7a2 2 0 0 0-2 2v18l7-4 7 4V4a2 2 0 0 0-2-2z', active: false },
                { amount: 'Custom', label: 'ADD MANUAL', icon: 'M12 5v14M5 12h14', active: false, custom: true },
              ].map((item, i) => (
                <button 
                  key={i}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 ${
                    item.custom 
                      ? 'bg-primary text-white hover:bg-primary/90' 
                      : item.active 
                        ? 'bg-white border-2 border-primary shadow-lg' 
                        : 'bg-white hover:shadow-md border-2 border-transparent'
                  }`}
                >
                  <svg className={`mb-3 ${item.custom ? 'text-white' : 'text-primary'}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {item.custom ? (
                      <><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></>
                    ) : (
                      <path d="M7 2h10l1 10H6L7 2zM6 12h12v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8z"/>
                    )}
                  </svg>
                  <span className="font-bold text-sm uppercase tracking-wider">{item.amount}</span>
                  <span className={`text-[10px] opacity-60 font-medium ${item.custom ? 'text-white/80' : 'text-secondary'}`}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 space-y-8">
          {/* Smart Tip */}
          <div className="bg-accent-pink rounded-3xl p-6 flex gap-4 shadow-sm border border-accent-pink/50">
            <div className="bg-white/50 p-3 rounded-2xl h-fit">
              <svg className="text-red-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-1">Smart Tip</h4>
              <p className="text-secondary text-sm leading-relaxed">
                Your hydration levels are slightly lower than usual for this time of day. Try drinking a full 500ml bottle now to stay ahead of the curve.
              </p>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-soft-green/30 rounded-3xl p-6 flex flex-col items-center text-center space-y-2">
              <div className="bg-white p-2 rounded-lg shadow-sm mb-1">
                <svg className="text-primary" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              </div>
              <span className="text-2xl font-bold text-primary">12 Days</span>
              <span className="text-xs text-secondary font-medium uppercase tracking-tight">Current Streak</span>
            </div>
            <div className="bg-soft-green/30 rounded-3xl p-6 flex flex-col items-center text-center space-y-2">
              <div className="bg-white p-2 rounded-lg shadow-sm mb-1">
                <svg className="text-primary" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <span className="text-2xl font-bold text-primary">45 min</span>
              <span className="text-xs text-secondary font-medium uppercase tracking-tight">Since Last Drink</span>
            </div>
          </div>

          {/* Today's Log */}
          <div className="bg-soft-green/20 rounded-3xl p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-primary">Today's Log</h3>
              <button className="text-sm font-bold text-secondary hover:text-primary underline transition-colors">View All</button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Standard Bottle', time: '02:30 PM', amount: '500 ml', icon: 'bottle' },
                { name: 'Green Tea', time: '11:15 AM', amount: '250 ml', icon: 'cup' },
                { name: 'Large Bottle', time: '08:45 AM', amount: '750 ml', icon: 'bottle' },
                { name: 'Small Glass', time: '07:30 AM', amount: '350 ml', icon: 'glass' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm group hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-soft-green flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                      <svg className="text-primary" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {item.icon === 'bottle' && <path d="M7 2h10l1 10H6L7 2zM6 12h12v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8z"/>}
                        {item.icon === 'cup' && (
                          <>
                            <path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/>
                            <line x1="6" y1="2" x2="6" y2="4"/>
                            <line x1="10" y1="2" x2="10" y2="4"/>
                            <line x1="14" y1="2" x2="14" y2="4"/>
                          </>
                        )}
                        {item.icon === 'glass' && <path d="M7 2l2 20h6l2-20H7z"/>}
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-bold text-primary text-sm">{item.name}</h5>
                      <span className="text-xs text-secondary opacity-70">{item.time}</span>
                    </div>
                  </div>
                  <span className="font-bold text-primary">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Trend */}
          <div className="bg-soft-green/20 rounded-3xl p-8 space-y-6">
            <h3 className="text-lg font-bold text-primary">Weekly Trend</h3>
            <div className="flex items-end justify-between h-40 pt-4 px-2">
              {[
                { day: 'Mon', height: '60%', active: false },
                { day: 'Tue', height: '40%', active: false },
                { day: 'Wed', height: '80%', active: false },
                { day: 'Thu', height: '55%', active: false },
                { day: 'Fri', height: '70%', active: true },
                { day: 'Sat', height: '20%', active: false },
                { day: 'Sun', height: '30%', active: false },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-3 h-full justify-end group">
                  <div className="relative w-8 bg-white/50 rounded-full h-full overflow-hidden">
                    <div 
                      className={`absolute bottom-0 w-full rounded-full transition-all duration-500 group-hover:opacity-90 ${item.active ? 'bg-primary' : 'bg-secondary/60'}`}
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

      {/* Footer */}
      <footer className="bg-white border-t border-soft-green p-12 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-primary">HealthMate</h2>
            <p className="text-secondary text-sm max-w-sm">
              © 2024 HealthMate. Nurturing your digital zen. Your health journey, simplified and beautiful.
            </p>
          </div>
          <div>
            <h6 className="font-bold text-primary uppercase text-xs tracking-widest mb-4">Product</h6>
            <ul className="space-y-2 text-sm text-secondary">
              <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Meds</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Water</a></li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-primary uppercase text-xs tracking-widest mb-4">Company</h6>
            <ul className="space-y-2 text-sm text-secondary">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WaterTrackerPage;
