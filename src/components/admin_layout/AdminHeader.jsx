import React from 'react';
import { FiBell, FiMenu, FiLogOut } from 'react-icons/fi';

export default function AdminHeader({ toggleSidebar }) {
    return (
        // px-4 aur py-2 se charo taraf margin/padding mil jayegi
        <header className=" flex items-center justify-between px-4 md:px-6 py-5 border-b border-slate-200 bg-white">
            {/* Left: Title */}
            <div className="flex items-center gap-1 flex-shrink-0 cursor-pointer">
                <img src="/images.jpg" alt="logo" className="w-10 h-10 object-contain rounded-xl border border-slate-200 bg-white p-1 shadow-sm" />
                <div>
                    <h1 className="text-sm md:text-xl font-black tracking-wide text-[#FF1744]">
                        DIAMOND<span className="text-[8px] md:text-[10px] text-slate-500 align-super">®</span>
                        <span className="text-green-700 ml-1">FRY CENTER</span>
                    </h1>
                    <p className="text-[8px] md:text-[10px] uppercase tracking-[3px] text-slate-500 font-bold">Taste That Rules</p>
                </div>
            </div>

            {/* Right: Actions */}
            {/* gap-4 se icons aur button ke beech acchi margin aa jayegi */}
            <div className="flex items-center gap-2">

                {/* Notification Bell */}
                <button className="p-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-amber-50 transition-all relative">
                    <FiBell className="text-base" />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
                </button>

                {/* 1. Hamburger Menu (Mobile Only) */}
                <button
                    onClick={toggleSidebar}
                    className="md:hidden p-2 bg-slate-950 text-white rounded-lg hover:bg-slate-800 transition-all"
                >
                    <FiMenu size={18} />
                </button>

                {/* 2. Logout Button (Desktop Only) */}
                <button
                    className="hidden md:flex items-center gap-1 bg-white border border-slate-200 text-slate-600 font-bold text-[10px] px-4 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all"
                >
                    <FiLogOut size={12} /> LOGOUT
                </button>
            </div>
        </header>
    );
}