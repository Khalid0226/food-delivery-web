import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiPackage, FiMapPin, FiPhone, FiCheck, FiUser, FiCreditCard } from 'react-icons/fi';
import API from '../../services/axiosInstance';

export default function DeliveryOrders() {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    // 👇 Naye States OTP aur Modal ke liye
    const [selectedOrderForOtp, setSelectedOrderForOtp] = useState(null);
    const [deliveryOtp, setDeliveryOtp] = useState('');
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const deliveryBoyId = storedUser?._id;

    const fetchAssignedOrders = async () => {
        try {
            const response = await API.get(`/delivery/assigned-orders?deliveryBoyId=${deliveryBoyId}`)
            if (response.data.message === 'success') {
                setOrders(response.data.orders)
            }
        } catch (error) {
            console.error('failed to fetch orders', error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (deliveryBoyId) {
            fetchAssignedOrders()
        }
    }, [deliveryBoyId])

    // 👇 Naya Function: "Mark Delivered" click hone par OTP send karega aur modal kholega
    const handleOpenOtpModal = async (orderId) => {
        try {
            const response = await API.post(`/delivery/send-delivery-otp/${orderId}`, {});
            alert(`🚀 ${response.data.message || 'OTP sent successfully to customer'}`);
            setSelectedOrderForOtp(orderId);
            setIsOtpModalOpen(true);
        } catch (error) {
            console.error('Failed to send delivery OTP', error);
            alert(error.response?.data?.message || 'Could not send delivery OTP');
        }
    };

    // 👇 Naya Function: Modal ke andar OTP verify karke order complete karega
    const handleVerifyAndComplete = async (e) => {
        e.preventDefault();
        if (!deliveryOtp || deliveryOtp.length !== 6) {
            alert('Please enter a valid 6-digit OTP');
            return;
        }

        try {
            const response = await API.post('/delivery/verify-delivery-otp', {
                orderId: selectedOrderForOtp,
                otp: deliveryOtp
            });

            if (response.status === 200) {
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order._id === selectedOrderForOtp 
                            ? { ...order, status: 'Completed', isPaid: true } 
                            : order
                    )
                );
                alert(`🎉 ${response.data.message}`);
                setIsOtpModalOpen(false);
                setDeliveryOtp('');
                setSelectedOrderForOtp(null);
                fetchAssignedOrders();
            }
        } catch (error) {
            console.error('Failed to verify OTP', error);
            alert(error.response?.data?.message || 'Invalid or Expired Delivery OTP');
        }
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            let endpoint = '';
            let payload = { 
                orderId, 
                deliveryBoyId 
            };

            if (newStatus === 'Preparing') {
                endpoint = '/delivery/accept-order';
            } else if (newStatus === 'In Transit') {
                endpoint = '/delivery/in-transit';
            }

            const response = await API.patch(endpoint, payload);

            if (response.status === 200) {
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                    )
                );
                alert(`Order status updated to: ${newStatus} 🚀`);
            }
        } catch (error) {
            console.error('Failed to update status', error);
            alert(error.response?.data?.message || 'Could not update order status');
        }
    };

    const filteredOrders = filter === 'All'
    ? orders
    : orders.filter(order => order.status?.toLowerCase() === filter.toLowerCase());

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-50 text-green-700 border-green-200';
            case 'In Transit': return 'bg-amber-50 text-amber-700 border-amber-200';
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
                    {['All','pending', 'Preparing', 'In Transit', 'Completed'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex-1 sm:flex-none text-center ${filter === tab
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
                                    <h3 className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">{order._id.slice(-6)}</h3>
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
                                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{order.fullName}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="flex items-center gap-2.5">
                                        <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-600 shadow-sm">
                                            <FiCreditCard size={15} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Payment Method</p>
                                            <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
                                                {order.paymentMethod || 'COD'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-600 font-medium">
                                    <div className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <FiMapPin className="mt-0.5 text-slate-400 flex-shrink-0" size={15} />
                                        <span className="leading-snug">{order.address}</span>
                                    </div>
                                    <a href={`tel:${order.phone}`} className="flex items-center gap-2.5 bg-sky-50 p-3 rounded-xl border border-sky-100 text-sky-700 hover:bg-sky-100 transition-colors">
                                        <FiPhone className="flex-shrink-0" size={15} />
                                        <span className="font-black truncate">{order.mobile}</span>
                                    </a>
                                </div>

                                <div className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-100">
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Ordered Items</p>
                                    <p className="text-xs font-bold text-slate-800 leading-relaxed">
                                        {Array.isArray(order.items)
                                            ? order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')
                                            : order.items}
                                    </p>
                                </div>
                            </div>

                            {/* Card Bottom: Bill & Action Button */}
                            <div className="pt-3 sm:pt-4 border-t border-slate-100 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3">
                                <div>
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Total Bill</span>
                                    <p className="text-base sm:text-lg font-black text-slate-900 leading-tight">₹{order.totalAmount}</p>
                                </div>

                                <div className="w-full xs:w-auto flex justify-end">
                                    {order.status === 'pending' && (
                                        <button
                                            onClick={() => handleUpdateStatus(order._id, 'Preparing')}
                                            className="w-full xs:w-auto bg-amber-500 hover:bg-amber-600 text-white font-black text-xs px-4 py-2.5 rounded-xl transition-all uppercase tracking-wider cursor-pointer shadow-sm text-center"
                                        >
                                            accept order
                                        </button>
                                    )}

                                    {order.status === 'Preparing' && (
                                        <button
                                            onClick={() => handleUpdateStatus(order._id, 'In Transit')}
                                            className="w-full xs:w-auto bg-amber-500 hover:bg-amber-600 text-white font-black text-xs px-4 py-2.5 rounded-xl transition-all uppercase tracking-wider cursor-pointer shadow-sm text-center"
                                        >
                                            mark In Transit
                                        </button>
                                    )}

                                    {order.status === 'In Transit' && (
                                        <button
                                            onClick={() => handleOpenOtpModal(order._id)} // 👈 Updated to trigger OTP Modal
                                            className="w-full xs:w-auto bg-green-600 hover:bg-green-700 text-white font-black text-xs px-4 py-2.5 rounded-xl transition-all uppercase tracking-wider cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                                        >
                                            <FiCheck size={14} /> Mark Delivered
                                        </button>
                                    )}

                                    {order.status === 'Completed' && (
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

            {/* 👇 OTP Verification Modal Popup */}
            {isOtpModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
                    <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm border border-slate-100">
                        <h3 className="text-lg font-black text-slate-900 mb-2">Verify Delivery OTP</h3>
                        <p className="text-xs text-slate-500 mb-4">
                            Enter the 6-digit OTP sent to the customer's email to complete this order.
                        </p>

                        <form onSubmit={handleVerifyAndComplete} className="space-y-4">
                            <input
                                type="text"
                                maxLength="6"
                                value={deliveryOtp}
                                onChange={(e) => setDeliveryOtp(e.target.value.replace(/\D/g, ''))}
                                placeholder="••••••"
                                className="w-full text-center tracking-[0.5em] text-lg font-bold px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:border-emerald-500 focus:bg-white outline-none"
                            />

                            <div className="flex space-x-2">
                                <button
                                    type="button"
                                    onClick={() => { setIsOtpModalOpen(false); setDeliveryOtp(''); }}
                                    className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
                                >
                                    Verify & Complete
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}