import React from 'react';
import { FiPackage, FiUsers, FiTrendingUp, FiSettings, FiLogOut } from 'react-icons/fi';

export default function AdminSidebar() {
  return (
    // Sidebar background ko white/light gray rakha hai taaki main layout ke saath match kare
    <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col h-screen fixed top-0 left-0">
      
      {/* Brand */}
      <div className="mb-10 px-2">
        <h2 className="text-slate-950 font-black text-xl tracking-tighter italic">
            DIAMOND<span className="text-amber-500">ADMIN</span>
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        <NavItem icon={<FiTrendingUp />} label="Overview" active />
        <NavItem icon={<FiPackage />} label="Orders" />
        <NavItem icon={<FiUsers />} label="Customers" />
        <NavItem icon={<FiSettings />} label="Settings" />
      </nav>

      {/* Logout Footer */}
      <div className="pt-6 border-t border-slate-100">
        <button className="flex items-center gap-3 w-full p-3 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-xl font-bold transition-all text-sm">
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-bold transition-all duration-200 ${
        active 
          ? 'bg-amber-50 text-amber-600' 
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
      }`}>
      <span className="text-lg">{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
}