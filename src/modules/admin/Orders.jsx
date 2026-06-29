import React, { useState } from 'react';
import { FiSearch, FiMoreVertical } from 'react-icons/fi';
import AdminLayout from "../../components/admin_layout/AdminLayout";
import AdminHeader from "../../components/admin_layout/AdminHeader";

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [orders] = useState([
    { id: '#ORD-001', customer: 'Rahul Kumar', total: '₹450', status: 'Pending', item: 'Double Egg Roll', time: '10 min ago' },
    { id: '#ORD-002', customer: 'Priya Singh', total: '₹890', status: 'Completed', item: 'Chicken Biryani', time: '1 hour ago' },
    { id: '#ORD-003', customer: 'Amit Verma', total: '₹1,250', status: 'Processing', item: 'Family Combo Pack', time: '2 hours ago' },
    { id: '#ORD-004', customer: 'Suresh Rao', total: '₹320', status: 'Pending', item: 'Veg Burger', time: '3 hours ago' },
    { id: '#ORD-005', customer: 'Rahul Kumar', total: '₹450', status: 'Pending', item: 'Double Egg Roll', time: '10 min ago' },
    { id: '#ORD-006', customer: 'Priya Singh', total: '₹890', status: 'Completed', item: 'Chicken Biryani', time: '1 hour ago' },
    { id: '#ORD-007', customer: 'Amit Verma', total: '₹1,250', status: 'Processing', item: 'Family Combo Pack', time: '2 hours ago' },
    { id: '#ORD-008', customer: 'Suresh Rao', total: '₹320', status: 'Pending', item: 'Veg Burger', time: '3 hours ago' },
    { id: '#ORD-009', customer: 'Rahul Kumar', total: '₹450', status: 'Pending', item: 'Double Egg Roll', time: '10 min ago' },
    { id: '#ORD-010', customer: 'Priya Singh', total: '₹890', status: 'Completed', item: 'Chicken Biryani', time: '1 hour ago' },
    { id: '#ORD-011', customer: 'Amit Verma', total: '₹1,250', status: 'Processing', item: 'Family Combo Pack', time: '2 hours ago' },
    { id: '#ORD-012', customer: 'Suresh Rao', total: '₹320', status: 'Pending', item: 'Veg Burger', time: '3 hours ago' },
    { id: '#ORD-013', customer: 'Rahul Kumar', total: '₹450', status: 'Pending', item: 'Double Egg Roll', time: '10 min ago' },
    { id: '#ORD-014', customer: 'Priya Singh', total: '₹890', status: 'Completed', item: 'Chicken Biryani', time: '1 hour ago' },
    { id: '#ORD-015', customer: 'Amit Verma', total: '₹1,250', status: 'Processing', item: 'Family Combo Pack', time: '2 hours ago' },
    { id: '#ORD-016', customer: 'Suresh Rao', total: '₹320', status: 'Pending', item: 'Veg Burger', time: '3 hours ago' },
  ]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

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
               <option value="Processing">Processing</option>
               <option value="Completed">Completed</option>
             </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Details</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest hidden md:table-cell">Amount</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest hidden md:table-cell">Time</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentOrders.length > 0 ? (
                  currentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-amber-50/30 transition-all">
                      <td className="px-6 py-4">
                        <p className="font-black text-slate-950 text-sm">{order.id}</p>
                        <p className="text-[10px] text-slate-500">{order.item}</p>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-700 text-sm">{order.customer}</td>
                      <td className="px-6 py-4 hidden md:table-cell font-black text-slate-950">{order.total}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${
                          order.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                          order.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell text-xs font-semibold text-slate-500">{order.time}</td>
                      <td className="px-6 py-4 text-right"><button className="p-2 hover:bg-slate-200 rounded-lg text-slate-400"><FiMoreVertical /></button></td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="6" className="text-center py-12 text-slate-400 font-bold">No orders found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Page {currentPage} of {totalPages || 1}</p>
            <div className="flex gap-2">
               <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="px-4 py-2 bg-white border rounded-xl text-xs font-bold hover:bg-slate-100 disabled:opacity-50">Prev</button>
               <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="px-4 py-2 bg-white border rounded-xl text-xs font-bold hover:bg-slate-100 disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}