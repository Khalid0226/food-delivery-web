import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();

  // 1. Step Management (1 = Email Input, 2 = OTP & New Password Input)
  const [step, setStep] = useState(1);

  // 2. Form Fields State
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 3. Error States
  const [errors, setErrors] = useState({});

  // Step 1: Handle Email Submission & OTP Generation
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    let currentErrors = {};

    if (!email.trim()) {
      currentErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      currentErrors.email = 'Please enter a valid email';
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
    } else {
      setErrors({});
      // Dummy OTP System (MERN backend logic lagne par actual email par jayega)
      const generatedOtp = Math.floor(100000 + Math.random() * 900000); 
      console.log(`Generated OTP for ${email}:`, generatedOtp);
      
      alert(`🚀 Verification OTP dispatched to ${email}\n\n[DEMO OTP]: ${generatedOtp}`);
      setStep(2); // Move to OTP verification step
    }
  };

  // Step 2: Handle OTP & Password Reset Verification
  const handleResetSubmit = (e) => {
    e.preventDefault();
    let currentErrors = {};

    if (!otp.trim()) {
      currentErrors.otp = 'OTP is required';
    } else if (otp.length !== 6) {
      currentErrors.otp = 'OTP must be exactly 6 digits';
    }

    if (!newPassword) {
      currentErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      currentErrors.newPassword = 'Must be at least 6 characters';
    }

    if (newPassword !== confirmPassword) {
      currentErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
    } else {
      setErrors({});
      // Yahan baad mein Node/Express API call handler integrate hoga
      console.log("Password updated successfully for:", email);
      alert("🎉 Password Reset Successful! Redirecting to login page...");
      navigate('/Login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-center items-center px-4 py-6 relative overflow-x-hidden">
      
      {/* Background Soft Vibe (Tailwind standard matching warning cleared) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#e11d48_1.5px,transparent_1.5px)] bg-size-[20px_24px] pointer-events-none"></div>

      {/* Premium Executive Card */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 w-full max-w-md relative z-10 transition-all">
        
        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-950">
            {step === 1 ? 'Recover' : 'Verify'}{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Password</span>
          </h2>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">
            Diamond Fry Center Executive Panel
          </p>
        </div>

        {/* --- STEP 1: ENTER EMAIL TO RECEIVE OTP --- */}
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} noValidate className="space-y-4">
            <p className="text-xs text-slate-400 mb-2 text-center font-bold tracking-wide leading-relaxed">
              Enter your registered email address below to receive a secure 6-digit verification code.
            </p>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500">Registered Email</label>
                {errors.email && <span className="text-[11px] text-red-500 font-bold">⚠️ {errors.email}</span>}
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors({}); }}
                placeholder="example@domain.com"
                className={`w-full text-sm px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 bg-red-50/10 focus:ring-red-500/10 focus:border-red-500' : 'border-slate-200 bg-slate-50/50 focus:border-amber-500 focus:ring-amber-500/10'} focus:bg-white focus:ring-4 transition-all outline-none`}
              />
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/Login')}
                className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs py-3.5 rounded-xl uppercase tracking-wider transition-all cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs py-3.5 rounded-xl shadow-md shadow-amber-500/10 uppercase tracking-wider transition-all cursor-pointer"
              >
                Send OTP ✉️
              </button>
            </div>
          </form>
        )}

        {/* --- STEP 2: ENTER OTP & NEW PASSWORD --- */}
        {step === 2 && (
          <form onSubmit={handleResetSubmit} noValidate className="space-y-4">
            <p className="text-xs text-center text-emerald-600 font-bold bg-emerald-50/60 border border-emerald-100 px-3 py-2 rounded-xl mb-2">
              Verification code sent to: <span className="underline">{email}</span>
            </p>

            {/* OTP Field */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500">6-Digit OTP</label>
                {errors.otp && <span className="text-[11px] text-red-500 font-bold">⚠️ {errors.otp}</span>}
              </div>
              <input
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '')); setErrors({}); }}
                placeholder="••••••"
                className={`w-full text-center tracking-[1em] text-sm font-bold px-4 py-3 rounded-xl border ${errors.otp ? 'border-red-500 bg-red-50/10 focus:ring-red-500/10 focus:border-red-500' : 'border-slate-200 bg-slate-50/50 focus:border-amber-500 focus:ring-amber-500/10'} focus:bg-white focus:ring-4 transition-all outline-none`}
              />
            </div>

            {/* New Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500">New Password</label>
                {errors.newPassword && <span className="text-[11px] text-red-500 font-bold">⚠️ {errors.newPassword}</span>}
              </div>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); setErrors({}); }}
                placeholder="••••••••"
                className={`w-full text-sm px-4 py-3 rounded-xl border ${errors.newPassword ? 'border-red-500 bg-red-50/10 focus:ring-red-500/10 focus:border-red-500' : 'border-slate-200 bg-slate-50/50 focus:border-amber-500 focus:ring-amber-500/10'} focus:bg-white focus:ring-4 transition-all outline-none`}
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500">Confirm Password</label>
                {errors.confirmPassword && <span className="text-[11px] text-red-500 font-bold">⚠️ {errors.confirmPassword}</span>}
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setErrors({}); }}
                placeholder="••••••••"
                className={`w-full text-sm px-4 py-3 rounded-xl border ${errors.confirmPassword ? 'border-red-500 bg-red-50/10 focus:ring-red-500/10 focus:border-red-500' : 'border-slate-200 bg-slate-50/50 focus:border-amber-500 focus:ring-amber-500/10'} focus:bg-white focus:ring-4 transition-all outline-none`}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)} // Go back to email step
                className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs py-3.5 rounded-xl uppercase tracking-wider transition-all cursor-pointer text-center"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="w-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xs py-3.5 rounded-xl shadow-md shadow-emerald-500/10 uppercase tracking-wider transition-all cursor-pointer"
              >
                Verify & Reset 🔐
              </button>
            </div>
          </form>
        )}

        {/* Footer Link */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <button 
            onClick={() => navigate('/Login')}
            className="text-[11px] text-slate-400 hover:text-slate-700 font-black uppercase tracking-widest transition-colors cursor-pointer"
          >
            ← Back to Login Screen
          </button>
        </div>

      </div>
    </div>
  );
}