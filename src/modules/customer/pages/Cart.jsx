import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { addToCart, decrementFromCart, removeFromCart } from '../../../redux/store';

export default function Cart() {
    const navigate = useNavigate(); // Initialize navigate
    const cart = useSelector((state) => state.cart);
    const items = cart.items || [];
    const dispatch = useDispatch();

    const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 tracking-tight uppercase">Your Cart</h1>

                {items.length === 0 ? (
                    <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-slate-200/80">
                        <div className="text-6xl mb-4 flex justify-center text-slate-300"><FiShoppingBag /></div>
                        <p className="text-slate-500 font-bold text-lg">Aapka cart abhi khali hai!</p>
                        <button 
                            onClick={() => navigate('/customer/dashboard')} // Use navigate instead of window.location
                            className="mt-6 px-8 py-3 bg-slate-900 text-white rounded-xl font-black hover:bg-orange-500 transition-all shadow-lg shadow-slate-200"
                        >
                            Menu par wapas jayein
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        {/* Cart Items */}
                        <div className="flex-1 w-full space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="bg-white p-4 sm:p-5 rounded-2xl flex items-center gap-4 sm:gap-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-all">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-slate-100" />
                                    
                                    <div className="flex-1">
                                        <h3 className="font-black text-slate-900 text-sm md:text-lg">{item.name}</h3>
                                        <p className="text-orange-600 font-bold text-sm">₹{item.price}</p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center bg-orange-500 text-white rounded-xl shadow-sm overflow-hidden p-1">
                                        <button onClick={() => dispatch(decrementFromCart(item.id))} className="w-7 h-7 flex items-center justify-center font-black hover:bg-orange-600 rounded-lg transition-all">-</button>
                                        <span className="w-8 text-center font-black text-sm">{item.quantity}</span>
                                        <button onClick={() => dispatch(addToCart(item))} className="w-7 h-7 flex items-center justify-center font-black hover:bg-orange-600 rounded-lg transition-all">+</button>
                                    </div>

                                    <button onClick={() => dispatch(removeFromCart(item.id))} className="text-slate-400 p-2 hover:text-red-500 transition-colors"><FiTrash2 /></button>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="w-full lg:w-96 flex-shrink-0">
                            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200/80 lg:sticky lg:top-8">
                                <h2 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-wider">Order Summary</h2>
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-slate-600 font-bold text-sm">
                                        <span>Subtotal</span>
                                        <span>₹{totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600 font-bold text-sm">
                                        <span>Delivery Fee</span>
                                        <span className="text-emerald-600">Free</span>
                                    </div>
                                    <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                                        <span className="text-base font-black text-slate-900">Grand Total</span>
                                        <span className="text-2xl font-black text-orange-600">₹{totalPrice}</span>
                                    </div>
                                </div>
                                
                                <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-black hover:bg-orange-500 transition-all shadow-lg shadow-orange-500/20">
                                    Proceed to Pay
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}