import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiMapPin, FiCreditCard, FiUser, FiSmartphone, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../../redux/store';
import API from '../../../services/axiosInstance';

export default function Checkout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { items } = useSelector((state) => state.cart);

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        mobile: '',
        address: '',
        pincode: '',
        city: '',
        paymentMethod: 'Cash on Delivery'
    });

    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async () => {
        if (!formData.fullName || !formData.address || !formData.mobile) {
            alert("Kripya sabhi zaroori details bharein!");
            return;
        }

        const userData = JSON.parse(localStorage.getItem('user'));

        if (!userData) {
            alert('Please login first');
            navigate('/login');
            return;
        }

        // Base order data structure (Backend ke sath fully matched)
        const baseOrderData = {
            fullName: formData.fullName,
            email: userData.email,
            mobile: formData.mobile,
            address: formData.address,
            pincode: formData.pincode,
            city: formData.city,
            paymentMethod: formData.paymentMethod,
            items: items,
            totalAmount: total
        };

        // 1. Agar payment method Cash on Delivery hai
        if (formData.paymentMethod === 'Cash on Delivery') {
            try {
                const response = await API.post('/orders', {
                    ...baseOrderData,
                    paymentId: null,
                    isPaid: false
                });

                if (response.status === 201 || response.status === 200) {
                    alert("Order Successfully Placed! Invoice sent to your email 🚀");
                    dispatch(clearCart());
                    navigate('/customer/dashboard');
                }
            } catch (error) {
                console.error("Order error:", error);
                alert(error.response?.data?.message || 'Failed to place order!!!');
            }
        } 
        // 2. Agar Online Payment hai toh Razorpay gateway kholo
        else {
            try {
                const { data } = await API.post('/payment/create-order', {
                    amount: total
                });

                if (!data.success) {
                    alert("Razorpay order creation failed!");
                    return;
                }

                const razorpayOrder = data.order;

                const options = {
                    key: data.keyId, // <--- Backend se aane wali active key yahan dynamic set ho gayi hai
                    amount: razorpayOrder.amount,
                    currency: "INR",
                    name: "Diamond Fry Center",
                    description: "Food Delivery Online Payment",
                    order_id: razorpayOrder.id,
                    handler: async function (response) {
                        try {
                            const verifyRes = await API.post('/payment/verify-payment', {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            });

                            if (verifyRes.data.success) {
                                const finalOrderRes = await API.post('/orders', {
                                    ...baseOrderData,
                                    paymentId: response.razorpay_payment_id,
                                    isPaid: true
                                });

                                if (finalOrderRes.status === 201 || finalOrderRes.status === 200) {
                                    alert("Payment Successful & Order Placed! Invoice sent to your email 🎉");
                                    dispatch(clearCart());
                                    navigate('/customer/dashboard');
                                }
                            } else {
                                alert("Payment verification failed!");
                            }
                        } catch (err) {
                            console.error("Verification error:", err);
                            alert("Something went wrong during payment verification.");
                        }
                    },
                    prefill: {
                        name: formData.fullName,
                        email: userData.email,
                        contact: formData.mobile
                    },
                    theme: {
                        color: "#FF1744"
                    }
                };

                const rzp = new window.Razorpay(options);
                rzp.open();

            } catch (error) {
                console.error("Payment Gateway Error:", error);
                alert("Failed to initiate online payment.");
            }
        }
    };

    const inputStyle = "w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all";
    const sectionTitle = "text-sm font-black text-slate-900 uppercase tracking-wider mb-5 flex items-center gap-2";

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight">Secure Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {/* 1. Contact Details */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h2 className={sectionTitle}><FiUser className="text-orange-500" /> Contact Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <FiUser className="absolute left-4 top-3.5 text-slate-400" />
                                    <input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Full Name" className={inputStyle} />
                                </div>
                                <div className="relative">
                                    <FiSmartphone className="absolute left-4 top-3.5 text-slate-400" />
                                    <input name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="Mobile Number" className={inputStyle} />
                                </div>
                            </div>
                        </div>

                        {/* 2. Delivery Address */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h2 className={sectionTitle}><FiMapPin className="text-orange-500" /> Delivery Address</h2>
                            <div className="space-y-4">
                                <textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="Complete Delivery Address (Area, Street, Flat)" className={`${inputStyle} h-24 pt-3`}></textarea>
                                <div className="grid grid-cols-2 gap-4">
                                    <input name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="Pincode" className={inputStyle.replace('pl-11', 'pl-4')} />
                                    <input name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className={inputStyle.replace('pl-11', 'pl-4')} />
                                </div>
                            </div>
                        </div>

                        {/* 3. Payment Method */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h2 className={sectionTitle}><FiCreditCard className="text-orange-500" /> Payment Method</h2>
                            <div className="grid grid-cols-1 gap-3">
                                {['Cash on Delivery', 'Credit/Debit Card', 'UPI / Net Banking'].map((method) => (
                                    <label key={method} className="flex items-center p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-orange-500 transition-all group">
                                        <input type="radio" name="paymentMethod" value={method} checked={formData.paymentMethod === method} onChange={handleInputChange} className="w-4 h-4 accent-orange-500" />
                                        <span className="ml-3 text-sm font-bold text-slate-700 group-hover:text-slate-900">{method}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-8">
                            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-5 border-b pb-3">Order Review</h2>
                            <div className="space-y-4 mb-6">
                                {items.map(item => (
                                    <div key={item._id} className="flex justify-between items-center text-sm">
                                        <span className="text-slate-600 font-medium">{item.name} <span className="text-slate-400">x{item.quantity}</span></span>
                                        <span className="font-bold text-slate-900">₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-slate-100 pt-4 space-y-3 text-sm">
                                <div className="flex justify-between text-slate-500 font-medium"><span>Subtotal</span> <span>₹{subtotal}</span></div>
                                <div className="flex justify-between text-slate-500 font-medium"><span>GST (5%)</span> <span>₹{tax}</span></div>
                                <div className="flex justify-between text-base font-black text-slate-950 pt-2 border-t">
                                    <span>Total</span>
                                    <span className="text-orange-500">₹{total}</span>
                                </div>
                            </div>

                            <button onClick={handlePlaceOrder} className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-xl text-sm uppercase tracking-wider transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2 cursor-pointer">
                                Place Order <FiChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}