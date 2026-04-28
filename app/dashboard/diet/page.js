"use client";

import React, { useState, useEffect } from "react";
import { Apple, Utensils, Coffee, Plus, Flame, Target, Activity } from "lucide-react";

export default function DietLog() {
  const [dietRecords, setDietRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [mealType, setMealType] = useState("Breakfast");

  // Daily Goal (You can make this dynamic later!)
  const dailyGoal = 2000; 

  // Fetch initial data
  useEffect(() => {
    const fetchDietData = async () => {
      try {
        const res = await fetch("/api/diet"); // Ensure you create this API route later
        // const data = await res.json();
        // setDietRecords(data.records || []);
        
        // Simulating a loaded state for now so you can see the empty state
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch diet data", error);
        setLoading(false);
      }
    };
    fetchDietData();
  }, []);

  // Handle form submission
  const handleAddMeal = async (e) => {
    e.preventDefault();
    try {
      // Optimistic UI update (Update UI instantly before DB confirms)
      const newRecord = { 
        id: Date.now(),
        food: foodName, 
        calories: parseInt(calories), 
        type: mealType,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setDietRecords([newRecord, ...dietRecords]);
      setFoodName("");
      setCalories("");
      setMealType("Breakfast");

      // Send to backend
      await fetch("/api/diet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecord),
      });
      
    } catch (error) {
      console.error("Failed to save meal record", error);
    }
  };

  // Helper functions for UI
  const totalCalories = dietRecords.reduce((sum, record) => sum + (record.calories || 0), 0);
  const remainingCalories = Math.max(0, dailyGoal - totalCalories);

  const getMealStyling = (type) => {
    switch (type) {
      case "Breakfast": return { icon: <Coffee size={20}/>, color: "bg-[#F3E8E8] text-[#8C5A5D] border-[#E3D1D2]" }; // Mauve
      case "Lunch": return { icon: <Utensils size={20}/>, color: "bg-orange-50 text-orange-800 border-orange-200" };
      case "Dinner": return { icon: <Utensils size={20}/>, color: "bg-blue-50 text-blue-800 border-blue-200" };
      case "Snack": return { icon: <Apple size={20}/>, color: "bg-[#E1EAE5] text-[#455D54] border-[#C5D8CD]" }; // Sage
      default: return { icon: <Apple size={20}/>, color: "bg-gray-50 text-gray-800 border-gray-200" };
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDF9] font-sans text-[#2F3E38] selection:bg-[#E1EAE5]">
      <main className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Header Section */}
        <header className="mb-10 flex items-center space-x-4">
          <div className="p-3 bg-[#455D54] text-[#FDFDF9] rounded-2xl shadow-lg shadow-[#455D54]/20">
            <Apple size={32} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-[#2F3E38] tracking-tight mb-1">Diet & Nutrition</h1>
            <p className="text-[#5A7067] font-medium">Fuel your body, track your macros.</p>
          </div>
        </header>

        {/* Daily Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl border border-[#EBECE7] shadow-sm flex items-center space-x-4">
            <div className="bg-[#E1EAE5] p-4 rounded-full text-[#455D54]"><Target size={24} /></div>
            <div>
              <p className="text-sm font-semibold text-[#8E9F97]">Daily Goal</p>
              <p className="text-2xl font-bold text-[#2F3E38]">{dailyGoal} <span className="text-sm font-medium text-[#5A7067]">kcal</span></p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-[#EBECE7] shadow-sm flex items-center space-x-4">
            <div className="bg-orange-50 p-4 rounded-full text-orange-600"><Flame size={24} /></div>
            <div>
              <p className="text-sm font-semibold text-[#8E9F97]">Consumed</p>
              <p className="text-2xl font-bold text-[#2F3E38]">{totalCalories} <span className="text-sm font-medium text-[#5A7067]">kcal</span></p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-[#EBECE7] shadow-sm flex items-center space-x-4">
            <div className="bg-[#F3E8E8] p-4 rounded-full text-[#8C5A5D]"><Activity size={24} /></div>
            <div>
              <p className="text-sm font-semibold text-[#8E9F97]">Remaining</p>
              <p className="text-2xl font-bold text-[#2F3E38]">{remainingCalories} <span className="text-sm font-medium text-[#5A7067]">kcal</span></p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add Meal Form - Left Column */}
          <section className="lg:col-span-1">
            <div className="bg-white p-7 rounded-3xl border border-[#EBECE7] shadow-xl shadow-[#455D54]/5 sticky top-8">
              <div className="flex items-center space-x-2 mb-6">
                <Plus size={20} className="text-[#455D54]" />
                <h2 className="text-xl font-bold text-[#2F3E38]">Log a Meal</h2>
              </div>
              
              <form onSubmit={handleAddMeal} className="space-y-5">
                {/* Food Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#4A5D56] mb-2">Food / Drink</label>
                  <input 
                    type="text" 
                    required
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-[#EBECE7] text-[#2F3E38] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#455D54] focus:border-[#455D54] focus:bg-white transition-all outline-none"
                    placeholder="e.g., Avocado Toast"
                  />
                </div>

                {/* Calories */}
                <div>
                  <label className="block text-sm font-semibold text-[#4A5D56] mb-2">Calories</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      min="0"
                      required
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-[#EBECE7] text-[#2F3E38] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#455D54] focus:border-[#455D54] focus:bg-white transition-all outline-none"
                      placeholder="e.g., 350"
                    />
                    <span className="absolute right-4 top-3.5 text-[#8E9F97] font-medium text-sm">kcal</span>
                  </div>
                </div>

                {/* Meal Type Select */}
                <div>
                  <label className="block text-sm font-semibold text-[#4A5D56] mb-2">Meal Type</label>
                  <div className="relative">
                    <select 
                      value={mealType}
                      onChange={(e) => setMealType(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-[#EBECE7] text-[#2F3E38] rounded-xl px-4 py-3 appearance-none focus:ring-2 focus:ring-[#455D54] focus:border-[#455D54] focus:bg-white transition-all outline-none"
                    >
                      <option value="Breakfast">Breakfast</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Dinner">Dinner</option>
                      <option value="Snack">Snack</option>
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
                  className="w-full mt-4 bg-[#455D54] hover:bg-[#344840] text-[#FDFDF9] font-semibold py-3.5 rounded-xl transition-all active:scale-[0.98] shadow-md shadow-[#455D54]/20"
                >
                  Save Meal
                </button>
              </form>
            </div>
          </section>

          {/* Records Display Area - Right Column */}
          <section className="lg:col-span-2">
            <h2 className="text-xl font-bold text-[#2F3E38] mb-6 flex items-center">
              <Utensils size={20} className="mr-2 text-[#455D54]" />
              Today's Log
            </h2>
            
            <div className="space-y-4">
              {loading ? (
                <div className="animate-pulse bg-[#EBECE7] rounded-2xl h-24 w-full"></div>
              ) : dietRecords.length === 0 ? (
                // Empty State
                <div className="bg-white border border-dashed border-[#C5D8CD] rounded-3xl p-12 text-center shadow-sm">
                  <div className="bg-[#E1EAE5] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Utensils className="text-[#455D54]" size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-[#2F3E38] mb-1">Your plate is empty!</h3>
                  <p className="text-[#5A7067]">Log your first meal of the day using the form.</p>
                </div>
              ) : (
                // Populated List
                <div className="grid gap-4">
                  {dietRecords.map((record) => {
                    const style = getMealStyling(record.type);
                    return (
                      <div 
                        key={record.id} 
                        className="bg-white border border-[#EBECE7] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-xl border ${style.color}`}>
                            {style.icon}
                          </div>
                          <div>
                            <p className="font-bold text-[#2F3E38] text-lg leading-tight">{record.food}</p>
                            <p className="text-sm text-[#8E9F97] mt-0.5">{record.type} • {record.time}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <span className="block text-xl font-extrabold text-[#455D54]">
                            {record.calories} <span className="text-sm font-medium text-[#8E9F97]">kcal</span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}