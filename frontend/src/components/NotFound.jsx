import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiAlertTriangle, FiHome } from 'react-icons/fi';

export default function NotFound() {
    const navigate = useNavigate();

    // User ke role ke hisab se wapas bhej sakte hain, ya default home par
    const storedUser = JSON.parse(localStorage.getItem('user'));

    const handleGoBack = () => {
        if (storedUser?.role === 'admin') {
            navigate('/admin/dashboard');
        } else if (storedUser?.role === 'delivery') {
            navigate('/delivery/orders');
        } else {
            navigate('/');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4">
            <div className="text-center max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                {/* Icon */}
                <div className="w-16 h-16 bg-red-50 text-[#FF1744] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-100">
                    <FiAlertTriangle size={32} />
                </div>

                {/* Error Code */}
                <h1 className="text-6xl font-black text-slate-900 mb-2">404</h1>
                <h2 className="text-xl font-bold text-slate-800 mb-2">Page Not Found</h2>
                <p className="text-slate-500 text-sm mb-6">
                    Oops! Jo page aap dhoond rahe hain wo shayad delete ho gaya hai ya URL galat hai.
                </p>

                {/* Button */}
                <button
                    onClick={handleGoBack}
                    className="w-full flex items-center justify-center gap-2 bg-[#FF1744] text-white font-bold py-3 px-4 rounded-xl hover:bg-[#d50f35] transition-all shadow-sm"
                >
                    <FiHome size={18} /> Back to Home
                </button>
            </div>
        </div>
    );
}