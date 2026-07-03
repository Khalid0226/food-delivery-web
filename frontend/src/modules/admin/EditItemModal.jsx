import React, { useState, useRef } from 'react';
import { FiX, FiCheck, FiUploadCloud, FiAlertCircle } from 'react-icons/fi';

export default function EditItemModal({ isOpen, onClose, item, onSave }) {
    const [formData, setFormData] = useState({
        name: item?.name || "",
        price: item?.price?.toString().replace('₹', '') || "",
        status: item?.status || "Available",
        category: item?.category || "Starters",
        description: item?.description || ""
    });

    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-3xl rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Edit "{item.name}"</h2>
                        <p className="text-slate-500 font-medium mt-1">Make changes to your menu item details.</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-all"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Side */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Dish Name</label>
                            <input 
                                name="name" type="text" value={formData.name} onChange={handleChange}
                                className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-semibold text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Price (₹)</label>
                                <input 
                                    name="price" type="number" value={formData.price} onChange={handleChange}
                                    className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:border-indigo-500 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Category</label>
                                <select 
                                    name="category" value={formData.category} onChange={handleChange}
                                    className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:border-indigo-500 transition-all cursor-pointer"
                                >
                                    <option value="Starters">Starters</option>
                                    <option value="Main Course">Main Course</option>
                                    <option value="Beverages">Beverages</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Status</label>
                            <div className="flex gap-4">
                                {['Available', 'Unavailable'].map((s) => (
                                    <label key={s} className={`flex-1 flex items-center justify-center py-3 rounded-2xl border-2 cursor-pointer transition-all font-bold ${formData.status === s ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                                        <input type="radio" name="status" value={s} checked={formData.status === s} onChange={handleChange} className="hidden" />
                                        {s}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col">
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Thumbnail</label>
                        <div 
                            onClick={() => fileInputRef.current.click()}
                            className="flex-1 min-h-[200px] border-4 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center text-slate-400 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer group"
                        >
                            <div className="p-4 bg-slate-100 rounded-full group-hover:scale-110 transition-transform">
                                <FiUploadCloud size={24} />
                            </div>
                            <span className="text-sm font-bold mt-3">Upload new photo</span>
                            <span className="text-[11px] text-slate-400 mt-1">PNG, JPG up to 2MB</span>
                        </div>
                        <input type="file" ref={fileInputRef} className="hidden" />
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                        <FiAlertCircle /> Last edited: Just now
                    </div>
                    <div className="flex gap-3">
                        <button onClick={onClose} className="px-8 py-4 font-bold text-slate-600 hover:bg-slate-100 rounded-2xl transition-all">Cancel</button>
                        <button 
                            onClick={() => { onSave(formData); onClose(); }} 
                            className="px-10 py-4 bg-slate-950 text-white rounded-2xl font-bold hover:bg-indigo-600 shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all active:scale-95"
                        >
                            <FiCheck /> Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}