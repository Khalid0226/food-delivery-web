import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPackage, FiCheckCircle, FiDollarSign, FiClock, FiMapPin, FiPhone, FiCheck, FiCreditCard, FiX, FiShield, FiMail } from 'react-icons/fi';
import API from '../../services/axiosInstance';

export default function DeliveryDashboard() {
    const [stats, setStats] = useState({
        totalDeliveries: 0,
        pendingOrders: 0,
        todayEarnings: 0,
    });

    const [isOnline, setIsOnline] = useState(false);
    const [availableOrders, setAvailableOrders] = useState([]);
    const [activeOrder, setActiveOrder] = useState(null);

    // --- OTP States ---
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
    const [deliveryOtp, setDeliveryOtp] = useState('');
    const [selectedOrderForOtp, setSelectedOrderForOtp] = useState(null);

    const fetchDashboardData = async () => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const userId = storedUser?._id;

            const response = await API.get(`/delivery/dashboard-data?userId=${userId}`)
            if (response.data.message === 'success') {
                setAvailableOrders(response.data.availableOrders)
                setStats(response.data.states);

                if (response.data.activeOrder) {
                    setActiveOrder(response.data.activeOrder)
                }
            }

            if (response.data.states.isOnline !== undefined) {
                setIsOnline(response.data.states.isOnline);
            }

        } catch (error) {
            console.error('failed to fetch data', error);
        }
    }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const handleToggleOnline = async () => {
        try {
            const newStatus = !isOnline
            const storedUser = JSON.parse(localStorage.getItem('user'))
            const userId = storedUser?._id

            const response = await API.patch('/delivery/update-status', {
                userId,
                isOnline: newStatus
            })

            if (response.status === 200) {
                setIsOnline(newStatus)
                fetchDashboardData()
            }
        } catch (error) {
            console.error('failed to toggle', error);
            alert(error.response?.data?.message || 'Could not change status on server');
        }
    }

    // Order Accept karne ka function
    const handleAcceptOrder = async (order) => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'))
            const deliveryBoyId = storedUser?._id

            if (!deliveryBoyId) {
                alert("Delivery boy ID not found. Please login again.");
                return
            }

            const response = await API.patch('/delivery/accept-order', {
                orderId: order._id,
                deliveryBoyId
            })

            if (response.status === 200) {
                setActiveOrder(response.data.order)
                setAvailableOrders(availableOrders.filter((o) => o._id !== order._id))
                alert('order accepted successfully!!')
            }

        } catch (error) {
            console.error('Failed to accept order', error);
            alert(error.response?.data?.message || 'Could not accept order');
        }
    };

    // --- 1. Step 1: Send OTP API Call (Mark as Delivered button click par chalega) ---
    const handleOpenOtpModal = async (orderId) => {
        try {
            const response = await API.post(`/delivery/send-delivery-otp/${orderId}`);
            if (response.status === 200) {
                setSelectedOrderForOtp(orderId);
                setDeliveryOtp('');
                setIsOtpModalOpen(true);
                alert("6-digit OTP sent to customer's email address! 📧");
            }
        } catch (error) {
            console.error('Failed to send OTP', error);
            alert(error.response?.data?.message || 'Could not send OTP');
        }
    };

    // --- 2. Step 2: Verify OTP & Complete Order API Call ---
    const handleVerifyAndComplete = async () => {
        try {
            if (!deliveryOtp || deliveryOtp.length < 6) {
                alert('Please enter a valid 6-digit OTP');
                return;
            }

            const storedUser = JSON.parse(localStorage.getItem('user'));
            const deliveryBoyId = storedUser?._id;

            const response = await API.post("/delivery/verify-delivery-otp", {
                orderId: selectedOrderForOtp,
                otp: deliveryOtp,
                deliveryBoyId
            });

            if (response.status === 200) {
                alert('Order verified & delivered successfully! 🎉');
                setIsOtpModalOpen(false);
                setActiveOrder(null);
                setSelectedOrderForOtp(null);
                setDeliveryOtp('');
                setStats((prev) => ({
                    ...prev,
                    totalDeliveries: prev.totalDeliveries + 1,
                    todayEarnings: prev.todayEarnings + 50
                }));
            }
        } catch (error) {
            console.error('Failed to verify OTP', error);
            alert(error.response?.data?.message || 'Invalid OTP or failed to complete order');
        }
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
                        onClick={handleToggleOnline}
                        className={`ml-2 px-3 py-1 text-[11px] font-black rounded-lg transition-all ${isOnline ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
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
                        <h2 className="text-lg font-black">{activeOrder.fullName}</h2>
                        <p className="text-xs flex items-center gap-2 font-medium opacity-90">
                            <FiMapPin /> {activeOrder.address}
                        </p>
                        <p className="text-xs flex items-center gap-2 font-medium opacity-90">
                            <FiPhone /> {activeOrder.mobile}
                        </p>
                        <div className="pt-2 text-xs font-bold border-t border-white/20">
                            Items: {activeOrder.items.map(item => item.name || item).join(', ')}
                        </div>
                    </div>

                    <button
                        onClick={() => handleOpenOtpModal(activeOrder._id)}
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
                                            <h4 className="font-black text-slate-900 text-sm">{order.fullName}</h4>
                                            <p className="text-[11px] text-slate-400 font-semibold">{order.mobile}</p>
                                        </div>
                                        <span className="text-xs font-black bg-green-50 text-green-700 px-2.5 py-1 rounded-lg border border-green-200">
                                            ₹{order.totalAmount}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-600 flex items-start gap-1.5 mb-3">
                                        <FiCreditCard className="mt-0.5 text-slate-400 flex-shrink-0" /> {order.paymentMethod}
                                    </p>
                                    <p className="text-xs text-slate-600 flex items-start gap-1.5 mb-3">
                                        <FiMapPin className="mt-0.5 text-slate-400 flex-shrink-0" /> {order.address}
                                    </p>
                                    <div className="bg-slate-50 p-2.5 rounded-lg text-xs font-bold text-slate-700 mb-4">
                                        {order.items.map(item => item.name || item).join(', ')}
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

            {/* --- Email OTP Verification Modal Popup (6-Digit) --- */}
            {isOtpModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2 text-amber-600">
                                <FiMail size={20} />
                                <h3 className="text-base font-black text-slate-900">Email OTP Verification</h3>
                            </div>
                            <button 
                                onClick={() => setIsOtpModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-all cursor-pointer"
                            >
                                <FiX size={18} />
                            </button>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mb-4">
                            Please ask the customer for the <span className="font-bold text-slate-700">6-digit verification OTP</span> sent to their email address.
                        </p>
                        <div className="space-y-4">
                            <input
                                type="text"
                                maxLength="6"
                                placeholder="Enter 6-digit OTP"
                                value={deliveryOtp}
                                onChange={(e) => setDeliveryOtp(e.target.value)}
                                className="w-full text-center text-2xl font-black tracking-widest py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 bg-slate-50"
                            />
                            <button
                                onClick={handleVerifyAndComplete}
                                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black text-xs py-3 rounded-xl uppercase tracking-wider transition-all shadow-md shadow-amber-500/25 cursor-pointer"
                            >
                                Verify & Complete Delivery 🚀
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}