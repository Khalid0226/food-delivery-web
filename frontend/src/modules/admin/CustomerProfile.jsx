import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiPhone, FiCalendar, FiShoppingBag, FiCreditCard, FiEdit2, FiSlash, FiMoreVertical } from 'react-icons/fi';
import AdminLayout from "../../components/admin_layout/AdminLayout";
import AdminHeader from "../../components/admin_layout/AdminHeader";
import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';

export default function CustomerProfile() {
    const navigate = useNavigate();
    // const customer = { name: 'Rahul Kumar', id: 'CUS-007', email: 'rahul@example.com', phone: '+91 98765 43210', joined: 'Jan 15, 2026', status: 'Active' };

    const [data, setData] = useState(null)
    const { id } = useParams()

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:2500/api/auth/customer/${id}`)
            setData(response.data)
        } catch (error) {
            alert('profile not found!!')
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [id])

    if (!data) return <div><h1>Loading....</h1></div>

    return (
        <AdminLayout>
            <AdminHeader />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-semibold">
                        <FiArrowLeft /> Back to Customers
                    </button>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm">
                            <FiEdit2 size={16} /> Edit Profile
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-all">
                            <FiSlash size={16} /> Block
                        </button>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left: Fixed Profile Card */}
                    <div className="lg:col-span-4 xl:col-span-3">
                        <div className="bg-white rounded-3xl border border-slate-100 p-5.5 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col items-center text-center">
                                <div className="relative group">
                                    <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-400 flex items-center justify-center text-white font-black text-4xl mb-4 shadow-lg shadow-indigo-200">
                                        {data.user.name.charAt(0)}
                                    </div>
                                    <div className="absolute bottom-4 right-0 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                                </div>
                                <h2 className="text-2xl font-black text-slate-950 mt-2">{data.user.name}</h2>
                                <p className="text-slate-400 font-bold text-sm uppercase tracking-wide mt-1">CUS-{data.user._id.slice(-6)}</p>
                            </div>

                            <div className="mt-8 space-y-4">
                                <DetailBox icon={<FiMail />} label="Email" value={data.user.email} />
                                <DetailBox icon={<FiPhone />} label="Phone" value={data.user.phone} />
                                <DetailBox
                                    icon={<FiCalendar />}
                                    label="Joined"
                                    value={new Date(data.user.createdAt).toLocaleDateString('en-GB', {
                                        day: 'numeric', month: 'short', year: 'numeric'
                                    })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Stats & History */}
                    <div className="lg:col-span-8 xl:col-span-9 space-y-6">

                        {/* Stats Grid - Responsive 1 to 3 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <StatCard title="Total Orders" value={data.stats.totalOrders} icon={<FiShoppingBag />} />
                            <StatCard title="Total Spent" value={`₹${data.stats.totalSpent}`} icon={<FiCreditCard />} />
                            <StatCard title="Avg. Order" value={`₹${data.stats.avgOrder}`} icon={<FiShoppingBag />} />
                        </div>

                        {/* Recent Activity Card */}
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                                <h3 className="font-black text-lg text-slate-950">Order History</h3>
                                <button className="text-slate-400 hover:text-slate-900"><FiMoreVertical /></button>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {data.orders.map((order) => (
                                    <div key={order._id} className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500"><FiShoppingBag /></div>
                                            <div>
                                                <p className="font-black uppercase text-slate-900">Order #{order._id.slice(-6)}</p>
                                                <p className="text-xs font-bold text-slate-400 mt-0.5">{new Date(order.createdAt).toLocaleDateString()} • {order.status}</p>
                                            </div>
                                        </div>
                                        <span className="font-black text-slate-950 text-lg">₹{order.totalAmount}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

// Sub-components
const DetailBox = ({ icon, label, value }) => (
    <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors">
        <div className="text-indigo-400">{icon}</div>
        <div className="overflow-hidden">
            <p className="text-[10px] uppercase font-black text-slate-400">{label}</p>
            <p className="font-bold text-slate-700 truncate">{value}</p>
        </div>
    </div>
);

const StatCard = ({ title, value, icon }) => (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">{title}</p>
        <div className="flex justify-between items-center">
            <h4 className="text-xl sm:text-2xl font-black text-slate-900">{value}</h4>
            <span className="text-indigo-400">{icon}</span>
        </div>
    </div>
);