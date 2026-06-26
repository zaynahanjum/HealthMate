"use client";

import React, { useState, useEffect } from "react";
import { Apple, Utensils, Coffee, Plus, Flame, Target, Activity, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { calculateGoals } from "@/lib/goals";

const SMART_DICTIONARY = {
  'apple': { calories: 95, protein: 0.5 },
  'banana': { calories: 105, protein: 1.3 },
  'egg': { calories: 70, protein: 6 },
  'eggs': { calories: 140, protein: 12 },
  'chicken breast': { calories: 165, protein: 31 },
  'chicken': { calories: 239, protein: 27 },
  'salmon': { calories: 208, protein: 20 },
  'milk': { calories: 149, protein: 8 },
  'rice': { calories: 205, protein: 4 },
  'oatmeal': { calories: 150, protein: 5 },
  'greek yogurt': { calories: 100, protein: 10 },
  'almonds': { calories: 164, protein: 6 },
  'avocado': { calories: 160, protein: 2 },
  'bread': { calories: 79, protein: 3 },
  'toast': { calories: 79, protein: 3 },
  'coffee': { calories: 2, protein: 0 },
  'tea': { calories: 2, protein: 0 },
};

export default function DietTracker() {
  const { loading: authLoading, token } = useAuth();
  const [dietRecords, setDietRecords] = useState([]);
  const [totals, setTotals] = useState({ calories: 0, protein: 0 });
  const [loading, setLoading] = useState(true);
  
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [isEstimated, setIsEstimated] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [proteinGoal, setProteinGoal] = useState(150);

  useEffect(() => {
    if (token) {
      fetchDietData();
      fetchGoals();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [token, authLoading]);

  const fetchGoals = async () => {
    try {
      const res = await fetch("/api/profile", {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        const goals = calculateGoals(data);
        setCalorieGoal(data.calorieGoal ?? goals.calorieGoal);
        setProteinGoal(data.proteinGoal ?? goals.proteinGoal);
      }
    } catch (error) {
      console.error("Failed to fetch goals", error);
    }
  };

  const fetchNutritionData = async () => {
    if (!foodName) return;
    setIsSearching(true);
    try {
      const res = await fetch(`/api/diet/nutrition?query=${encodeURIComponent(foodName)}`);
      const data = await res.json();
      if (!data.error) {
        setCalories(data.calories.toString());
        setProtein(data.protein.toString());
        setIsEstimated(true);
      }
    } catch (error) {
      console.error("Failed to fetch nutrition data", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleFoodNameChange = (e) => {
    const val = e.target.value;
    setFoodName(val);
    
    // Quick internal lookup for instant results
    const lowerVal = val.toLowerCase().trim();
    if (SMART_DICTIONARY[lowerVal]) {
      setCalories(SMART_DICTIONARY[lowerVal].calories.toString());
      setProtein(SMART_DICTIONARY[lowerVal].protein.toString());
      setIsEstimated(true);
    }
  };

  const fetchDietData = async () => {
    try {
      const res = await fetch("/api/diet", {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!data.error) {
        setDietRecords(data.logs);
        setTotals(data.totals);
      }
    } catch (error) {
      console.error("Failed to fetch diet data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogMeal = async (e) => {
    if (e) e.preventDefault();
    
    const payload = {
      description: foodName,
      meal: mealType,
      calories: parseInt(calories) || 0,
      protein: parseInt(protein) || 0
    };

    try {
      const res = await fetch("/api/diet", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setFoodName("");
        setCalories("");
        setProtein("");
        setIsEstimated(false);
        fetchDietData();
      }
    } catch (error) {
      console.error("Failed to save meal", error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#FDFDF9] flex items-center justify-center text-[#455D54] font-semibold text-xl">
        Loading Nutrition Tracker...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDF9] font-sans text-[#2F3E38] selection:bg-[#E1EAE5]">
      <main className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-12 flex items-center space-x-4">
          <div className="p-3 bg-[#455D54] text-[#FDFDF9] rounded-2xl shadow-lg shadow-[#455D54]/20">
            <Apple size={32} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-[#2F3E38] tracking-tight mb-1">Nutrition Tracker</h1>
            <p className="text-[#5A7067] font-medium">Log your meals and track your macros automatically.</p>
          </div>
        </header>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#F5F5F0] rounded-[32px] p-8 border border-[#EBECE7] flex flex-col items-center justify-center text-center">
            <div className="relative w-48 h-48 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="80" stroke="#E1EAE5" strokeWidth="12" fill="transparent" />
                <circle 
                  cx="96" cy="96" r="80" stroke="#455D54" strokeWidth="12" fill="transparent" 
                  strokeDasharray={2 * Math.PI * 80}
                  strokeDashoffset={2 * Math.PI * 80 * (1 - Math.min(totals.calories / calorieGoal, 1))}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[#2F3E38]">{totals.calories}</span>
                <span className="text-xs font-bold text-[#8E9F97] uppercase">Calories</span>
              </div>
            </div>
            <p className="text-[#5A7067] font-medium">Goal: {calorieGoal} kcal</p>
          </div>

          <div className="bg-[#F5F5F0] rounded-[32px] p-8 border border-[#EBECE7] flex flex-col items-center justify-center text-center">
            <div className="relative w-48 h-48 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="80" stroke="#E1EAE5" strokeWidth="12" fill="transparent" />
                <circle 
                  cx="96" cy="96" r="80" stroke="#8C5A5D" strokeWidth="12" fill="transparent" 
                  strokeDasharray={2 * Math.PI * 80}
                  strokeDashoffset={2 * Math.PI * 80 * (1 - Math.min(totals.protein / proteinGoal, 1))}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[#2F3E38]">{totals.protein}g</span>
                <span className="text-xs font-bold text-[#8E9F97] uppercase">Protein</span>
              </div>
            </div>
            <p className="text-[#5A7067] font-medium">Goal: {proteinGoal}g</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form & Quick Add */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-[32px] border border-[#EBECE7] shadow-xl shadow-[#455D54]/5">
              <h2 className="text-xl font-bold text-[#2F3E38] mb-6 flex items-center gap-2">
                <Plus size={20} className="text-[#455D54]" /> Log Meal
              </h2>
              <form onSubmit={handleLogMeal} className="space-y-4">
                <div className="relative">
                  <input 
                    type="text" placeholder="What did you eat?" required
                    value={foodName} onChange={handleFoodNameChange}
                    onBlur={() => !isEstimated && fetchNutritionData()}
                    className="w-full bg-[#FAFAFA] border border-[#EBECE7] rounded-2xl px-4 py-4 pr-12 outline-none focus:border-[#455D54] transition-all"
                  />
                  <button 
                    type="button"
                    onClick={fetchNutritionData}
                    className="absolute right-3 top-3 p-2 bg-[#E1EAE5] text-[#455D54] rounded-xl hover:bg-[#455D54] hover:text-white transition-all"
                  >
                    {isSearching ? <Activity size={20} className="animate-spin" /> : <Search size={20} />}
                  </button>
                  {isEstimated && (
                    <span className="absolute left-4 -bottom-6 text-[10px] font-bold text-[#455D54] bg-[#E1EAE5] px-2 py-1 rounded-md">
                      {isSearching ? "ANALYZING..." : "SMART DATA LOADED"}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="number" placeholder="Calories"
                    value={calories} onChange={(e) => setCalories(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-[#EBECE7] rounded-2xl px-4 py-4 outline-none focus:border-[#455D54] transition-all"
                  />
                  <input 
                    type="number" placeholder="Protein (g)"
                    value={protein} onChange={(e) => setProtein(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-[#EBECE7] rounded-2xl px-4 py-4 outline-none focus:border-[#455D54] transition-all"
                  />
                </div>
                <select 
                  value={mealType} onChange={(e) => setMealType(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-[#EBECE7] rounded-2xl px-4 py-4 outline-none focus:border-[#455D54] transition-all appearance-none cursor-pointer"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                </select>
                <button type="submit" className="w-full bg-[#455D54] text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity">
                  Save Custom Meal
                </button>
              </form>
            </div>
          </div>

          {/* Today's Logs */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-[#2F3E38] flex items-center gap-2">
              <Utensils size={20} className="text-[#455D54]" /> Today's Log
            </h2>
            <div className="space-y-4">
              {dietRecords.length === 0 ? (
                <div className="bg-[#F5F5F0] rounded-[32px] p-12 text-center border-2 border-dashed border-[#E1EAE5]">
                  <Apple className="mx-auto mb-4 text-[#C5D8CD]" size={48} />
                  <p className="text-[#8E9F97] font-medium">No meals logged today. Start fueling your body!</p>
                </div>
              ) : (
                dietRecords.map((log, i) => (
                  <div key={i} className="bg-white rounded-[32px] p-6 border border-[#EBECE7] shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                    <div className="flex items-center gap-6">
                      <div className="bg-[#E1EAE5] p-4 rounded-2xl text-[#455D54]">
                        {log.meal === 'Breakfast' ? <Coffee size={24} /> : <Utensils size={24} />}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-[#2F3E38]">{log.description}</h4>
                        <p className="text-sm text-[#8E9F97] font-bold uppercase tracking-tight">{log.meal}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-extrabold text-[#455D54]">{log.calories || 0} kcal</p>
                      <p className="text-sm font-bold text-[#8C5A5D]">{log.protein || 0}g Protein</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}