import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // useSelector import kiya
import { useParams, useNavigate } from 'react-router-dom';
import { MENU_ITEMS } from '../CustomerDashboard';
import CustomerHeader from '../../../../components/CustomerHeader';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { addToCart, removeFromCart,decrementFromCart } from '../../../../redux/store'; // removeFromCart import kiya

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Redux store se data fetch karein
    const cartItems = useSelector((state) => state.cart.items);
    
    // Product details aur Redux mein item ki quantity check karein
    const product = MENU_ITEMS.find(item => item.id === parseInt(id));
    const cartItem = cartItems.find(item => item.id === parseInt(id));
    const quantity = cartItem ? cartItem.quantity : 0;

    // Header ke liye total count (sab items ka sum)
    const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    // Navigation handle karne ka function
    const handleTabChange = (tab) => {
        if (tab === 'menu') navigate('/customer/dashboard');
        else if (tab === 'orders') navigate('/customer/orders');
        else if (tab === 'settings') navigate('/customer/account');
    };

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center font-bold text-slate-600">
            Product nahi mila!
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header Component */}
            <CustomerHeader
                setActiveTab={handleTabChange}
                cartCount={totalCartCount} // Redux se dynamic count
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

                            {/* Actions Section */}
                            <div className="flex flex-col gap-4 mt-auto">
                                {quantity === 0 ? (
                                    <button
                                        onClick={() => dispatch(addToCart(product))}
                                        className="w-full bg-slate-900 text-white py-4 rounded-xl font-black hover:bg-slate-800 transition-all duration-300"
                                    >
                                        Add to Cart
                                    </button>
                                ) : (
                                    <div className="flex items-center justify-between bg-slate-100 p-2 rounded-xl w-full">
                                        <button
                                            onClick={() => dispatch(decrementFromCart(product.id))}
                                            className="p-4 bg-white rounded-lg shadow-sm hover:text-red-600 transition-all active:scale-95"
                                        >
                                            <FiMinus />
                                        </button>
                                        <span className="font-black text-xl w-12 text-center">{quantity}</span>
                                        <button
                                            onClick={() => dispatch(addToCart(product))}
                                            className="p-4 bg-white rounded-lg shadow-sm hover:text-green-600 transition-all active:scale-95"
                                        >
                                            <FiPlus />
                                        </button>
                                    </div>
                                )}

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