'use client';

import React, { useState, useEffect } from 'react';

const MedicinePage = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await fetch('/api/medicine');
      const data = await res.json();
      if (Array.isArray(data)) {
        setMedicines(data);
      }
    } catch (error) {
      console.error("Failed to fetch medicines:", error);
    } finally {
      setLoading(false);
    }
  };

  const isPastTime = (timeStr) => {
    if (!timeStr) return false;
    try {
      // Parse "02:30 PM" or "9:41 PM"
      const [timePart, modifier] = timeStr.split(' ');
      let [hours, minutes] = timePart.split(':');
      hours = parseInt(hours);
      minutes = parseInt(minutes);
      
      if (modifier === 'PM' && hours < 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;
      
      const now = new Date();
      const scheduledTime = new Date();
      scheduledTime.setHours(hours, minutes, 0, 0);
      
      return now > scheduledTime;
    } catch (e) {
      return false;
    }
  };

  const getStatus = (med) => {
    if (med.status === 'taken') return 'Taken';
    if (isPastTime(med.time)) return 'Missed';
    return 'Upcoming';
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMed, setNewMed] = useState({ name: '', time: '', instruction: '' });

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/medicine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMed),
      });
      if (res.ok) {
        fetchMedicines();
        setIsModalOpen(false);
        setNewMed({ name: '', time: '', instruction: '' });
      }
    } catch (error) {
      console.error("Failed to add medicine:", error);
    }
  };

  const toggleTaken = async (id, currentStatus) => {
    const newStatus = currentStatus === 'taken' ? 'pending' : 'taken';
    try {
      const res = await fetch(`/api/medicine/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setMedicines(medicines.map(m => 
          m._id === id ? { ...m, status: newStatus } : m
        ));
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-outfit text-foreground bg-[#FBFBF2]">
      <main className="flex-grow p-12 max-w-5xl mx-auto w-full relative">
        <header className="text-center mb-16">
          <h2 className="text-xl font-bold text-primary mb-2">Today's Schedule</h2>
          <p className="text-secondary opacity-80">Stay on track with your wellness journey.</p>
        </header>

        {/* Timeline Line */}
        <div className="absolute left-1/2 top-40 bottom-40 w-0.5 bg-[#EFF1EA] transform -translate-x-1/2 hidden md:block" />

        <div className="space-y-12 relative">
          {medicines.map((med, index) => {
            const status = getStatus(med);
            const isTaken = med.status === 'taken';
            const missed = status === 'Missed';
            const position = index % 2 === 0 ? 'left' : 'right';
            
            let color = 'bg-[#93A89F]';
            let badgeColor = 'bg-[#EFF1EA] text-[#2D3E37]';
            let icon = 'clock';

            if (isTaken) {
              color = 'bg-[#445E54]';
              badgeColor = 'bg-[#D6E6E1] text-[#445E54]';
              icon = 'check';
            } else if (missed) {
              color = 'bg-[#E57A7A]';
              badgeColor = 'bg-[#FDEAE4] text-[#E57A7A]';
              icon = 'x';
            }

            return (
              <div key={med._id} className={`flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 ${position === 'right' ? 'md:flex-row-reverse' : ''}`}>
                {/* Card */}
                <div className="w-full md:w-[45%]">
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#EFF1EA] transition-all hover:shadow-md group">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-sm font-bold ${missed ? 'text-[#E57A7A]' : 'text-primary'}`}>{med.time}</span>
                      <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${badgeColor}`}>
                        {status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">{med.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-secondary opacity-70 text-sm">{med.instruction}</p>
                      <button 
                        onClick={() => !missed && toggleTaken(med._id, med.status)}
                        disabled={missed}
                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 flex items-center ${isTaken ? 'bg-primary' : 'bg-[#D6E6E1]'} ${missed ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isTaken ? 'translate-x-6' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Icon on Timeline */}
                <div className="relative z-10 w-12 flex justify-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm transition-transform hover:scale-110 ${color}`}>
                    {icon === 'check' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    {icon === 'clock' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>}
                    {icon === 'x' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>}
                  </div>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>
      </main>

      {/* Add Medicine Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-12 right-12 bg-[#445E54] text-white px-8 py-4 rounded-full flex items-center gap-3 shadow-xl hover:bg-[#384C44] transition-all transform hover:scale-105 active:scale-95 z-50 font-bold"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        Add Medicine
      </button>

      {/* Simple Add Medicine Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] p-8 w-full max-w-md shadow-2xl border border-[#EFF1EA]">
            <h3 className="text-2xl font-bold text-primary mb-6">Add Medicine</h3>
            <form onSubmit={handleAddMedicine} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Medicine Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Vitamin C"
                  className="w-full bg-[#FBFBF2] border border-[#EFF1EA] rounded-2xl px-4 py-3 outline-none focus:border-primary transition-colors"
                  value={newMed.name}
                  onChange={(e) => setNewMed({...newMed, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Time</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. 09:30 AM"
                  className="w-full bg-[#FBFBF2] border border-[#EFF1EA] rounded-2xl px-4 py-3 outline-none focus:border-primary transition-colors"
                  value={newMed.time}
                  onChange={(e) => setNewMed({...newMed, time: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Instruction</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. 1 Tablet • Before lunch"
                  className="w-full bg-[#FBFBF2] border border-[#EFF1EA] rounded-2xl px-4 py-3 outline-none focus:border-primary transition-colors"
                  value={newMed.instruction}
                  onChange={(e) => setNewMed({...newMed, instruction: e.target.value})}
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
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-[#EFF1EA] p-12 mt-24">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-secondary text-sm">
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

export default MedicinePage;
