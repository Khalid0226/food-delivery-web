import React, { useState } from 'react';
import { FiPackage, FiMapPin, FiPhone, FiCheck, FiUser } from 'react-icons/fi';

export default function DeliveryOrders() {
    const [orders, setOrders] = useState([
        {
            _id: 'ord_101',
            customerName: 'Rahul Verma',
            phone: '9876543210',
            address: 'Flat 302, Shivalik Plaza, Ambawadi, Ahmedabad',
            items: 'Paneer Tikka x1, Butter Naan x3',
            totalAmount: 580,
            status: 'Out for Delivery'
        },
        {
            _id: 'ord_102',
            customerName: 'Sneha Shah',
            phone: '9123456789',
            address: 'B-402, Titanium City Center, Prahlad Nagar, Ahmedabad',
            items: 'Chicken Biryani x2, Coke x2',
            totalAmount: 750,
            status: 'Ready for Pickup'
        },
        {
            _id: 'ord_103',
            customerName: 'Amit Patel',
            phone: '9988776655',
            address: '10, Swastik Society, Navrangpura, Ahmedabad',
            items: 'Veg Fried Rice x1, Manchurian x1',
            totalAmount: 420,
            status: 'Delivered'
        }
    ]);

    const [filter, setFilter] = useState('All');

    const handleUpdateStatus = (orderId, newStatus) => {
        setOrders(prevOrders => 
            prevOrders.map(order => 
                order._id === orderId ? { ...order, status: newStatus } : order
            )
        );
        alert(`Order status updated to: ${newStatus} 🚀`);
    };

    const filteredOrders = filter === 'All' 
        ? orders 
        : orders.filter(order => order.status === filter);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-50 text-green-700 border-green-200';
            case 'Out for Delivery': return 'bg-amber-50 text-amber-700 border-amber-200';
            default: return 'bg-blue-50 text-blue-700 border-blue-200';
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto space-y-4 md:space-y-6">
            
            {/* Header & Filter Section */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                        Manage Delivery Orders 📦
                    </h1>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                        Track, Accept and Complete Deliveries
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 w-full md:w-auto">
                    {['All', 'Ready for Pickup', 'Out for Delivery', 'Delivered'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex-1 sm:flex-none text-center ${
                                filter === tab 
                                    ? 'bg-slate-900 text-white shadow-sm' 
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {filteredOrders.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 font-bold text-sm shadow-sm">
                        No orders found for "{filter}" filter. ☕
                    </div>
                ) : (
                    filteredOrders.map((order) => (
                        <div key={order._id} className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all gap-4">
                            
                            {/* Card Top: Order ID & Status */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                                <div>
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Order ID</span>
                                    <h3 className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">{order._id}</h3>
                                </div>
                                <span className={`text-[10px] sm:text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider border text-center self-start sm:self-auto ${getStatusBadge(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>

                            {/* Card Middle: Customer Details, Location & Items */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="p-2 bg-white rounded-lg border border-slate-200 text-amber-500 shadow-sm">
                                        <FiUser size={16} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Customer</p>
                                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{order.customerName}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-600 font-medium">
                                    <div className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <FiMapPin className="mt-0.5 text-slate-400 flex-shrink-0" size={15} /> 
                                        <span className="leading-snug">{order.address}</span>
                                    </div>
                                    <a href={`tel:${order.phone}`} className="flex items-center gap-2.5 bg-sky-50 p-3 rounded-xl border border-sky-100 text-sky-700 hover:bg-sky-100 transition-colors">
                                        <FiPhone className="flex-shrink-0" size={15} /> 
                                        <span className="font-black truncate">{order.phone}</span>
                                    </a>
                                </div>

                                <div className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-100">
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Ordered Items</p>
                                    <p className="text-xs font-bold text-slate-800 leading-relaxed">{order.items}</p>
                                </div>
                            </div>

                            {/* Card Bottom: Bill & Action Button */}
                            <div className="pt-3 sm:pt-4 border-t border-slate-100 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3">
                                <div>
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Total Bill</span>
                                    <p className="text-base sm:text-lg font-black text-slate-900 leading-tight">₹{order.totalAmount}</p>
                                </div>

                                <div className="w-full xs:w-auto flex justify-end">
                                    {order.status === 'Ready for Pickup' && (
                                        <button 
                                            onClick={() => handleUpdateStatus(order._id, 'Out for Delivery')}
                                            className="w-full xs:w-auto bg-amber-500 hover:bg-amber-600 text-white font-black text-xs px-4 py-2.5 rounded-xl transition-all uppercase tracking-wider cursor-pointer shadow-sm text-center"
                                        >
                                            Accept & Pickup 🛵
                                        </button>
                                    )}

                                    {order.status === 'Out for Delivery' && (
                                        <button 
                                            onClick={() => handleUpdateStatus(order._id, 'Delivered')}
                                            className="w-full xs:w-auto bg-green-600 hover:bg-green-700 text-white font-black text-xs px-4 py-2.5 rounded-xl transition-all uppercase tracking-wider cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                                        >
                                            <FiCheck size={14} /> Mark Delivered
                                        </button>
                                    )}

                                    {order.status === 'Delivered' && (
                                        <span className="w-full xs:w-auto text-xs font-black text-green-700 bg-green-100 px-4 py-2.5 rounded-xl border border-green-200 flex items-center justify-center gap-1.5">
                                            <FiCheck size={14} /> Completed
                                        </span>
                                    )}
                                </div>
                            </div>

                        </div>
                    ))
                )}
            </div>
        </div>
    );
}