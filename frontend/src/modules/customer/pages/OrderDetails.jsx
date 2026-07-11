import React, { useEffect, useState } from 'react';
import { FiCheckCircle, FiPhone, FiArrowLeft, FiPackage } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function OrderDetails() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();
  const [loading, setLoading] = useState(true);

  const fetchOrderDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:2500/api/user-order/${orderId}`);
      if (response.data.message === 'success!!') {
        setOrder(response.data.order);
      }
    } catch (error) {
      console.error('failed to fetch orders', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);

  if (loading) return <div className="text-center py-20">Loading Order Details...</div>;
  if (!order) return <div className="text-center py-20">Order not found!</div>;

  // Improved Progress logic (Case insensitive and handles 'Completed')
  const getStepIndex = (status) => {
    const s = status ? status.toLowerCase() : "";
    if (s.includes('placed')) return 0;
    if (s.includes('preparing')) return 1;
    if (s.includes('transit')) return 2;
    if (s.includes('delivered') || s.includes('completed')) return 3;
    return 0;
  };

  const currentStepIndex = getStepIndex(order.status);
  const steps = ['Placed', 'Preparing', 'In Transit', 'Delivered'];

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Navigation */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 font-bold hover:text-orange-600 transition mb-6">
          <FiArrowLeft /> Back to Orders
        </button>

        {/* 1. Progress Status */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-6">
          <div className="flex justify-between items-center mb-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Order #{order._id?.slice(-6)}</p>
              <h3 className="font-black text-2xl text-slate-900 tracking-tight">Track Delivery</h3>
            </div>
            <span className="bg-emerald-50 text-emerald-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
              {order.status}
            </span>
          </div>

          <div className="relative flex justify-between items-center px-2">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-0"></div>
            <div className="absolute top-1/2 left-0 h-1 bg-emerald-500 z-0 transition-all duration-700" style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}></div>
            
            {steps.map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-4 relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white transition-all duration-300 ${i <= currentStepIndex ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-slate-200 text-slate-400'}`}>
                  {i <= currentStepIndex ? <FiCheckCircle size={18} /> : <div className="w-2.5 h-2.5 bg-slate-400 rounded-full"></div>}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${i <= currentStepIndex ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Main Layout */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Left: Order Items */}
          <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <h4 className="font-black text-slate-900 mb-6 flex items-center justify-between">
              Order Summary
              <span className="text-slate-400 font-bold text-xs">{order.items?.length || 0} Items</span>
            </h4>
            <div className="space-y-6">
              {order.items?.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                      <FiPackage className="text-slate-400" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-sm">{item.name}</p>
                      <p className="text-slate-400 text-[11px] font-bold uppercase">Qty: {item.quantity || 1}</p>
                    </div>
                  </div>
                  <p className="font-black text-slate-900">₹{item.price}</p>
                </div>
              ))}
            </div>
            {/* Total Amount Added */}
            <div className="mt-6 pt-6 border-t border-slate-100 text-right">
                <p className="text-lg font-black text-slate-900">Total: ₹{order.totalAmount}</p>
            </div>
          </div>

          {/* Right: Partner Info & Actions */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <h4 className="font-black text-slate-900 mb-6 text-sm">Delivery Partner</h4>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 font-black text-xl">RK</div>
                <div>
                  <p className="font-black text-sm text-slate-900">Rahul Kumar</p>
                  <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded inline-block">Verified</p>
                </div>
              </div>
              <button className="w-full py-3.5 bg-slate-900 text-white font-black rounded-2xl text-sm hover:bg-black transition-all flex items-center justify-center gap-2">
                <FiPhone size={16} /> Call Partner
              </button>
            </div>

            <button className="w-full py-4 text-xs font-black text-red-500 border-2 border-red-100 rounded-3xl hover:bg-red-50 transition-all uppercase tracking-widest">
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}