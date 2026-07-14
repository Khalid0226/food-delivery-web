import React, { useState } from 'react';
import { FiEdit3, FiTrash2, FiPlus, FiChevronLeft, FiChevronRight, FiSearch, FiFilter } from 'react-icons/fi';
import AdminLayout from "../../components/admin_layout/AdminLayout";
import AdminHeader from "../../components/admin_layout/AdminHeader";
import { Link, useParams } from 'react-router-dom';
import EditItemModal from './EditItemModal';
import axios from 'axios'
import { useEffect } from 'react';

// const initialMenuItems = Array.from({ length: 12 }, (_, i) => ({
//     id: i + 1,
//     name: `Delicious Dish ${i + 1}`,
//     image: '/p-4.jpg', // Ensure this image path exists in your public folder
//     category: i % 2 === 0 ? "Starters" : "Main Course",
//     price: `₹${(i + 1) * 50}`,
//     status: i % 3 === 0 ? "Unavailable" : "Available"
// }));

export default function ManageItems() {
    const [menuItems, setMenuItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const itemsPerPage = 8;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = menuItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(menuItems.length / itemsPerPage);

    // const {id} = useParams()

    const openEditModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleSaveItem = async() => {
        // setMenuItems(menuItems.map(item =>
        //     item.id === selectedItem._id ? {
        //         ...item,
        //         ...updatedData,
        //         price: `₹${updatedData.price}`,
        //         status: updatedData.status
        //     } : item
        // ));
        await fetchItems()
        setIsModalOpen(false)
    };

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:2500/api/menu/view-item')
            setMenuItems(response.data.item)
        } catch (error) {
            console.error(error);
            alert('failed to fetch items')

        }
    }


    useEffect(() => {
        fetchItems()
    }, [])

      const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:2500/api/menu/product/${id}`)
            // setFormData(formData.filter((item) => item._id !== id))
            alert('item delete successfully!!!')
            fetchItems()
        } catch (error) {
            alert('failed to delete product!!!')
        }
    }

    return (
        <AdminLayout>
            <AdminHeader />
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
                {/* Modern Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight">Menu Items</h1>
                        <p className="text-slate-500 font-medium mt-1">Manage, update, and track your restaurant offerings.</p>
                    </div>
                    <Link to='/admin/add-item' className="flex items-center gap-2.5 px-6 py-3.5 bg-slate-950 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-950/20">
                        <FiPlus size={20} /> Add New Dish
                    </Link>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Image</th>
                                    <th className="px-4 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Item Details</th>
                                    <th className="px-4 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                                    <th className="px-4 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                                    <th className="px-4 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {menuItems.map((item) => (
                                    <tr key={item._id} className="group hover:bg-slate-50/80 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shadow-inner">
                                                <img src={`http://localhost:2500/uploads/${item.image}`} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <p className="font-bold text-slate-900 text-lg">{item.name}</p>
                                            <p className="text-xs text-slate-400 font-medium">ID: #{item._id.slice(-6)}</p>
                                        </td>
                                        <td className="px-4 py-5 font-semibold text-slate-600">{item.category}</td>
                                        <td className="px-4 py-5 font-black text-[#FF1744] text-lg">{item.price}</td>
                                        <td className="px-4 py-5">
                                            {/* Agar status database mein nahi hai, toh default 'Available' dikhao */}
                                            <span className={`inline-flex items-center px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-wider ${(item.status || "Available") === "Available" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                                                }`}>
                                                {item.status || "Available"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 flex justify-end gap-3">
                                            <button onClick={() => openEditModal(item)} className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all">
                                                <FiEdit3 size={18} />
                                            </button>
                                            <button onClick={()=>handleDelete(item._id)} className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all">
                                                <FiTrash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col md:flex-row justify-between items-center px-8 py-6 border-t border-slate-100 bg-slate-50/30 gap-4">
                        <p className="text-sm font-bold text-slate-400">Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, menuItems.length)} of {menuItems.length} items</p>
                        <div className="flex gap-2">
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:border-slate-300 disabled:opacity-50 transition-all">
                                <FiChevronLeft /> Prev
                            </button>
                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:border-slate-300 disabled:opacity-50 transition-all">
                                Next <FiChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {selectedItem && (
                <EditItemModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    item={selectedItem}
                    onSave={handleSaveItem}
                />
            )}
        </AdminLayout>
    );
}