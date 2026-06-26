'use client';

import React, { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Activity, AlertCircle, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        if (!name.trim()) {
          throw new Error("Please enter your full name.");
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        // New users go to profile setup first
        router.push('/dashboard/profile?new=true');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        // Existing users go to home; home checks profile completeness
        router.push('/');
      }
    } catch (err) {
      console.error(err);
      let message = err.message;
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        message = "Invalid email or password. Please try again.";
      } else if (err.code === 'auth/email-already-in-use') {
        message = "This email is already registered.";
      } else if (err.code === 'auth/weak-password') {
        message = "Password should be at least 6 characters.";
      } else if (err.code === 'auth/invalid-email') {
        message = "Please enter a valid email address.";
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDF9] relative overflow-hidden px-4">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#E1EAE5] rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#F3E8E8] rounded-full blur-[150px] opacity-75"></div>

      {/* Card container */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-[32px] border border-[#EBECE7] shadow-xl p-8 relative z-10 transition-all duration-500 hover:shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#455D54] rounded-2xl flex items-center justify-center mb-4 text-[#FDFDF9] shadow-lg shadow-[#455D54]/20 animate-pulse">
            <Activity size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-[#2F3E38] tracking-tight">HealthMate</h1>
          <p className="text-[#8E9F97] font-semibold text-sm mt-1">
            {isSignUp ? "Start your daily wellness journey" : "Welcome back to your digital zen"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-2xl mb-6 flex items-start gap-3 text-sm font-medium">
            <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          {isSignUp && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#5A7067] uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#8E9F97]">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-[#EBECE7] text-[#2F3E38] rounded-2xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-[#455D54] focus:border-[#455D54] focus:bg-white transition-all outline-none"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#5A7067] uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#8E9F97]">
                <Mail size={18} />
              </span>
              <input
                type="email"
                required
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FAFAFA] border border-[#EBECE7] text-[#2F3E38] rounded-2xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-[#455D54] focus:border-[#455D54] focus:bg-white transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold text-[#5A7067] uppercase tracking-wider">Password</label>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#8E9F97]">
                <Lock size={18} />
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#FAFAFA] border border-[#EBECE7] text-[#2F3E38] rounded-2xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-[#455D54] focus:border-[#455D54] focus:bg-white transition-all outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#455D54] hover:bg-[#344840] disabled:bg-[#8E9F97] text-[#FDFDF9] font-bold py-4 rounded-2xl transition-all active:scale-[0.98] shadow-md shadow-[#455D54]/20 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? "Authenticating..." : isSignUp ? "Create Account" : "Sign In"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#EBECE7] text-center">
          <p className="text-sm font-semibold text-[#8E9F97]">
            {isSignUp ? "Already have an account?" : "New to HealthMate?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-[#455D54] hover:text-[#344840] font-extrabold hover:underline underline-offset-4 transition-all"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
