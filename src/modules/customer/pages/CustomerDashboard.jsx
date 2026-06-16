import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// Diamond Fry Center - Premium Catalogue
const MENU_ITEMS = [
    { id: 1, name: 'Crispy Chicken Fry', category: 'Chicken', price: 249, rating: 4.8, image: '/b-1.jpg', tags: 'Best Seller', description: 'Deep fried tender chicken pieces seasoned with premium in-house diamond spices.' },
    { id: 2, name: 'Spicy Fish Fry', category: 'Fish', price: 299, rating: 4.7, image: '/b-2.jpg', tags: 'Chef Special', description: 'Freshwater catch coated with traditional coastal marination and golden fried.' },
    { id: 3, name: 'Diamond Double Chicken Burger', category: 'Burgers', price: 189, rating: 4.5, image: '/p-2.jpg', tags: 'Trending', description: 'Dual stacked crispy chicken patties layered with liquid cheese and premium relish.' },
    { id: 4, name: 'Peri Peri French Fries', category: 'Sides', price: 99, rating: 4.3, image: '/p-3.jpg', tags: 'Crispy', description: 'Fluffy potato fingers tossed in our signature smoky peri-peri blend.' },
    { id: 5, name: 'Garlic Butter Prawns Fry', category: 'Seafood', price: 349, rating: 4.9, image: '/p-4.jpg', tags: 'Premium', description: 'Jumbo prawns pan-seared with exquisite garlic clarified butter and fresh herbs.' },
    { id: 6, name: 'Executive Chicken Platter', category: 'Platters', price: 499, rating: 4.9, image: '/p-5.jpg', tags: 'Mega Meal', description: 'All-in-one curated feast featuring chicken fry, wings, strips, and premium dips.' },
];

const CATEGORIES = ['All', 'Chicken', 'Fish', 'Seafood', 'Burgers', 'Sides', 'Platters'];

export default function CustomerDashboard() {
    const navigate = useNavigate();

    // Core App States
    const [activeTab, setActiveTab] = useState('menu'); // menu | orders | settings
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [cart, setCart] = useState({}); // { itemId: quantity }
    const [orderHistory, setOrderHistory] = useState([
        { id: 'DFC-9081', date: 'Today, 10:15 AM', total: 542, status: 'Preparing', items: 'Crispy Chicken Fry x2, Peri Peri Fries x1' }
    ]);

    // Filter Computation Matrix
    const filteredItems = useMemo(() => {
        return MENU_ITEMS.filter(item => {
            const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    // Cart Management Logic
    const handleQuantityChange = (id, delta) => {
        setCart(prev => {
            const currentQty = prev[id] || 0;
            const newQty = currentQty + delta;
            const updated = { ...prev };
            if (newQty <= 0) delete updated[id];
            else updated[id] = newQty;
            return updated;
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('isCustomerLoggedIn');
        navigate('/Login');
    };

    const handleMobileNavClick = (tab) => {
        setActiveTab(tab);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">

            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative flex items-center h-20">

                        {/* Left Logo */}
                        <div className="flex items-center gap-3 flex-shrink-0">

                            <img
                                src="/images.jpg"
                                alt="logo"
                                className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-xl border border-slate-200 bg-white p-1 shadow-sm"
                            />

                            <div>
                                <h1 className="text-sm md:text-xl font-black tracking-wide text-[#FF1744]">
                                    DIAMOND
                                    <span className="text-[8px] md:text-[10px] text-slate-500 align-super">
                                        ®
                                    </span>

                                    <span className="text-green-700 ml-1">
                                        FRY CENTER
                                    </span>
                                </h1>

                                <p className="text-[8px] md:text-[10px] uppercase tracking-[3px] text-slate-500 font-bold">
                                    Taste That Rules
                                </p>
                            </div>

                        </div>

                        {/* Center Navbar */}
                        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">

                            <button
                                onClick={() => setActiveTab("menu")}
                                className={`text-sm font-bold uppercase border-b-2 pb-1 transition ${activeTab === "menu"
                                        ? "text-orange-500 border-orange-500"
                                        : "text-slate-500 border-transparent hover:text-black"
                                    }`}
                            >
                                🍜 Order Food
                            </button>

                            <button
                                onClick={() => setActiveTab("orders")}
                                className={`text-sm font-bold uppercase border-b-2 pb-1 transition ${activeTab === "orders"
                                        ? "text-orange-500 border-orange-500"
                                        : "text-slate-500 border-transparent hover:text-black"
                                    }`}
                            >
                                📦 Track Orders
                            </button>

                            <button
                                onClick={() => setActiveTab("settings")}
                                className={`text-sm font-bold uppercase border-b-2 pb-1 transition ${activeTab === "settings"
                                        ? "text-orange-500 border-orange-500"
                                        : "text-slate-500 border-transparent hover:text-black"
                                    }`}
                            >
                                👤 My Account
                            </button>

                        </nav>

                        {/* Right Section */}
                        <div className="hidden md:flex items-center gap-4 ml-auto">

                            <div className="text-right">
                                <p className="text-xs font-black text-slate-900">
                                    Welcome, Khalid
                                </p>

                                <p className="text-[10px] uppercase font-bold tracking-wider text-orange-500">
                                    Premium Account
                                </p>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold hover:bg-red-100 transition"
                            >
                                Logout 🚪
                            </button>

                        </div>

                        {/* Mobile Menu */}
                        <div className="ml-auto md:hidden">

                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition"
                            >
                                {isMobileMenuOpen ? (
                                    <span className="text-xl">✕</span>
                                ) : (
                                    <span className="text-xl">☰</span>
                                )}
                            </button>

                        </div>

                    </div>
                </div>

                {/* Mobile Dropdown */}

                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3 shadow-lg">

                        <div className="pb-2 border-b">
                            <p className="text-xs font-black">
                                Welcome, Khalid
                            </p>

                            <p className="text-[10px] uppercase font-bold text-orange-500">
                                Premium Account
                            </p>
                        </div>

                        <button
                            onClick={() => handleMobileNavClick("menu")}
                            className="w-full text-left px-3 py-3 rounded-xl font-bold text-sm hover:bg-orange-50"
                        >
                            🍜 Order Food
                        </button>

                        <button
                            onClick={() => handleMobileNavClick("orders")}
                            className="w-full text-left px-3 py-3 rounded-xl font-bold text-sm hover:bg-orange-50"
                        >
                            📦 Track Orders
                        </button>

                        <button
                            onClick={() => handleMobileNavClick("settings")}
                            className="w-full text-left px-3 py-3 rounded-xl font-bold text-sm hover:bg-orange-50"
                        >
                            👤 My Account
                        </button>

                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-3 py-3 rounded-xl bg-red-50 text-red-600 font-bold"
                        >
                            Logout 🚪
                        </button>

                    </div>
                )}
            </header>

            {/* 2. LAYOUT MAIN BODY */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* --- TAB PORTAL: FOOD ORDERING ENGINE --- */}
                {activeTab === 'menu' && (
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

                        {/* FULL WIDTH CATALOGUE CONTAINER */}
                        <div className="xl:col-span-12 space-y-8">

                            {/* Premium Search Hub */}
                            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                                <div className="w-full relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base">🔍</span>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search for crispy chicken, fish fry, gourmet platters..."
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Centered Big Capsule Filter Node - Hidden on Mobile, Visible on MD+ */}
                            <div className="hidden md:flex flex-col items-center justify-center w-full">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3 text-center">Inspiration for your first order</h3>

                                {/* Big Capsule Frame Wrapper */}
                                <div className="bg-white border border-slate-200/80 rounded-full p-1.5 shadow-sm max-w-full overflow-x-auto no-scrollbar flex items-center justify-center gap-1.5">
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all border whitespace-nowrap cursor-pointer ${selectedCategory === cat
                                                    ? 'bg-orange-500 text-white border-transparent shadow-sm shadow-orange-500/10'
                                                    : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Interactive Menu Grid */}
                            <div>
                                <h2 className="text-base md:text-lg font-black text-slate-900 mb-5 tracking-tight uppercase border-b border-slate-200/60 pb-2">
                                    {selectedCategory === 'All' ? 'All' : selectedCategory} Delicacies
                                </h2>

                                {filteredItems.length === 0 ? (
                                    <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                        <span className="text-4xl block mb-2">🍽️</span>
                                        <p className="text-sm font-bold text-slate-500">No delicious items match your search filter node.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                        {filteredItems.map((item) => {
                                            const qty = cart[item.id] || 0;
                                            return (
                                                <div
                                                    key={item.id}
                                                    className="bg-white border border-slate-200/80 rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative"
                                                >
                                                    <div>
                                                        {/* Item Graphic Node */}
                                                        <div className="w-full aspect-square bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden relative select-none mb-3">
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                    e.target.parentNode.style.backgroundColor = '#fffbeb';
                                                                    e.target.parentNode.innerHTML = `
                                    <div class="text-2xl md:text-3xl">
                                      ${item.category === 'Chicken' || item.category === 'Platters' ? '🍗' :
                                                                            item.category === 'Fish' ? '🐟' :
                                                                                item.category === 'Burgers' ? '🍔' :
                                                                                    item.category === 'Sides' ? '🍟' :
                                                                                        item.category === 'Seafood' ? '🍤' : '🍽️'}
                                    </div>
                                  `;
                                                                }}
                                                            />
                                                        </div>

                                                        {/* Item Metadata Details */}
                                                        <div className="space-y-1">
                                                            <div className="flex items-center justify-between gap-1">
                                                                <span className="bg-amber-50 text-amber-700 text-[8px] md:text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider border border-amber-100 truncate">
                                                                    {item.tags}
                                                                </span>
                                                                <span className="text-[10px] md:text-[11px] font-bold text-slate-500 flex items-center gap-0.5 shrink-0">
                                                                    ⭐ {item.rating}
                                                                </span>
                                                            </div>
                                                            <h4 className="font-black text-xs md:text-sm text-slate-900 tracking-tight line-clamp-1">
                                                                {item.name}
                                                            </h4>
                                                            <p className="text-[10px] md:text-[11px] text-slate-400 font-medium leading-normal line-clamp-2 min-h-[32px]">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Operational Pricing Action Node */}
                                                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-50 w-full">
                                                        <span className="text-xs md:text-sm font-black text-slate-950">₹{item.price}</span>

                                                        {qty > 0 ? (
                                                            <div className="flex items-center bg-orange-500 text-white rounded-lg md:rounded-xl shadow-sm overflow-hidden p-0.5">
                                                                <button
                                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                                    className="w-5 h-5 md:w-7 md:h-7 text-[10px] md:text-xs font-black hover:bg-orange-600 rounded-md md:rounded-lg transition-all"
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="px-1.5 md:px-2.5 text-[10px] md:text-xs font-black">{qty}</span>
                                                                <button
                                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                                    className="w-5 h-5 md:w-7 md:h-7 text-[10px] md:text-xs font-black hover:bg-orange-600 rounded-md md:rounded-lg transition-all"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleQuantityChange(item.id, 1)}
                                                                className="bg-white hover:bg-orange-500 border border-orange-200 hover:border-transparent text-orange-500 hover:text-white font-black text-[9px] md:text-[10px] px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl uppercase tracking-wider transition-all active:scale-95 shadow-sm"
                                                            >
                                                                Add +
                                                            </button>
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

                {/* --- TAB PORTAL: LOGISTICS QUEUE --- */}
                {activeTab === 'orders' && (
                    <div className="max-w-2xl mx-auto space-y-6">
                        <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">Active Logistics Queue</h2>

                        {orderHistory.map((order, index) => (
                            <div key={order.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 gap-2">
                                    <div>
                                        <span className="text-xs font-black uppercase text-slate-400 tracking-wider">Node Token</span>
                                        <h3 className="text-base font-black text-slate-900">{order.id}</h3>
                                        <p className="text-[11px] text-slate-400 font-medium">{order.date}</p>
                                    </div>
                                    <div className="text-left sm:text-right">
                                        <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">Gross Value</span>
                                        <p className="text-base font-black text-slate-900">₹{order.total}</p>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Provision Nodes</span>
                                    <p className="text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                                        {order.items}
                                    </p>
                                </div>

                                {index === 0 && (
                                    <div className="pt-2">
                                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-4">Live Pipeline Vector</span>
                                        <div className="grid grid-cols-3 text-center relative">
                                            <div className="absolute top-2 left-[16%] right-[16%] h-1 bg-slate-100 z-0">
                                                <div className="w-1/2 h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded" />
                                            </div>
                                            <div className="relative z-10 flex flex-col items-center">
                                                <div className="w-5 h-5 rounded-full bg-orange-500 border-4 border-orange-100 flex items-center justify-center" />
                                                <span className="text-[11px] font-black text-slate-900 mt-2 uppercase tracking-wide">Confirmed</span>
                                            </div>
                                            <div className="relative z-10 flex flex-col items-center">
                                                <div className="w-5 h-5 rounded-full bg-orange-500 border-4 border-orange-100 flex items-center justify-center animate-pulse" />
                                                <span className="text-[11px] font-black text-orange-500 mt-2 uppercase tracking-wide">Preparing</span>
                                            </div>
                                            <div className="relative z-10 flex flex-col items-center">
                                                <div className="w-5 h-5 rounded-full bg-slate-200 border-4 border-white flex items-center justify-center" />
                                                <span className="text-[11px] font-bold text-slate-400 mt-2 uppercase tracking-wide">Dispatched</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* --- TAB PORTAL: ACCOUNT PROFILE --- */}
                {activeTab === 'settings' && (
                    <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase mb-6 border-b border-slate-100 pb-3">
                            Corporate Account Framework
                        </h2>
                        <div className="space-y-4 text-xs font-semibold text-slate-600">
                            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Identity Name</span>
                                    <p className="text-slate-800 font-bold mt-0.5 text-sm">Pintu</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Account Tier</span>
                                    <p className="text-orange-500 font-black mt-0.5 text-sm">Executive Base</p>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 text-orange-700 leading-relaxed text-[11px]">
                                ℹ️ This account profile node seamlessly synchronizes tracking databases inside local secure sandboxes (`localStorage`).
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}