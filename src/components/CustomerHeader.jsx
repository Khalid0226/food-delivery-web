import React from 'react';
import { FiShoppingCart, FiMenu, FiX, FiLogOut, FiUser, FiShoppingBag, FiCoffee } from 'react-icons/fi';

export default function CustomerHeader({ 
    activeTab, 
    setActiveTab, 
    cartCount, 
    isMobileMenuOpen, 
    setIsMobileMenuOpen, 
    handleLogout 
}) {
    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <img src="/images.jpg" alt="logo" className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-xl border border-slate-200 bg-white p-1 shadow-sm" />
                        <div>
                            <h1 className="text-sm md:text-xl font-black tracking-wide text-[#FF1744]">
                                DIAMOND<span className="text-[8px] md:text-[10px] text-slate-500 align-super">®</span>
                                <span className="text-green-700 ml-1">FRY CENTER</span>
                            </h1>
                            <p className="text-[8px] md:text-[10px] uppercase tracking-[3px] text-slate-500 font-bold">Taste That Rules</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
                        <button onClick={() => setActiveTab("menu")} className={`flex items-center gap-2 text-sm font-bold uppercase border-b-2 pb-1 transition ${activeTab === "menu" ? "text-orange-500 border-orange-500" : "text-slate-500 border-transparent hover:text-black"}`}><FiCoffee /> Order Food</button>
                        <button onClick={() => setActiveTab("orders")} className={`flex items-center gap-2 text-sm font-bold uppercase border-b-2 pb-1 transition ${activeTab === "orders" ? "text-orange-500 border-orange-500" : "text-slate-500 border-transparent hover:text-black"}`}><FiShoppingBag /> Track Orders</button>
                        <button onClick={() => setActiveTab("settings")} className={`flex items-center gap-2 text-sm font-bold uppercase border-b-2 pb-1 transition ${activeTab === "settings" ? "text-orange-500 border-orange-500" : "text-slate-500 border-transparent hover:text-black"}`}><FiUser /> My Account</button>
                    </nav>

                    {/* Desktop Cart & Logout */}
                    <div className="hidden md:flex items-center gap-6 ml-auto">
                        <div className="relative cursor-pointer group">
                            <FiShoppingCart className="text-2xl" />
                            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-[#FF1744] text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-sm">{cartCount}</span>}
                        </div>
                        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold hover:bg-red-100 transition"><FiLogOut /> Logout</button>
                    </div>

                    {/* Mobile Toggle Button */}
                    <div className="ml-auto md:hidden flex items-center gap-4">
                        <div className="relative cursor-pointer">
                            <FiShoppingCart className="text-xl" />
                            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-[#FF1744] text-white text-[8px] font-black w-3.5 h-3.5 flex items-center justify-center rounded-full">{cartCount}</span>}
                        </div>
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition text-xl">
                            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown Panel */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-200 p-4 space-y-3 animate-in slide-in-from-top-2">
                    <button onClick={() => { setActiveTab("menu"); setIsMobileMenuOpen(false); }} className="flex w-full items-center gap-3 p-3 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-lg"><FiCoffee /> Order Food</button>
                    <button onClick={() => { setActiveTab("orders"); setIsMobileMenuOpen(false); }} className="flex w-full items-center gap-3 p-3 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-lg"><FiShoppingBag /> Track Orders</button>
                    <button onClick={() => { setActiveTab("settings"); setIsMobileMenuOpen(false); }} className="flex w-full items-center gap-3 p-3 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-lg"><FiUser /> My Account</button>
                    <button onClick={handleLogout} className="flex w-full items-center gap-3 p-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg border-t"><FiLogOut /> Logout</button>
                </div>
            )}
        </header>
    );
}