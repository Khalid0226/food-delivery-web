import React, { useState } from 'react';
import { FiUser, FiShoppingBag, FiSave, FiLock, FiCamera, FiMapPin, FiTrash2 } from 'react-icons/fi';
import AdminLayout from "../../components/admin_layout/AdminLayout";
import AdminHeader from "../../components/admin_layout/AdminHeader";

export default function Settings() {
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1500); // Simulate API call
    };

    return (
        <AdminLayout>
            <AdminHeader />
            <div className="max-w-5xl mx-auto px-6 py-10">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-950 tracking-tight">System Settings</h1>
                        <p className="text-slate-500 font-medium">Manage restaurant identity, security, and account preferences.</p>
                    </div>
                    <button 
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-2 px-8 py-3 bg-slate-950 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? "Saving..." : <><FiSave /> Save All Changes</>}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Restaurant Information */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                            <h2 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                                <FiShoppingBag className="text-amber-500" /> Restaurant Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Store Name</label>
                                    <input type="text" defaultValue="Diamond Fry Center" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Number</label>
                                    <input type="text" defaultValue="+91 98765 43210" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all" />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Address</label>
                                    <div className="relative">
                                        <FiMapPin className="absolute left-4 top-4 text-slate-400" />
                                        <textarea rows="2" defaultValue="12, MG Road, Ahmedabad, Gujarat" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-semibold outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security Section */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                            <h2 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                                <FiLock className="text-indigo-600" /> Security & Password
                            </h2>
                            <div className="space-y-4">
                                <input type="password" placeholder="Current Password" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-semibold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="password" placeholder="New Password" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-semibold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all" />
                                    <input type="password" placeholder="Confirm New Password" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-semibold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center">
                            <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-slate-50 relative group cursor-pointer overflow-hidden">
                                <FiUser size={40} className="text-slate-400" />
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <FiCamera className="text-white" />
                                </div>
                            </div>
                            <h3 className="font-black text-slate-900">Diamond Admin</h3>
                            <p className="text-sm text-slate-500 mb-6">admin@diamondfry.com</p>
                            <button className="w-full py-3 bg-indigo-50 text-indigo-700 rounded-2xl font-bold hover:bg-indigo-100 transition-all active:scale-95">Edit Profile</button>
                        </div>

                        <div className="bg-red-50 rounded-3xl border border-red-100 p-8">
                            <h2 className="text-red-900 font-black mb-2 flex items-center gap-2">
                                <FiTrash2 /> Danger Zone
                            </h2>
                            <p className="text-red-700/70 text-xs mb-4">Deleting your account will remove all store data permanently.</p>
                            <button className="w-full py-3 bg-white text-red-600 border border-red-200 rounded-2xl font-bold hover:bg-red-600 hover:text-white transition-all active:scale-95">Delete Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}