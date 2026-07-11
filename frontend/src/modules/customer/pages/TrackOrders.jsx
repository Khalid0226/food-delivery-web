import React, { useState, useMemo } from 'react';
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiBox, FiArrowRight, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';

export default function TrackOrders() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All'); // 'All', 'Active', 'Delivered'

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate()


    // const orders = [
    //     { id: 'ORD-12345', status: 'Delivered', date: 'June 22, 2026', total: 1780, items: ['Executive Chicken Platter', 'Spicy Fish Fry'] },
    //     { id: 'ORD-12346', status: 'In Transit', date: 'June 22, 2026', total: 1454, items: ['Diamond Double Chicken Burger', 'Spicy Fish Fry'] },
    //     { id: 'ORD-12347', status: 'Preparing', date: 'June 22, 2026', total: 999, items: ['Crispy Chicken Fry'] },
    // ];

    // Filter logic
    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesSearch = order._id.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filter === 'All' ? true :
                filter === 'Active' ? ['In Transit', 'Preparing'].includes(order.status) :
                    order.status === filter;
            return matchesSearch && matchesFilter;
        });
    }, [searchTerm, filter, orders]);

    const fetchOrder = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('user'))

            if (userData && userData.email) {
                const response = await axios.post('http://localhost:2500/api/user-order', {
                    email: userData.email
                })
                if (response.data.message == 'success') {
                    setOrders(response.data.order)
                }
            }
        } catch (error) {
            console.error(('failed to fetch order', error));

        }
    }

    useEffect(() => {
        fetchOrder()
    }, [])

    console.log("Current order object:", orders);
    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-20">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-black text-slate-900 mb-6 tracking-tighter">Your Orders</h1>

                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-grow">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by Order ID..."
                            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="px-4 py-3 rounded-2xl border border-slate-200 font-bold text-slate-700 outline-none"
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>

                {/* Orders List */}
                <div className="space-y-6">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                            <div key={order._id} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300">                         <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Order #{order._id.slice(-6)}</p>
                                    <p className="text-slate-500 text-sm font-medium">{order.date}</p>
                                </div>
                                <StatusBadge status={order.status} />
                            </div>

                                <div className="mb-6 space-y-2">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-sm">
                                            {/* Yahan 'item.name' ya jo bhi field ka naam aapke DB mein hai wo use karein */}
                                            <span className="text-slate-700">{item.name || item}</span>
                                            <span className="text-slate-400 font-medium">x{item.quantity || 1}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                    <p className="text-lg font-black text-slate-900">₹{order.totalAmount}</p>
                                    <button onClick={() => navigate(`/order/${order._id}`)} className="flex items-center gap-2 text-sm font-bold text-orange-600 hover:gap-3 transition-all">
                                        View Details <FiArrowRight />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 text-slate-400">
                            <FiBox size={48} className="mx-auto mb-4 opacity-50" />
                            <p className="font-bold">No orders found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const config = {
        'Delivered': { color: 'bg-emerald-50 text-emerald-600', icon: <FiCheckCircle /> },
        'In Transit': { color: 'bg-blue-50 text-blue-600', icon: <FiTruck /> },
        'Preparing': { color: 'bg-orange-50 text-orange-600', icon: <FiClock /> }
    };
    const { color, icon } = config[status] || { color: 'bg-slate-100 text-slate-600', icon: <FiPackage /> };
    return (
        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${color}`}>
            {icon} {status}
        </span>
    );
}

// isi ko kr ne