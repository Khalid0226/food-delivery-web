import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MENU_ITEMS } from '../CustomerDashboard';
import CustomerHeader from '../../../../components/CustomerHeader';
import { FiMinus, FiPlus } from 'react-icons/fi';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [quantity, setQuantity] = useState(0);

    // Navigation handle karne ka function
    const handleTabChange = (tab) => {
        if (tab === 'menu') navigate('/customer/dashboard');
        else if (tab === 'orders') navigate('/customer/orders'); // Yahan apna sahi route path check kar lein
        else if (tab === 'settings') navigate('/customer/account');
    };

    const product = MENU_ITEMS.find(item => item.id === parseInt(id));

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center font-bold text-slate-600">
            Product nahi mila!
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header Component - Props updated */}
            <CustomerHeader
                // activeTab="menu" 
                setActiveTab={handleTabChange}
                cartCount={quantity}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                handleLogout={() => {
                    localStorage.removeItem('isCustomerLoggedIn');
                    navigate('/Login');
                }}
            />

            {/* Main Content */}
            <div className="py-10 px-4 md:px-20">
                <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

                        {/* Product Image */}
                        <div className="relative group">
                            <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center p-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col">
                            <div className="space-y-4">
                                <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">{product.name}</h1>

                                <div className="flex items-center gap-3">
                                    <span className="bg-emerald-600 text-white px-2 py-0.5 rounded text-xs font-black flex items-center gap-1">
                                        ★ {product.rating}
                                    </span>
                                    <span className="text-sm text-slate-400 font-medium">Verified Product</span>
                                </div>

                                <p className="text-slate-600 text-lg leading-relaxed">{product.description}</p>

                                <div className="flex items-baseline gap-4 py-2">
                                    <span className="text-4xl font-black text-slate-900">₹{product.price}</span>
                                    <span className="text-xl text-slate-400 line-through font-semibold">₹{product.price + 250}</span>
                                    <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Save ₹250</span>
                                </div>
                            </div>

                            {/* Offers Box */}
                            <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl my-8">
                                <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">Available Offers</h3>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li className="flex items-center gap-2">✅ <span className="font-medium">Special Price:</span> Get extra 10% off</li>
                                    <li className="flex items-center gap-2">✅ <span className="font-medium">Bank Offer:</span> 5% Unlimited Cashback</li>
                                    <li className="flex items-center gap-2">✅ <span className="font-medium">Partner:</span> Free subscription included</li>
                                </ul>
                            </div>

                            {/* Actions */}
                            {/* Quantity Selector / Add to Cart */}
                            {/* Actions Section - Mobile Friendly */}
                            {/* Actions Section - Optimized for all screens */}
                            <div className="flex flex-col gap-4 mt-8">
                                {/* Yeh logic decide karega ki counter dikhana hai ya Add to Cart button */}
                                {quantity === 0 ? (
                                    <button
                                        onClick={() => setQuantity(1)}
                                        className="w-full bg-slate-900 text-white py-4 rounded-xl font-black hover:bg-slate-800 transition-all duration-300"
                                    >
                                        Add to Cart
                                    </button>
                                ) : (
                                    <div className="flex items-center justify-between bg-slate-100 p-2 rounded-xl w-full">
                                        <button
                                            onClick={() => setQuantity(q => Math.max(0, q - 1))}
                                            className="p-4 bg-white rounded-lg shadow-sm hover:text-red-600 transition-all"
                                        >
                                            <FiMinus />
                                        </button>
                                        <span className="font-black text-xl w-12 text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(q => q + 1)}
                                            className="p-4 bg-white rounded-lg shadow-sm hover:text-green-600 transition-all"
                                        >
                                            <FiPlus />
                                        </button>
                                    </div>
                                )}

                                {/* Buy Now Button - Mobile par poori width lega */}
                                <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-xl font-black shadow-lg shadow-orange-200 transition-all duration-300 active:scale-[0.98]">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}