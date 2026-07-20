import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiTrendingUp, FiPackage, FiCheckCircle, FiDollarSign, FiLogOut } from 'react-icons/fi';

export default function DeliverySidebar() {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col h-screen fixed top-0 left-0 z-40">
      <div className="mb-10 px-2">
        <h2 className="text-[#FF1744] font-black text-xl tracking-tighter italic">
          DIAMOND<span className="text-green-700 ml-1">DELIVERY</span>
        </h2>
      </div>

      <nav className="flex-1 space-y-1">
        <NavItem to="/delivery/dashboard" icon={<FiTrendingUp />} label="Overview" />
        <NavItem to="/delivery/orders" icon={<FiPackage />} label="Live Orders" />
        <NavItem to="/delivery/history" icon={<FiCheckCircle />} label="History" />
        <NavItem to="/delivery/earnings" icon={<FiDollarSign />} label="Earnings" />
      </nav>

      <div className="pt-6 border-t border-slate-100">
        <button className="flex items-center gap-3 text-slate-500 font-bold p-4 hover:bg-amber-50 rounded-2xl transition-all md:hidden">
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-xl font-bold transition-all duration-200 text-sm ${
          isActive ? 'bg-amber-50 text-amber-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}