import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { FiX } from 'react-icons/fi'; // Import Cross icon

export default function AdminLayout({ children, toggleSidebar }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      
      {/* Sidebar Wrapper */}
      {/* Mobile par w-full (full screen), Desktop par w-64 */}
      <div className={`fixed inset-0 z-50 w-full md:w-64 bg-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        
        {/* Cross Icon (Sirf Mobile par dikhega) */}
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-6 right-6 md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
        >
          <FiX size={28} />
        </button>

        {/* Sidebar content wrap kiya taaki click karne par band ho jaye */}
        <div onClick={() => setIsSidebarOpen(false)}>
           <AdminSidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full md:ml-64 transition-all duration-300">
        <div className="p-4 md:p-8">
           {/* Header ko yahan access mil raha hai toggle karne ka */}
           {React.Children.map(children, child => 
             React.cloneElement(child, { toggleSidebar: () => setIsSidebarOpen(true) })
           )}
        </div>
      </main>
    </div>
  );
}