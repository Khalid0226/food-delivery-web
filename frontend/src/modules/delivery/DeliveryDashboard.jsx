import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPackage, FiCheckCircle, FiDollarSign, FiClock, FiMapPin, FiPhone, FiCheck } from 'react-icons/fi';

export default function DeliveryDashboard() {
    const [stats, setStats] = useState({
        totalDeliveries: 12,
        pendingOrders: 3,
        todayEarnings: 850
    });

    const [isOnline, setIsOnline] = useState(true);
    const [availableOrders, setAvailableOrders] = useState([
        {
            _id: 'ord_001',
            customerName: 'Aman Sharma',
            phone: '9876543210',
            address: 'Shop No. 4, MG Road, Ahmedabad',
            items: ['Chicken Fry x2', 'Cold Drink x1'],
            totalAmount: 450
        },
        {
            _id: 'ord_002',
            customerName: 'Priya Patel',
            phone: '9123456789',
            address: 'B-12, Satellite Heights, Ahmedabad',
            items: ['Special Fish Fry x1', 'French Fries x2'],
            totalAmount: 620
        }
    ]);

    const [activeOrder, setActiveOrder] = useState(null);

    // Order Accept karne ka function
    const handleAcceptOrder = (order) => {
        setActiveOrder(order);
        // List se hata kar active mein daal diya
        setAvailableOrders(availableOrders.filter(o => o._id !== order._id));
    };

    // Order Deliver (Complete) karne ka function
    const handleCompleteOrder = () => {
        alert('Order delivered successfully! 🎉');
        setActiveOrder(null);
        setStats(prev => ({
            ...prev,
            totalDeliveries: prev.totalDeliveries + 1,
            todayEarnings: prev.todayEarnings + 150
        }));
    };

    return (
        <div className="space-y-6">
            
            {/* Top Banner & Status Toggle */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                        Delivery Partner Dashboard 🚀
                    </h1>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                        Diamond Fry Center • Live Operations
                    </p>
                </div>

                {/* Online / Offline Status Button */}
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl">
                    <span className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                    <span className="text-xs font-black uppercase text-slate-600">
                        {isOnline ? 'You are Online' : 'You are Offline'}
                    </span>
                    <button 
                        onClick={() => setIsOnline(!isOnline)}
                        className={`ml-2 px-3 py-1 text-[11px] font-black rounded-lg transition-all ${
                            isOnline ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                    >
                        {isOnline ? 'Go Offline' : 'Go Online'}
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3.5 bg-amber-50 text-amber-600 rounded-xl">
                        <FiPackage size={24} />
                    </div>
                    <div>
                        <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Total Deliveries</p>
                        <h3 className="text-xl font-black text-slate-900 mt-0.5">{stats.totalDeliveries}</h3>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl">
                        <FiClock size={24} />
                    </div>
                    <div>
                        <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Available Orders</p>
                        <h3 className="text-xl font-black text-slate-900 mt-0.5">{availableOrders.length}</h3>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3.5 bg-green-50 text-green-600 rounded-xl">
                        <FiDollarSign size={24} />
                    </div>
                    <div>
                        <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Today's Earnings</p>
                        <h3 className="text-xl font-black text-slate-900 mt-0.5">₹{stats.todayEarnings}</h3>
                    </div>
                </div>
            </div>

            {/* Current Active Order Section */}
            {activeOrder && (
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 rounded-2xl shadow-lg text-white">
                    <div className="flex justify-between items-center mb-4">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                            ⚡ Active Delivery in Progress
                        </span>
                        <span className="font-black text-sm">₹{activeOrder.totalAmount}</span>
                    </div>

                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm space-y-2 mb-4">
                        <h2 className="text-lg font-black">{activeOrder.customerName}</h2>
                        <p className="text-xs flex items-center gap-2 font-medium opacity-90">
                            <FiMapPin /> {activeOrder.address}
                        </p>
                        <p className="text-xs flex items-center gap-2 font-medium opacity-90">
                            <FiPhone /> {activeOrder.phone}
                        </p>
                        <div className="pt-2 text-xs font-bold border-t border-white/20">
                            Items: {activeOrder.items.join(', ')}
                        </div>
                    </div>

                    <button 
                        onClick={handleCompleteOrder}
                        className="w-full bg-white text-slate-900 font-black text-sm py-3 rounded-xl shadow hover:bg-slate-100 transition-all uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <FiCheck size={16} /> Mark as Delivered
                    </button>
                </div>
            )}

            {/* Available Orders List */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
                    <FiPackage className="text-amber-500" /> New Orders Available for Pickup
                </h3>

                {availableOrders.length === 0 ? (
                    <div className="text-center py-10 text-slate-400 font-bold text-sm">
                        No new orders available right now. Hang tight! ☕
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {availableOrders.map((order) => (
                            <div key={order._id} className="border border-slate-200 rounded-xl p-5 hover:border-amber-500 transition-all flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h4 className="font-black text-slate-900 text-sm">{order.customerName}</h4>
                                            <p className="text-[11px] text-slate-400 font-semibold">{order.phone}</p>
                                        </div>
                                        <span className="text-xs font-black bg-green-50 text-green-700 px-2.5 py-1 rounded-lg border border-green-200">
                                            ₹{order.totalAmount}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-600 flex items-start gap-1.5 mb-3">
                                        <FiMapPin className="mt-0.5 text-slate-400 flex-shrink-0" /> {order.address}
                                    </p>
                                    <div className="bg-slate-50 p-2.5 rounded-lg text-xs font-bold text-slate-700 mb-4">
                                        {order.items.join(', ')}
                                    </div>
                                </div>

                                <button 
                                    disabled={activeOrder !== null}
                                    onClick={() => handleAcceptOrder(order)}
                                    className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-black text-xs py-2.5 rounded-xl transition-all uppercase tracking-wider cursor-pointer"
                                >
                                    {activeOrder !== null ? 'Complete active order first' : 'Accept Order 🛵'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}