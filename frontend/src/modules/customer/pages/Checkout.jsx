import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiMapPin, FiCreditCard, FiUser, FiSmartphone, FiCheckCircle, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../../redux/store';

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

    const handlePlaceOrder = () => {
        if (!formData.fullName || !formData.address || !formData.mobile) {
            alert("Kripya sabhi zaroori details bharein!");
            return;
        }
        
        // Yahan aap apna backend API call (axios.post) perform kar sakte hain
        console.log("Order Data:", { items, total, ...formData });
        
        alert("Order Successfully Placed!");
        
        dispatch(clearCart())
        navigate('/customer/dashboard'); // Success ke baad dashboard pe redirect
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
                            <h2 className={sectionTitle}><FiUser className="text-orange-500"/> Contact Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <FiUser className="absolute left-4 top-3.5 text-slate-400" />
                                    <input name="fullName" onChange={handleInputChange} placeholder="Full Name" className={inputStyle} />
                                </div>
                                <div className="relative">
                                    <FiSmartphone className="absolute left-4 top-3.5 text-slate-400" />
                                    <input name="mobile" onChange={handleInputChange} placeholder="Mobile Number" className={inputStyle} />
                                </div>
                            </div>
                        </div>

                        {/* 2. Delivery Address */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h2 className={sectionTitle}><FiMapPin className="text-orange-500"/> Delivery Address</h2>
                            <div className="space-y-4">
                                <textarea name="address" onChange={handleInputChange} placeholder="Complete Delivery Address (Area, Street, Flat)" className={`${inputStyle} h-24 pt-3`}></textarea>
                                <div className="grid grid-cols-2 gap-4">
                                    <input name="pincode" onChange={handleInputChange} placeholder="Pincode" className={inputStyle.replace('pl-11', 'pl-4')} />
                                    <input name="city" onChange={handleInputChange} placeholder="City" className={inputStyle.replace('pl-11', 'pl-4')} />
                                </div>
                            </div>
                        </div>

                        {/* 3. Payment Method */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h2 className={sectionTitle}><FiCreditCard className="text-orange-500"/> Payment Method</h2>
                            <div className="grid grid-cols-1 gap-3">
                                {['Cash on Delivery', 'Credit/Debit Card', 'UPI / Net Banking'].map((method) => (
                                    <label key={method} className="flex items-center p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-orange-500 transition-all group">
                                        <input type="radio" name="paymentMethod" value={method} onChange={handleInputChange} className="w-4 h-4 accent-orange-500" />
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
                                    <div key={item.id} className="flex justify-between items-center text-sm">
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

                            <button onClick={handlePlaceOrder} className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-xl text-sm uppercase tracking-wider transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2">
                                Place Order <FiChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}