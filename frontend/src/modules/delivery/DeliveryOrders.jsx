import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPackage, FiMapPin, FiPhone, FiCheck, FiClock, FiUser } from 'react-icons/fi';

export default function DeliveryOrders() {
    const [orders, setOrders] = useState([
        {
            _id: 'ord_101',
            customerName: 'Rahul Verma',
            phone: '9876543210',
            address: 'Flat 302, Shivalik Plaza, Ambawadi, Ahmedabad',
            items: ['Paneer Tikka x1', 'Butter Naan x3'],
            totalAmount: 580,
            status: 'Out for Delivery'
        },
        {
            _id: 'ord_102',
            customerName: 'Sneha Shah',
            phone: '9123456789',
            address: 'B-402, Titanium City Center, Prahlad Nagar, Ahmedabad',
            items: ['Chicken Biryani x2', 'Coke x2'],
            totalAmount: 750,
            status: 'Ready for Pickup'
        },
        {
            _id: 'ord_103',
            customerName: 'Amit Patel',
            phone: '9988776655',
            address: '10, Swastik Society, Navrangpura, Ahmedabad',
            items: ['Veg Fried Rice x1', 'Manchurian x1'],
            totalAmount: 420,
            status: 'Delivered'
        }
    ]);

    const [filter, setFilter] = useState('All');

    // Order status update karne ka function
    const handleUpdateStatus = (orderId, newStatus) => {
        setOrders(prevOrders => 
            prevOrders.map(order => 
                order._id === orderId ? { ...order, status: newStatus } : order
            )
        );
        alert(`Order status updated to: ${newStatus} 🚀`);
    };

    // Filter ke hisaab se orders dikhane ke liye
    const filteredOrders = filter === 'All' 
        ? orders 
        : orders.filter(order => order.status === filter);

    return (
        <div className="space-y-6">
            
            {/* Page Header & Filters */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                        Manage Delivery Orders 📦
                    </h1>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                        Track, Accept and Complete Deliveries
                    </p>
                </div>

                {/* Status Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                    {['All', 'Ready for Pickup', 'Out for Delivery', 'Delivered'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                filter === tab 
                                    ? 'bg-slate-900 text-white shadow' 
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredOrders.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 font-bold text-sm">
                        No orders found for "{filter}" filter. ☕
                    </div>
                ) : (
                    filteredOrders.map((order) => (
                        <div key={order._id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
                            <div>
                                {/* Top Info: Customer & Status Badge */}
                                <div className="flex justify-between items-start gap-2 mb-4">
                                    <div>
                                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Order ID: {order._id}</span>
                                        <h3 className="text-base font-black text-slate-900 flex items-center gap-1.5 mt-0.5">
                                            <FiUser size={14} className="text-amber-500" /> {order.customerName}
                                        </h3>
                                    </div>
                                    <span className={`text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                                        order.status === 'Delivered' 
                                            ? 'bg-green-50 text-green-700 border border-green-200' 
                                            : order.status === 'Out for Delivery'
                                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                                    }`}>
                                        {order.status}
                                    </span>
                                </div>

                                {/* Address & Phone */}
                                <div className="space-y-2 mb-4 text-xs text-slate-600 font-medium">
                                    <p className="flex items-start gap-2">
                                        <FiMapPin className="mt-0.5 text-slate-400 flex-shrink-0" size={14} /> 
                                        <span>{order.address}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FiPhone className="text-slate-400 flex-shrink-0" size={14} /> 
                                        <span>{order.phone}</span>
                                    </p>
                                </div>

                                {/* Items Box */}
                                <div className="bg-slate-50 p-3 rounded-xl mb-4 border border-slate-100">
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Ordered Items</p>
                                    <p className="text-xs font-bold text-slate-800">{order.items.join(', ')}</p>
                                </div>
                            </div>

                            {/* Bottom Actions & Price */}
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                                <div>
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Total Bill</span>
                                    <p className="text-base font-black text-slate-900">₹{order.totalAmount}</p>
                                </div>

                                <div className="flex gap-2">
                                    {order.status === 'Ready for Pickup' && (
                                        <button 
                                            onClick={() => handleUpdateStatus(order._id, 'Out for Delivery')}
                                            className="bg-amber-500 hover:bg-amber-600 text-white font-black text-xs px-4 py-2.5 rounded-xl transition-all uppercase tracking-wider cursor-pointer shadow-sm"
                                        >
                                            Accept & Pickup 🛵
                                        </button>
                                    )}

                                    {order.status === 'Out for Delivery' && (
                                        <button 
                                            onClick={() => handleUpdateStatus(order._id, 'Delivered')}
                                            className="bg-green-600 hover:bg-green-700 text-white font-black text-xs px-4 py-2.5 rounded-xl transition-all uppercase tracking-wider cursor-pointer shadow-sm flex items-center gap-1.5"
                                        >
                                            <FiCheck size={14} /> Mark Delivered
                                        </button>
                                    )}

                                    {order.status === 'Delivered' && (
                                        <span className="text-xs font-black text-green-600 bg-green-50 px-3 py-2 rounded-xl border border-green-200">
                                            Completed ✓
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