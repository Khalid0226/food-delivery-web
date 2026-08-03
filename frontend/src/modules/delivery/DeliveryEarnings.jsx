import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiTrendingUp } from 'react-icons/fi';
import axios from 'axios';

const DeliveryEarnings = () => {
  const [timeRange, setTimeRange] = useState('month'); // Default ko 'month' kar diya taaki saare purane orders bhi dikhein
  const [historyOrders, setHistoryOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const deliveryBoyId = storedUser?._id;

  const getDeliveryHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:2500/api/delivery/delivery-history?deliveryBoyId=${deliveryBoyId}`);
      if (response.status === 200) {
        setHistoryOrders(response.data.deliveryHistory || []);
      }
    } catch (error) {
      console.error('failed to fetch history', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (deliveryBoyId) {
      getDeliveryHistory();
    }
  }, [deliveryBoyId]);

  const filteredOrders = historyOrders.filter((order) => {
    if (!order.createdAt && !order.deliveredAt) {
      return false;
    }

    // Date comparison ke liye deliveredAt ko priority do, agar na ho toh createdAt
    const orderDate = new Date(order.deliveredAt || order.createdAt);
    const now = new Date();

    if (timeRange === 'today') {
      return orderDate.toDateString() === now.toDateString();
    } else if (timeRange === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      return orderDate >= weekAgo;
    } else if (timeRange === 'month') {
      return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
    }
    return true;
  });

  const totalEarnings = filteredOrders.reduce((acc, order) => {
    const earnings = Number(order.deliveryEarnings) || 50;
    return acc + earnings;
  }, 0);

  const totalDeliveries = filteredOrders.length;

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6 bg-gray-50 min-h-screen">

      {/* Header & Time Range Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Earnings & Payouts 💰</h1>
          <p className="text-sm text-gray-500">Track your daily and historical delivery earnings</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-gray-200 p-1 rounded-xl">
          <button
            onClick={() => setTimeRange('today')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${timeRange === 'today' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Today
          </button>
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${timeRange === 'week' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${timeRange === 'month' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Main Earnings Highlight Card */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-orange-100 text-sm font-medium uppercase tracking-wider">Total Earnings ({timeRange})</p>
            <h2 className="text-4xl font-extrabold mt-1">₹{totalEarnings}</h2>
          </div>
          <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
            <FiTrendingUp className="text-2xl text-white" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-orange-400/40 text-center sm:text-left">
          <div>
            <p className="text-orange-100 text-xs">Completed Orders</p>
            <p className="text-lg font-bold mt-0.5">{totalDeliveries}</p>
          </div>
          <div>
            <p className="text-orange-100 text-xs">Commission Rate</p>
            <p className="text-lg font-bold mt-0.5">₹50 / Order</p>
          </div>
        </div>
      </div>

      {/* Quick Payout Status */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 text-green-600 p-3 rounded-xl">
            <FiCheckCircle className="text-xl" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-800">Next Payout: Direct to Bank</h3>
            <p className="text-xs text-gray-500">Scheduled for coming Monday (Auto-transfer)</p>
          </div>
        </div>
        <button className="w-full sm:w-auto px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-xl transition-colors">
          View Payout History
        </button>
      </div>

      {/* Recent Earning Transactions */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-base font-bold text-gray-800 mb-4">Recent Payout Logs</h3>

        <div className="space-y-3">
          {loading ? (
            <p className="text-xs text-gray-400 text-center py-4">Loading earnings...</p>
          ) : filteredOrders.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">No transactions found for this period. 🛵</p>
          ) : (
            filteredOrders.map((order) => (
              <div key={order._id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 text-orange-600 p-2.5 rounded-lg font-bold text-xs">
                    #{order._id.slice(-4)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Delivery Earning</p>
                    <p className="text-xs text-gray-400">
                      {order.deliveredAt
                        ? new Date(order.deliveredAt).toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
                        : 'Recently'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">+₹{order.deliveryEarnings || 50}</p>
                  <span className="inline-block text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium">Credited</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default DeliveryEarnings;