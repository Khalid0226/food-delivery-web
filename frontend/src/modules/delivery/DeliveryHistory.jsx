import React, { useState } from 'react';
import { FiCheckCircle, FiCalendar, FiDollarSign, FiPackage, FiUser, FiMapPin } from 'react-icons/fi';

export default function DeliveryHistory() {
    // Static / Sample history data (Aap ise API se bhi fetch kar sakte hain)
    const [historyOrders] = useState([
        {
            _id: 'ord_103',
            customerName: 'Amit Patel',
            phone: '9988776655',
            address: '10, Swastik Society, Navrangpura, Ahmedabad',
            items: 'Veg Fried Rice x1, Manchurian x1',
            totalAmount: 420,
            deliveryEarnings: 45,
            deliveredAt: '26 July 2026, 02:30 PM'
        },
        {
            _id: 'ord_098',
            customerName: 'Priya Sharma',
            phone: '9876501234',
            address: 'Flat 104, Orchid Heights, Satellite, Ahmedabad',
            items: 'Paneer Butter Masala x2, Roti x5',
            totalAmount: 680,
            deliveryEarnings: 60,
            deliveredAt: '25 July 2026, 09:15 PM'
        },
        {
            _id: 'ord_095',
            customerName: 'Rajesh Kumar',
            phone: '9123498765',
            address: '3, Nilkanth Residency, Bopal, Ahmedabad',
            items: 'Chicken Biryani x1, Thums Up x1',
            totalAmount: 350,
            deliveryEarnings: 40,
            deliveredAt: '24 July 2026, 01:45 PM'
        }
    ]);

    // Calculate total stats
    const totalCompleted = historyOrders.length;
    const totalEarningsCollected = historyOrders.reduce((acc, order) => acc + order.deliveryEarnings, 0);

    return (
        <div className="w-full max-w-7xl mx-auto space-y-4 md:space-y-6">
            
            {/* Page Header */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                        Delivery History 📜
                    </h1>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                        Log of all your successfully completed deliveries
                    </p>
                </div>

                {/* Quick Summary Badges */}
                <div className="flex gap-2 w-full sm:w-auto">
                    <div className="flex-1 sm:flex-none bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-center">
                        <p className="text-[10px] font-black uppercase text-slate-400">Total Delivered</p>
                        <p className="text-sm font-black text-slate-900">{totalCompleted} Orders</p>
                    </div>
                    <div className="flex-1 sm:flex-none bg-green-50 border border-green-200 px-4 py-2 rounded-xl text-center">
                        <p className="text-[10px] font-black uppercase text-green-600">Total Earned</p>
                        <p className="text-sm font-black text-green-700">₹{totalEarningsCollected}</p>
                    </div>
                </div>
            </div>

            {/* History Orders List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {historyOrders.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 font-bold text-sm shadow-sm">
                        No delivery history found yet. 🛵
                    </div>
                ) : (
                    historyOrders.map((order) => (
                        <div key={order._id} className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all gap-4">
                            
                            {/* Card Top: Order ID & Completion Timestamp */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                                <div>
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Order ID</span>
                                    <h3 className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">{order._id}</h3>
                                </div>
                                <span className="text-[10px] sm:text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider border bg-green-50 text-green-700 border-green-200 flex items-center gap-1.5 self-start sm:self-auto">
                                    <FiCheckCircle size={13} /> Delivered Successfully
                                </span>
                            </div>

                            {/* Card Middle: Customer, Address & Items */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="p-2 bg-white rounded-lg border border-slate-200 text-amber-500 shadow-sm">
                                        <FiUser size={16} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Customer</p>
                                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{order.customerName} ({order.phone})</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 font-medium">
                                    <FiMapPin className="mt-0.5 text-slate-400 flex-shrink-0" size={15} /> 
                                    <span className="leading-snug">{order.address}</span>
                                </div>

                                <div className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-100">
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Delivered Items</p>
                                    <p className="text-xs font-bold text-slate-800 leading-relaxed">{order.items}</p>
                                </div>
                            </div>

                            {/* Card Bottom: Delivery Date & Earnings */}
                            <div className="pt-3 sm:pt-4 border-t border-slate-100 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3">
                                <div>
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                                        <FiCalendar size={12} /> Delivered On
                                    </span>
                                    <p className="text-xs font-bold text-slate-700 mt-0.5">{order.deliveredAt}</p>
                                </div>

                                <div className="text-left xs:text-right">
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Your Earnings</span>
                                    <p className="text-base sm:text-lg font-black text-green-600 leading-tight">+₹{order.deliveryEarnings}</p>
                                </div>
                            </div>

                        </div>
                    ))
                )}
            </div>
        </div>
    );
}