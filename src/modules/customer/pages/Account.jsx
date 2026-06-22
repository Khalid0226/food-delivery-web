import React, { useState } from 'react';
import { FiUser, FiMapPin, FiLock, FiClock, FiEdit2, FiCheckCircle, FiAlertCircle, FiChevronRight, FiPlus, FiTrash2 } from 'react-icons/fi';

export default function Account() {
    const [activeSection, setActiveSection] = useState('profile');

    // Hardcoded Data
    const profileData = { name: 'John Doe', email: 'john@fooddash.com', phone: '+91 98765 43210', joined: 'June 2026' };
    const addresses = [{ id: 1, type: 'Home', address: '123, Luxury Apartments, Ahmedabad, Gujarat' }];
    const transactions = [
        { id: 'TXN-998877', date: 'June 20, 2026', amount: 1780, status: 'Success' },
        { id: 'TXN-998866', date: 'June 18, 2026', amount: 1454, status: 'Success' },
        { id: 'TXN-998855', date: 'June 15, 2026', amount: 999, status: 'Failed' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-20">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-[900] text-slate-900 mb-8 tracking-tighter">My Account</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <nav className="space-y-2">
                            {[
                                { id: 'profile', icon: <FiUser />, label: 'Profile' },
                                { id: 'address', icon: <FiMapPin />, label: 'Addresses' },
                                { id: 'history', icon: <FiClock />, label: 'Payment History' },
                                { id: 'security', icon: <FiLock />, label: 'Security' },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`w-full flex items-center justify-between p-4 rounded-2xl font-bold transition-all duration-300 ${activeSection === item.id ? 'bg-white text-orange-500 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-l-4 border-orange-500' : 'text-slate-500 hover:bg-slate-100'}`}
                                >
                                    <span className="flex items-center gap-3">{item.icon} {item.label}</span>
                                    {activeSection === item.id && <FiChevronRight size={18} />}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-grow bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">

                        {/* Profile Section */}
                        {activeSection === 'profile' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-black text-slate-900">Personal Information</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {Object.entries(profileData).map(([key, value]) => (
                                        <div key={key} className="p-4 bg-slate-50 rounded-2xl border-2 border-gray-100">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{key}</p>
                                            <p className="font-bold text-slate-800">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Address Section */}
                        {activeSection === 'address' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-black text-slate-900">Saved Addresses</h2>
                                {addresses.map(addr => (
                                    <div key={addr.id} className="p-6 bg-slate-50 border-2 border-gray-100 rounded-2xl flex justify-between items-center">
                                        <div><p className="font-black text-slate-900">{addr.type}</p><p className="text-sm text-slate-600">{addr.address}</p></div>
                                        <button className="text-red-500"><FiTrash2 /></button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* History Section - Single Line Fix for Mobile */}
                        {activeSection === 'history' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-black text-slate-900">Payment History</h2>

                                <div className="space-y-3">
                                    {transactions.map((txn) => (
                                        <div
                                            key={txn.id}
                                            className="flex items-center justify-between gap-2 p-4 rounded-xl bg-slate-50 border border-slate-100"
                                        >
                                            {/* Left: Icon + ID/Date */}
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className={`p-2 rounded-lg flex-shrink-0 ${txn.status === 'Success' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                                    {txn.status === 'Success' ? <FiCheckCircle size={16} /> : <FiAlertCircle size={16} />}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-black text-slate-900 truncate">{txn.id}</p>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase">{txn.date}</p>
                                                </div>
                                            </div>

                                            {/* Right: Amount (Ek hi line mein) */}
                                            <div className="text-right flex-shrink-0">
                                                <p className="text-sm font-black text-slate-900">₹{txn.amount}</p>
                                                <p className={`text-[9px] font-black uppercase ${txn.status === 'Success' ? 'text-emerald-600' : 'text-red-600'}`}>
                                                    {txn.status}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* Security Section */}
                        {activeSection === 'security' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-black text-slate-900">Security</h2>
                                <button className="w-full flex justify-between p-6 bg-slate-50 border-2 border-gray-100 rounded-2xl font-bold hover:bg-slate-100">Change Password <span>→</span></button>
                                <button className="w-full flex justify-between p-6 bg-slate-50 border-2 border-gray-100 rounded-2xl font-bold hover:bg-slate-100">Two-Factor Authentication <span>→</span></button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}