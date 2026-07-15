import React, { useEffect, useState } from 'react';
import { FiSearch, FiMoreVertical, FiTrash2, FiEye, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import AdminLayout from "../../components/admin_layout/AdminLayout";
import AdminHeader from "../../components/admin_layout/AdminHeader";
import axios from 'axios'

export default function Customers() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true)
    const itemsPerPage = 8; // Professional layout ke liye 8 items

    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:2500/api/customers')
            console.log(response.data.data);

            setCustomers(response.data.data)
            setLoading(false)
        } catch (error) {
            console.error('failed to fetch data', error);
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const deleteCustomer = async (email) => {
        try {
            const confirmDelete = window.confirm('Are you sure you want to delete this customer?');

            if (confirmDelete) {
                // URL encode karein taaki @ aur . safe rahein
                const safeEmail = encodeURIComponent(email);

                // Ab URL banega: http://localhost:2500/api/auth/customer/imran%40gmail.com
                await axios.delete(`http://localhost:2500/api/auth/customer/${safeEmail}`);

                setCustomers(customers.filter(c => c.email !== email));
                setActiveMenuId(null);
                alert("Customer deleted successfully!");
            }
        } catch (error) {
            console.error('Failed to delete', error);
            alert("Delete failed! Check the browser console.");
        }
    }

    const toggleMenu = (id) => setActiveMenuId(activeMenuId === id ? null : id);

    // const deleteCustomer = (id) => {
    //     setCustomers(customers.filter(c => c.id !== id));
    //     setActiveMenuId(null);
    // };

    const filteredCustomers = customers.filter((cus) =>
        cus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cus.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    const currentCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <AdminLayout>
            <AdminHeader />
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-950 tracking-tight">Customers</h1>
                    <p className="text-slate-500 font-medium">Manage your customer database and view insights.</p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <div className="relative w-full md:w-1/3">
                            <FiSearch className="absolute left-4 top-4 text-slate-400" />
                            <input
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-amber-500 transition-all outline-none"
                                placeholder="Search by name or email..."
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Orders</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Spent</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {currentCustomers.map((cus) => (
                                    <tr key={cus.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                                                {cus.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-950 text-sm">{cus.name}</p>
                                                <p className="text-[10px] text-slate-400 uppercase font-bold">order #{cus.id.slice(-6)}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-semibold text-slate-700">{cus.email}</p>
                                            <p className="text-xs text-slate-400">{cus.mobile}</p>
                                        </td>
                                        <td className="px-6 py-4 text-center font-bold text-slate-900">{cus.totalOrders}</td>
                                        <td className="px-6 py-4 font-black text-amber-600">{cus.totalSpent.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right relative">
                                            <button onClick={() => toggleMenu(cus.id)} className="p-2 hover:bg-slate-200 rounded-lg transition-all">
                                                <FiMoreVertical className="text-slate-500" />
                                            </button>
                                            {activeMenuId === cus.id && (
                                                <div className="absolute right-6 mt-2 w-36 bg-white border border-slate-100 rounded-xl shadow-2xl z-20 overflow-hidden">
                                                    <button onClick={() => { navigate(`/admin/customer-profile/${cus.id}`); setActiveMenuId(null); }} className="flex w-full items-center gap-2 px-4 py-2 hover:bg-slate-50 text-xs font-bold text-slate-700">
                                                        <FiEye size={14} /> View Profile
                                                    </button>
                                                    <button onClick={() => deleteCustomer(cus.email)} className="flex w-full items-center gap-2 px-4 py-2 hover:bg-red-50 text-xs font-bold text-red-600">
                                                        <FiTrash2 size={14} /> Delete
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <p className="text-xs font-bold text-slate-400 uppercase">Page {currentPage} of {totalPages || 1}</p>
                        <div className="flex gap-2">
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-2 rounded-xl border bg-white hover:bg-slate-100 disabled:opacity-50"><FiChevronLeft /></button>
                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="p-2 rounded-xl border bg-white hover:bg-slate-100 disabled:opacity-50"><FiChevronRight /></button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}