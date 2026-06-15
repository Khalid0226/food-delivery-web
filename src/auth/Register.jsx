import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  // 1. Form Data State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  // 2. Separate Errors State
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // 3. Validation Logic
  const validateForm = () => {
    let valid = true;
    let newErrors = { name: '', email: '', phone: '', password: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (formData.phone.length !== 10) {
      newErrors.phone = 'Must be exactly 10 digits';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Registered Data Verified:", formData);
      alert(`Welcome ${formData.name}! Registration Successful.`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-center items-center px-4 py-6 relative overflow-x-hidden">
      
      {/* Background Soft Vibe */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#e11d48_1.5px,transparent_1.5px)] bg-size-[20px_24px] pointer-events-none"></div>

      {/* Standard Executive Panel Card */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 w-full max-w-md relative z-10 transition-all">
        
        {/* Header Section */}
        <div className="text-center mb-5">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-950">
            Create an <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Account</span>
          </h2>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">
            Diamond Fry Center Executive Panel
          </p>
        </div>

        {/* Form with Clean Bottom-Aligned Error Spacing */}
        <form onSubmit={handleSubmit} noValidate className="space-y-1">
          
          {/* 1. Full Name */}
          <div>
            <div className="mb-1">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 block">Full Name</label>
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full text-sm px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50/10 focus:ring-red-500/10 focus:border-red-500' : 'border-slate-200 bg-slate-50/50 focus:border-amber-500 focus:ring-amber-500/10'} focus:bg-white focus:ring-4 transition-all outline-none`}
            />
            {/* Error Area below input */}
            <div className="mt-1 px-0.5 min-h-[18px]">
              {errors.name && <span className="text-[11px] text-red-500 font-bold block"> {errors.name}</span>}
            </div>
          </div>

          {/* 2. Email Address */}
          <div>
            <div className="mb-1">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 block">Email Address</label>
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@domain.com"
              className={`w-full text-sm px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 bg-red-50/10 focus:ring-red-500/10 focus:border-red-500' : 'border-slate-200 bg-slate-50/50 focus:border-amber-500 focus:ring-amber-500/10'} focus:bg-white focus:ring-4 transition-all outline-none`}
            />
            {/* Error Area below input */}
            <div className="mt-1 px-0.5 min-h-[18px]">
              {errors.email && <span className="text-[11px] text-red-500 font-bold block"> {errors.email}</span>}
            </div>
          </div>

          {/* 3. Phone Number */}
          <div>
            <div className="mb-1">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 block">Phone Number</label>
            </div>
            <input
              type="text"
              name="phone"
              maxLength="10"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                handleChange({ target: { name: 'phone', value } });
              }}
              placeholder="9876543210"
              className={`w-full text-sm px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50/10 focus:ring-red-500/10 focus:border-red-500' : 'border-slate-200 bg-slate-50/50 focus:border-amber-500 focus:ring-amber-500/10'} focus:bg-white focus:ring-4 transition-all outline-none`}
            />
            {/* Error Area below input */}
            <div className="mt-1 px-0.5 min-h-[18px]">
              {errors.phone && <span className="text-[11px] text-red-500 font-bold block"> {errors.phone}</span>}
            </div>
          </div>

          {/* 4. Password */}
          <div>
            <div className="mb-1">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 block">Password</label>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full text-sm px-4 py-3 rounded-xl border ${errors.password ? 'border-red-500 bg-red-50/10 focus:ring-red-500/10 focus:border-red-500' : 'border-slate-200 bg-slate-50/50 focus:border-amber-500 focus:ring-amber-500/10'} focus:bg-white focus:ring-4 transition-all outline-none`}
            />
            {/* Error Area below input */}
            <div className="mt-1 px-0.5 min-h-[18px]">
              {errors.password && <span className="text-[11px] text-red-500 font-bold block"> {errors.password}</span>}
            </div>
          </div>

          {/* Premium Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-[0.98] text-white font-black text-sm py-3.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all uppercase tracking-widest border border-amber-400/10"
            >
              Verify & Sign Up 🚀
            </button>
          </div>
        </form>

        {/* Footer Section */}
        <div className="mt-5 pt-4 border-t border-slate-100 text-center space-y-2">
          <p className="text-xs text-slate-400 font-bold tracking-wide">
            Already registered?{' '}
            <button 
              onClick={() => navigate('/Login')} 
              className="text-amber-600 hover:text-orange-600 font-black transition-colors underline underline-offset-4 cursor-pointer"
            >
              Log In Here
            </button>
          </p>
          
          <div>
            <button 
              onClick={() => navigate('/')}
              className="text-[11px] text-slate-400 hover:text-slate-700 font-black uppercase tracking-widest transition-colors cursor-pointer"
            >
              ← Terminate & Back to Home
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}