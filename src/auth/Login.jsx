import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    // 1. Form Data State
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // 2. Separate Errors State
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    // Handle Input Changes & Clear Errors instantly
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    // 3. Strict Validation Logic
    const validateForm = () => {
        let valid = true;
        let newErrors = { email: '', password: '' };

        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
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
            console.log("Login Credentials Verified:", formData);
            alert("Authentication Successful! Redirecting to dashboard...");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-center items-center px-4 py-6 relative overflow-x-hidden">

            {/* Background Soft Vibe */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#e11d48_1.5px,transparent_1.5px)] [background-size:20px_24px] pointer-events-none"></div>

            {/* Matching Executive Panel Card */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 w-full max-w-md relative z-10 transition-all">

                {/* Header Section */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-950">
                        Welcome <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Back</span>
                    </h2>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">
                        Diamond Fry Center Executive Panel
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} noValidate className="space-y-4">

                    {/* 1. Email Address */}
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

                        {/* 👀 Sub-label Section: Error shifted right below the input field just like password */}
                        <div className="mt-1.5 px-0.5 min-h-[18px]">
                            {errors.email && (
                                <span className="text-[11px] text-red-500 font-bold block">
                                    ⚠️ {errors.email}
                                </span>
                            )}
                        </div>
                    </div>
                    {/* 2. Password */}
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

                        {/* 👀 Sub-label Section: Error on Left, Forgot Password Link on Right */}
                        <div className="flex justify-between items-start mt-1.5 px-0.5 min-h-[18px]">
                            <div>
                                {errors.password && (
                                    <span className="text-[11px] text-red-500 font-bold block">
                                        ⚠️ {errors.password}
                                    </span>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => navigate('/forgot-password')} // 👀 Seedhe doosre page pr navigate kr diya
                                className="text-xs font-black text-amber-600 hover:text-orange-600 transition-colors cursor-pointer select-none ml-auto"
                            >
                                Forgot Password?
                            </button>
                        </div>
                    </div>

                    {/* Premium Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-[0.98] text-white font-black text-sm py-3.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all uppercase tracking-widest border border-amber-400/10 mt-4"
                    >
                        Authenticate 🚀
                    </button>
                </form>

                {/* Footer Section with Smooth Navigation Triggers */}
                <div className="mt-6 pt-5 border-t border-slate-100 text-center space-y-2">
                    <p className="text-xs text-slate-400 font-bold tracking-wide">
                        Don't have an account?{' '}
                        <button
                            onClick={() => navigate('/Register')}
                            className="text-amber-600 hover:text-orange-600 font-black transition-colors underline underline-offset-4"
                        >
                            Register Here
                        </button>
                    </p>

                    <div>
                        <button
                            onClick={() => navigate('/')}
                            className="text-[11px] text-slate-400 hover:text-slate-700 font-black uppercase tracking-widest transition-colors"
                        >
                            ← Terminate & Back to Home
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}