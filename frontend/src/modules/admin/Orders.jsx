import React, { useState } from 'react';
import { FiSearch, FiMoreVertical } from 'react-icons/fi';
import AdminLayout from "../../components/admin_layout/AdminLayout";
import AdminHeader from "../../components/admin_layout/AdminHeader";
import axios from 'axios'
import { useEffect } from 'react';

export default function Orders() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null); // Modal state
    const itemsPerPage = 10;

    // const [orders, setOrders] = useState([
    //     { id: '#ORD-001', customer: 'Rahul Kumar', total: '₹450', status: 'Pending', item: 'Double Egg Roll', time: '10 min ago', phone: '+91 98765 43210', address: '12, MG Road, Ahmedabad' },
    //     { id: '#ORD-002', customer: 'Priya Singh', total: '₹890', status: 'Completed', item: 'Chicken Biryani', time: '1 hour ago', phone: '+91 91234 56789', address: '45, Satellite, Ahmedabad' },
    //     { id: '#ORD-003', customer: 'Amit Verma', total: '₹1,250', status: 'Processing', item: 'Family Combo Pack', time: '2 hours ago', phone: '+91 99887 76655', address: '78, CG Road, Ahmedabad' },
    //     { id: '#ORD-004', customer: 'Suresh Rao', total: '₹320', status: 'Pending', item: 'Veg Burger', time: '3 hours ago', phone: '+91 98765 12345', address: '90, Bodakdev, Ahmedabad' },
    //     { id: '#ORD-005', customer: 'Rahul Kumar', total: '₹450', status: 'Pending', item: 'Double Egg Roll', time: '10 min ago', phone: '+91 98765 43210', address: '12, MG Road, Ahmedabad' },
    //     { id: '#ORD-006', customer: 'Priya Singh', total: '₹890', status: 'Completed', item: 'Chicken Biryani', time: '1 hour ago', phone: '+91 91234 56789', address: '45, Satellite, Ahmedabad' },
    //     { id: '#ORD-007', customer: 'Amit Verma', total: '₹1,250', status: 'Processing', item: 'Family Combo Pack', time: '2 hours ago', phone: '+91 99887 76655', address: '78, CG Road, Ahmedabad' },
    //     { id: '#ORD-008', customer: 'Suresh Rao', total: '₹320', status: 'Pending', item: 'Veg Burger', time: '3 hours ago', phone: '+91 98765 12345', address: '90, Bodakdev, Ahmedabad' },
    //     { id: '#ORD-009', customer: 'Rahul Kumar', total: '₹450', status: 'Pending', item: 'Double Egg Roll', time: '10 min ago', phone: '+91 98765 43210', address: '12, MG Road, Ahmedabad' },
    //     { id: '#ORD-010', customer: 'Priya Singh', total: '₹890', status: 'Completed', item: 'Chicken Biryani', time: '1 hour ago', phone: '+91 91234 56789', address: '45, Satellite, Ahmedabad' },
    //     { id: '#ORD-011', customer: 'Amit Verma', total: '₹1,250', status: 'Processing', item: 'Family Combo Pack', time: '2 hours ago', phone: '+91 99887 76655', address: '78, CG Road, Ahmedabad' },
    //     { id: '#ORD-012', customer: 'Suresh Rao', total: '₹320', status: 'Pending', item: 'Veg Burger', time: '3 hours ago', phone: '+91 98765 12345', address: '90, Bodakdev, Ahmedabad' },
    //     { id: '#ORD-013', customer: 'Rahul Kumar', total: '₹450', status: 'Pending', item: 'Double Egg Roll', time: '10 min ago', phone: '+91 98765 43210', address: '12, MG Road, Ahmedabad' },
    //     { id: '#ORD-014', customer: 'Priya Singh', total: '₹890', status: 'Completed', item: 'Chicken Biryani', time: '1 hour ago', phone: '+91 91234 56789', address: '45, Satellite, Ahmedabad' },
    //     { id: '#ORD-015', customer: 'Amit Verma', total: '₹1,250', status: 'Processing', item: 'Family Combo Pack', time: '2 hours ago', phone: '+91 99887 76655', address: '78, CG Road, Ahmedabad' },
    //     { id: '#ORD-016', customer: 'Suresh Rao', total: '₹320', status: 'Pending', item: 'Veg Burger', time: '3 hours ago', phone: '+91 98765 12345', address: '90, Bodakdev, Ahmedabad' },

    // ]);

    const [orders, setOrders] = useState([])

    // const updateStatus = (id, newStatus) => {
    //     setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
    //     setSelectedOrder(null); // Close modal after update
    // };

    // const filteredOrders = orders.filter((order) => {
    //     const matchesSearch = order.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || order._id.toLowerCase().includes(searchTerm.toLowerCase());
    //     const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    //     return matchesSearch && matchesStatus;
    // });

    const filteredOrders = orders.filter((order) => {
        // order.fullName aur order._id ka use karein
        const matchesSearch =
            order.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order._id?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "All" || order.status?.toLowerCase() === statusFilter.toLowerCase();;

        return matchesSearch && matchesStatus;
    });

    const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:2500/api/list')
            // console.log("API Response:", response.data);
            if (response.data.order) {
                setOrders(response.data.order)
            }
        } catch (error) {
            console.error('failed to fetch orders', error);

        }
    }

    useEffect(() => {
        fetchOrders()
        console.log(orders);

    }, [])

    const updateStatus = async (orderId, newStatus) => {
        try {
            const response = await axios.post('http://localhost:2500/api/update-status', {
                orderId: orderId,
                status: newStatus
            })

            if (response.data.success) {
                await fetchOrders()
                setSelectedOrder(null)
            }
        } catch (error) {
            console.error("Error updating status:", error);

        }
    }

    return (
        <AdminLayout>
            <AdminHeader />
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-950 tracking-tight">Orders Management</h1>
                    <p className="text-slate-500 font-medium">Keep track of all your customer transactions.</p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-1 w-full">
                            <FiSearch className="absolute left-4 top-4 text-slate-400" />
                            <input
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-amber-500 transition-all outline-none"
                                placeholder="Search by ID or customer..."
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            />
                        </div>
                        <select
                            className="w-full md:w-auto px-6 py-3.5 bg-slate-50 border-none rounded-2xl font-bold text-slate-600 focus:outline-none cursor-pointer hover:bg-slate-100 transition-all"
                            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Preparing">Preparing</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left table-fixed min-w-[800px]">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="w-[25%] px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Details</th>
                                    <th className="w-[20%] px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                                    <th className="w-[15%] px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                                    <th className="w-[15%] px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="w-[15%] px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</th>
                                    <th className="w-[10%] px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {currentOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-amber-50/30 transition-all">
                                        <td className="px-6 py-4 truncate">
                                            <p className="font-bold text-slate-950 text-sm">{order._id.slice(-6)}</p>
                                            {/* Pehla item show karne ke liye */}
                                            <p className="text-[10px] text-slate-500 truncate">{order.items?.[0]?.name}</p>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-700 text-sm truncate">{order.fullName}</td>
                                        <td className="px-6 py-4 font-bold text-slate-950 truncate">₹{order.totalAmount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${order.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-semibold text-slate-500 truncate">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => setSelectedOrder(order)} className="p-2 hover:bg-slate-100 rounded-lg">
                                                <FiMoreVertical />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Table ke niche pagination ka section */}
                        <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                                Page {currentPage} of {totalPages || 1}
                            </p>
                            <div className="flex gap-2">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 disabled:opacity-50 transition-all"
                                >
                                    Prev
                                </button>
                                <button
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 disabled:opacity-50 transition-all"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Order Details */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-100">
                        <h2 className="text-xl font-black mb-6">Order Details: <span className="text-indigo-600">{selectedOrder._id}</span></h2>
                        <div className="space-y-5 mb-8">
                            <div><p className="text-[10px] font-black text-slate-400 uppercase">Customer Name</p><p className="font-bold text-slate-900">{selectedOrder.fullName}</p></div>
                            <div><p className="text-[10px] font-black text-slate-400 uppercase">Phone No.</p><p className="font-bold text-slate-900">{selectedOrder.mobile}</p></div>
                            <div><p className="text-[10px] font-black text-slate-400 uppercase">Delivery Address</p><p className="font-semibold text-slate-700 text-sm leading-relaxed">{selectedOrder.address}</p></div>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            <button onClick={() => updateStatus(selectedOrder._id, 'Completed')} className="py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all">Mark Completed</button>
                            <button onClick={() => updateStatus(selectedOrder._id, 'Preparing')} className="py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">Mark Preparing</button>
                            <button onClick={() => updateStatus(selectedOrder._id, 'In Transit')} className="py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all">Mark In Transit</button>
                            <button onClick={() => updateStatus(selectedOrder._id, 'Cancelled')} className="py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all">Mark Cancelled</button>
                            <button onClick={() => setSelectedOrder(null)} className="py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}