import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { FiX } from 'react-icons/fi';

export default function AdminLayout({ children }) { // toggleSidebar prop ki zarurat nahi hai
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      
      {/* Sidebar */}
      <div className={`fixed inset-0 z-50 w-full md:w-64 bg-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <button onClick={() => setIsSidebarOpen(false)} className="absolute top-6 right-6 md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
          <FiX size={28} />
        </button>
        <div onClick={() => setIsSidebarOpen(false)}>
           <AdminSidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full md:ml-64 transition-all duration-300">
        
        {/* Header ko Padding wale DIV ke bahar rakha hai */}
        {React.Children.map(children, child => 
          React.cloneElement(child, { toggleSidebar: () => setIsSidebarOpen(true) })
        )}

        {/* Dashboard ka baaki content isi padding mein rahega */}
        <div className="p-4 md:p-8">
           {/* Agar header alag component hai, toh wo yahan se hatt jayega */}
           {/* Sirf dashboard ke charts/cards yahan rahenge */}
        </div>
      </main>
    </div>
  );
}