import React from 'react';
import { FiTrendingUp, FiShoppingBag, FiClock, FiUsers, FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AdminLayout from "../../components/admin_layout/AdminLayout";
import AdminHeader from "../../components/admin_layout/AdminHeader";
import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';

// Pro Analytics Data
const chartData = [
  { name: 'Mon', revenue: 40000 },
  { name: 'Tue', revenue: 30000 },
  { name: 'Wed', revenue: 60000 },
  { name: 'Thu', revenue: 20780 },
  { name: 'Fri', revenue: 80000 },
  { name: 'Sat', revenue: 50000 },
  { name: 'Sun', revenue: 90000 }
];

export default function Dashboard() {
  // const stats = [
  //   { title: "Total Revenue", value: "₹8.4L", icon: FiTrendingUp, change: "+12.5%", color: "text-emerald-600", bg: "bg-emerald-50" },
  //   { title: "Total Orders", value: "1,284", icon: FiShoppingBag, change: "+5.2%", color: "text-blue-600", bg: "bg-blue-50" },
  //   { title: "Pending", value: "42", icon: FiClock, change: "-2.1%", color: "text-amber-600", bg: "bg-amber-50" },
  //   { title: "Customers", value: "890", icon: FiUsers, change: "+8.4%", color: "text-indigo-600", bg: "bg-indigo-50" },
  // ];

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalCustomers: 0
  })

  const [loading, setLoading] = useState(true);

  const [chartData, setChartData] = useState([])

  const [filter, setFilter] = useState('week')


  const formatRevenue = (nums) => {
    if (nums >= 100000) {
      return '₹' + (nums / 100000).toFixed(1) + 'L';
    }
    else if (nums >= 1000) { // 1000 se upar K mein dikhayein
      return '₹' + (nums / 1000).toFixed(1) + 'K';
    }
    else {
      return '₹' + nums
    }
  }

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get('http://localhost:2500/api/dashboard-stats')
      console.log(response.data);

      if (response.data.data) {
        setStats(response.data.data)
      }
      else {
        setStats(response.data)
      }
    } catch (error) {
      console.error('failed to fetch data', error);
    } finally {
      setLoading(false); // Data aaye ya error, loading false hona chahiye
    }
  }

  const fetchGraphData = async (selectedFilter) => {
    try {
      const response = await axios.get(`http://localhost:2500/api/graph?filter=${selectedFilter}`)

      const formattedData = response.data.data.map((item) => ({
        name: item._id,
        revenue: item.revenue
      }))
      setChartData(formattedData)

    } catch (error) {
      alert('graph data not found!!!')
      console.error(error);
    }
  }

  useEffect(() => {
    fetchDashboardStats()
    fetchGraphData()
  }, [])


  const statsConfig = [
    { title: "Total Revenue", value: formatRevenue(stats.totalRevenue), icon: FiTrendingUp, change: "+12.5%", color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Total Orders", value: stats.totalOrders.toLocaleString(), icon: FiShoppingBag, change: "+5.2%", color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Pending", value: stats.pendingOrders.toLocaleString(), icon: FiClock, change: "-2.1%", color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Customers", value: stats.totalCustomers.toLocaleString(), icon: FiUsers, change: "+8.4%", color: "text-indigo-600", bg: "bg-indigo-50" },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <AdminHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-slate-500 font-bold animate-pulse">Loading Analytics Dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-950 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 font-medium">Analytics overview for your business growth.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsConfig.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={20} strokeWidth={2.5} />
                </div>
                <span className={`text-xs font-black flex items-center gap-1 ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {stat.change} {stat.change.startsWith('+') ? <FiArrowUpRight /> : <FiArrowDownRight />}
                </span>
              </div>
              <h3 className="text-slate-500 text-sm font-bold">{stat.title}</h3>
              <p className="text-2xl font-black text-slate-950 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-slate-950">Revenue Analytics</h2>
              <select
                value={filter} onChange={(e) => { setFilter(e.target.value); fetchGraphData(e.target.value) }}
                className="bg-slate-50 border-none rounded-xl text-xs font-bold text-slate-600 px-4 py-2 cursor-pointer outline-none">
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                  />
                  {/* <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    tickMargin={10}
                  /> */}

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    tickMargin={10}
                    // Niche wali line add karein:
                    domain={[0, 'auto']}
                    allowDecimals={false}
                  />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insights Card */}
          <div className="bg-slate-950 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
            <h2 className="text-lg font-black mb-8">Quick Insights</h2>
            <div className="space-y-6">
              <div className="group bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Growth Rate</p>
                <p className="text-3xl font-black text-amber-400 mt-1">+12.5%</p>
              </div>
              <div className="group bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Avg Order Value</p>
                <p className="text-3xl font-black text-emerald-400 mt-1">
                  {stats.totalOrders > 0 ? formatRevenue(Math.round(stats.totalRevenue / stats.totalOrders)) : '₹0'}
                </p>
                {/* <p className="text-3xl font-black text-emerald-400 mt-1">
                  {stats.totalOrders > 0
                    ? '₹' + Math.round(stats.totalRevenue / stats.totalOrders).toLocaleString()
                    : '₹0'}
                </p> */}
              </div>
            </div>
            {/* Background design element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500 rounded-full blur-[80px] opacity-20"></div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}