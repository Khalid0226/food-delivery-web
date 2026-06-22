import React, { useState, useMemo } from 'react';
import { FiClock, FiCheckCircle, FiTruck, FiBox, FiSearch, FiChevronRight } from 'react-icons/fi';

export default function TrackOrders() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');

    const orders = [
        { id: 'ORD-12345', status: 'Delivered', date: 'June 22, 2026', total: 1780, items: ['Executive Chicken Platter', 'Spicy Fish Fry'] },
        { id: 'ORD-12346', status: 'In Transit', date: 'June 22, 2026', total: 1454, items: ['Diamond Double Chicken Burger'] },
        { id: 'ORD-12347', status: 'Preparing', date: 'June 22, 2026', total: 999, items: ['Crispy Chicken Fry', 'Coca Cola'] },
    ];

    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filter === 'All' ? true : 
                                  filter === 'Active' ? ['In Transit', 'Preparing'].includes(order.status) : 
                                  order.status === filter;
            return matchesSearch && matchesFilter;
        });
    }, [searchTerm, filter]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 md:px-20">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-[900] text-slate-900 tracking-tighter mb-2">Order History</h1>
                    <p className="text-slate-500 font-medium">Your recent culinary adventures.</p>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-10">
                    <div className="relative flex-grow group">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" />
                        <input 
                            className="w-full pl-12 pr-6 py-4 bg-white rounded-2xl border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] focus:ring-2 focus:ring-orange-500 outline-none transition-all duration-300 font-semibold"
                            placeholder="Search by Order ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select 
                        className="px-6 py-4 bg-white rounded-2xl border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] font-bold text-slate-700 outline-none cursor-pointer hover:text-orange-600 transition-colors"
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active Orders</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>

                {/* Orders Grid */}
                <div className="space-y-6">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                            <div key={order.id} className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(255,100,0,0.1)] transition-all duration-300 hover:-translate-y-1">
                                <div className="flex flex-col md:flex-row gap-6 items-center">
                                    {/* Icon Box */}
                                    <div className={`p-4 rounded-2xl ${getStatusStyles(order.status).bg}`}>
                                        {getStatusStyles(order.status).icon}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-grow text-center md:text-left">
                                        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                                            <h3 className="text-lg font-black text-slate-900">{order.id}</h3>
                                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${getStatusStyles(order.status).text} ${getStatusStyles(order.status).bg}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{order.date} • {order.items.length} Items</p>
                                    </div>

                                    {/* Price & Detail Button */}
                                    <div className="flex items-center gap-6">
                                        <span className="text-xl font-black text-slate-900">₹{order.total}</span>
                                        <button className="p-3 bg-slate-50 group-hover:bg-orange-500 group-hover:text-white rounded-xl transition-all duration-300">
                                            <FiChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20">
                            <FiBox size={60} className="mx-auto mb-4 text-slate-300" />
                            <p className="font-bold text-slate-400">No orders found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function getStatusStyles(status) {
    const styles = {
        'Delivered': { bg: 'bg-emerald-50', text: 'text-emerald-600', icon: <FiCheckCircle size={24} className="text-emerald-600" /> },
        'In Transit': { bg: 'bg-blue-50', text: 'text-blue-600', icon: <FiTruck size={24} className="text-blue-600" /> },
        'Preparing': { bg: 'bg-orange-50', text: 'text-orange-600', icon: <FiClock size={24} className="text-orange-600" /> }
    };
    return styles[status] || styles['Preparing'];
}