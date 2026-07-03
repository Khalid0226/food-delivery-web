import React, { useState } from 'react';
import { FiUpload, FiCheck, FiDollarSign, FiAlignLeft, FiTag, FiShoppingBag, FiInfo } from 'react-icons/fi';
import { TbCurrencyRupee } from 'react-icons/tb';
import AdminLayout from "../../components/admin_layout/AdminLayout";
import AdminHeader from "../../components/admin_layout/AdminHeader";

export default function AddItem() {
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setImagePreview(URL.createObjectURL(file));
    };

    return (
        <AdminLayout>
            <AdminHeader />
            <div className="max-w-5xl mx-auto px-6 py-10">
                {/* Header Section */}
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">Add New Menu Item</h1>
                        <p className="text-slate-500 font-medium">Expand your culinary offerings with a new dish.</p>
                    </div>
                </div>

                <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form Card */}
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Dish Name</label>
                                <input type="text" placeholder="e.g. Tandoori Chicken" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all" />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Price</label>
                                    {/* // ... inside your input field */}
                                    
                                    <div className="relative">
                                        {/* Icon replace kar diya */}
                                        <TbCurrencyRupee className="absolute left-4 top-4 text-slate-400" size={20} />
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
                                    <select className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all cursor-pointer">
                                        <option>Starters</option>
                                        <option>Main Course</option>
                                        <option>Desserts</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description</label>
                                <textarea rows="4" placeholder="Briefly describe the ingredients and flavors..." className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-semibold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Image Upload */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-4">Item Thumbnail</label>
                            <label className={`w-full aspect-square border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-slate-50 ${imagePreview ? "border-indigo-500" : "border-slate-300"}`}>
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                                ) : (
                                    <div className="text-center p-4">
                                        <FiUpload size={32} className="mx-auto text-slate-400 mb-2" />
                                        <span className="block font-bold text-slate-700 text-sm">Upload Image</span>
                                        <span className="block text-slate-400 text-xs mt-1">PNG, JPG up to 2MB</span>
                                    </div>
                                )}
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={() => setLoading(true)}
                            className="w-full flex items-center justify-center gap-3 py-4 bg-slate-950 text-white rounded-2xl font-black hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200"
                        >
                            {loading ? "Processing..." : <><FiCheck size={20} /> Add Item to Menu</>}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}