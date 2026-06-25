import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AdminLayout from "../../components/admin_layout/AdminLayout";
import AdminHeader from "../../components/admin_layout/AdminHeader";

// Mock Data
const data = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 6000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 7890 },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <AdminHeader />
      
      {/* 1. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 mt-10">
        <StatCard title="Revenue" value="₹8.4L" />
        <StatCard title="Orders" value="1,284" />
        <StatCard title="Pending" value="42" />
        <StatCard title="Customers" value="890" />
      </div>

      {/* 2. Chart & Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-black text-slate-950 mb-6">Revenue Analytics</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={4} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Stats Panel */}
        <div className="bg-slate-950 p-6 rounded-3xl text-white">
          <h3 className="font-bold mb-4">Quick Insights</h3>
          <div className="space-y-4">
             <div className="p-4 bg-slate-900 rounded-2xl">
                <p className="text-slate-400 text-xs font-bold uppercase">Growth Rate</p>
                <p className="text-xl font-black text-amber-500">+12.5%</p>
             </div>
             <div className="p-4 bg-slate-900 rounded-2xl">
                <p className="text-slate-400 text-xs font-bold uppercase">Avg Order Value</p>
                <p className="text-xl font-black text-emerald-500">₹1,250</p>
             </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-amber-200 transition-all">
      <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{title}</p>
      <h3 className="text-2xl font-black text-slate-950">{value}</h3>
    </div>
  );
}