import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiSearch } from 'react-icons/fi';
import { addToCart, removeFromCart, decrementFromCart } from '../../../redux/store';
import { useEffect } from 'react';
import axios from 'axios';

// Diamond Fry Center - Premium Catalogue
// export const MENU_ITEMS = [
//     { id: 1, name: 'Crispy Chicken Fry', category: 'Chicken', price: 249, rating: 4.8, image: '/b-1.jpg', tags: 'Best Seller', description: 'Deep fried tender chicken pieces seasoned with premium in-house diamond spices.' },
//     { id: 2, name: 'Spicy Fish Fry', category: 'Fish', price: 299, rating: 4.7, image: '/b-2.jpg', tags: 'Chef Special', description: 'Freshwater catch coated with traditional coastal marination and golden fried.' },
//     { id: 3, name: 'Diamond Double Chicken Burger', category: 'Burgers', price: 189, rating: 4.5, image: '/p-2.jpg', tags: 'Trending', description: 'Dual stacked crispy chicken patties layered with liquid cheese and premium relish.' },
//     { id: 4, name: 'Peri Peri French Fries', category: 'Sides', price: 99, rating: 4.3, image: '/p-3.jpg', tags: 'Crispy', description: 'Fluffy potato fingers tossed in our signature smoky peri-peri blend.' },
//     { id: 5, name: 'Garlic Butter Prawns Fry', category: 'Seafood', price: 349, rating: 4.9, image: '/p-4.jpg', tags: 'Premium', description: 'Jumbo prawns pan-seared with exquisite garlic clarified butter and fresh herbs.' },
//     { id: 6, name: 'Executive Chicken Platter', category: 'Platters', price: 499, rating: 4.9, image: '/p-5.jpg', tags: 'Mega Meal', description: 'All-in-one curated feast featuring chicken fry, wings, strips, and premium dips.' },
//     { id: 7, name: 'Executive Chicken Platter', category: 'Platters', price: 499, rating: 4.9, image: '/b-1.jpg', tags: 'Mega Meal', description: 'All-in-one curated feast featuring chicken fry, wings, strips, and premium dips.' },
//     { id: 8, name: 'Executive Chicken Platter', category: 'Platters', price: 499, rating: 4.9, image: '/b-2.jpg', tags: 'Mega Meal', description: 'All-in-one curated feast featuring chicken fry, wings, strips, and premium dips.' },
//     { id: 9, name: 'Executive Chicken Platter', category: 'Platters', price: 499, rating: 4.9, image: '/p-2.jpg', tags: 'Mega Meal', description: 'All-in-one curated feast featuring chicken fry, wings, strips, and premium dips.' },
//     { id: 10, name: 'Executive Chicken Platter', category: 'Platters', price: 499, rating: 4.9, image: '/p-3.jpg', tags: 'Mega Meal', description: 'All-in-one curated feast featuring chicken fry, wings, strips, and premium dips.' },
//     { id: 11, name: 'Executive Chicken Platter', category: 'Platters', price: 499, rating: 4.9, image: '/p-4.jpg', tags: 'Mega Meal', description: 'All-in-one curated feast featuring chicken fry, wings, strips, and premium dips.' },
//     { id: 12, name: 'Executive Chicken Platter', category: 'Platters', price: 499, rating: 4.9, image: '/p-5.jpg', tags: 'Mega Meal', description: 'All-in-one curated feast featuring chicken fry, wings, strips, and premium dips.' },
// ];

export default function CustomerDashboard() {

    const CATEGORIES = ['All', 'Chicken', 'Fish', 'Seafood', 'Burgers', 'Sides', 'Platters'];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.items);

    const [activeTab, setActiveTab] = useState('menu');
    const [menuItems, setMenuItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = useMemo(() => {
        return menuItems.filter(item => {
            const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery,menuItems]);

    const getQty = (id) => {
        const item = cartItems.find(i => i._id === id);
        return item ? item.quantity : 0;
    };

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:2500/api/menu/view-item')
            setMenuItems(response.data.item)
            console.log("Backend Data:", response.data.item);
        } catch (error) {
            console.error(error);
            alert('failed to fetch items')

        }
    }

    useEffect(() => {
        fetchItems()
    }, [])


    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'menu' && (
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                        <div className="xl:col-span-12 space-y-8">
                            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex items-center">
                                <div className="w-full relative">
                                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for crispy chicken, fish fry, gourmet platters..." className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all" />
                                </div>
                            </div>

                            <div className="hidden md:flex flex-col items-center justify-center w-full">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3 text-center">Inspiration for your first order</h3>
                                <div className="bg-white border border-slate-200/80 rounded-full p-1.5 shadow-sm max-w-full overflow-x-auto no-scrollbar flex items-center justify-center gap-1.5">
                                    {CATEGORIES.map((cat) => (
                                        <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all border whitespace-nowrap cursor-pointer ${selectedCategory === cat ? 'bg-orange-500 text-white border-transparent shadow-sm shadow-orange-500/10' : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>{cat}</button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-base md:text-lg font-black text-slate-900 mb-5 tracking-tight uppercase border-b border-slate-200/60 pb-2">{selectedCategory === 'All' ? 'All' : selectedCategory} Delicacies</h2>
                                {filteredItems.length === 0 ? (
                                    <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                        <p className="text-4xl block mb-2">🍽️</p>
                                        <p className="text-sm font-bold text-slate-500">No delicious items match your search filter.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                        {filteredItems.map((item) => {
                                            const qty = getQty(item._id);
                                            return (
                                                <div key={item._id} onClick={() => navigate(`/product/${item._id}`)} className="bg-white border border-slate-200/80 rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative cursor-pointer">
                                                    <div>
                                                        <div className="w-full aspect-square bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden relative select-none mb-3">
                                                            <img src={`http://localhost:2500/uploads/${item.image}`} alt={item.name} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <div className="flex items-center justify-between gap-1">
                                                                <span className="bg-amber-50 text-amber-700 text-[8px] md:text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider border border-amber-100 truncate">{item.category}</span>
                                                                <span className="text-[10px] md:text-[11px] font-bold text-slate-500 flex items-center gap-0.5 shrink-0">⭐ {item.rating || 4.3}</span>
                                                            </div>
                                                            <h4 className="font-black text-xs md:text-sm text-slate-900 tracking-tight line-clamp-1">{item.name}</h4>
                                                            <p className="text-[10px] md:text-[11px] text-slate-400 font-medium leading-normal line-clamp-2 min-h-[32px]">{item.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-50 w-full">
                                                        <span className="text-xs md:text-sm font-black text-slate-950">₹{item.price}</span>
                                                        {qty > 0 ? (
                                                            <div className="flex items-center bg-orange-500 text-white rounded-lg md:rounded-xl shadow-sm overflow-hidden p-0.5" onClick={(e) => e.stopPropagation()}>
                                                                <button onClick={() => dispatch(decrementFromCart(item._id))} className="w-5 h-5 md:w-7 md:h-7 text-[10px] md:text-xs font-black hover:bg-orange-600 rounded-md md:rounded-lg transition-all">-</button>
                                                                <span className="px-1.5 md:px-2.5 text-[10px] md:text-xs font-black">{qty}</span>
                                                                <button onClick={() => dispatch(addToCart(item))} className="w-5 h-5 md:w-7 md:h-7 text-[10px] md:text-xs font-black hover:bg-orange-600 rounded-md md:rounded-lg transition-all">+</button>
                                                            </div>
                                                        ) : (
                                                            <button onClick={(e) => { e.stopPropagation(); dispatch(addToCart(item)); }} className="bg-white hover:bg-orange-500 border border-orange-200 hover:border-transparent text-orange-500 hover:text-white font-black text-[9px] md:text-[10px] px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl uppercase tracking-wider transition-all active:scale-95 shadow-sm">Add +</button>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}