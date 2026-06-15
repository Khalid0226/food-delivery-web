import React from 'react';
import { useNavigate } from 'react-router-dom';



export default function App() {
    const navigate = useNavigate()

  // Signup button click hone par kya hoga (abhi bas testing alert lagaya hai)
  const handleSignUpClick = () => {
    navigate('/Register')
  };

  return (
    // 🎨 FRESH LIGHT THEME BG CHANGE (bg-slate-50)
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased">

      {/* 1. FRESH LIGHT NAVBAR (Responsive Fixes Applied) */}
      <nav className="bg-white/90 backdrop-blur-md text-slate-900 border-b border-slate-200/80 sticky top-0 z-50 px-3 py-3 md:px-4 md:py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center gap-2">
          
          {/* Logo + Brand Alignment */}
          <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
            <img
              src="/images.jpg"
              alt="Diamond Fry Center Logo"
              className="w-9 h-9 md:w-12 md:h-12 object-contain bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex-shrink-0"
            />
            {/* Brand Name with Corrected Trademark Layout */}
            <div className="min-w-0">
              <h1 className="text-sm md:text-xl font-black tracking-wide md:tracking-wider text-[#FF1744] flex items-start flex-wrap content-start">
                <span>DIAMOND</span>
                <span className="text-[8px] md:text-[10px] text-slate-600 font-normal align-super -mt-0.5 md:-mt-1">®</span>
                <span className="text-green-700 font-bold ml-1">FRY CENTER</span>
              </h1>
              <p className="text-[8px] md:text-[10px] text-slate-500 font-bold tracking-wider md:tracking-widest uppercase truncate">TASTE THAT RULES</p>
            </div>
          </div>

          {/* Top Right Action Button */}
          <button
            onClick={handleSignUpClick}
            className="bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-[10px] md:text-xs font-black px-3 py-2 md:px-6 md:py-2.5 rounded-lg md:rounded-xl transition-all uppercase tracking-wider shadow-md shadow-rose-600/20 border border-rose-500/10 flex-shrink-0"
          >
            register
          </button>
        </div>
      </nav>

      {/* 2. FRESH BRIGHT HERO SECTION */}
      <main className="flex-1 flex flex-col justify-center bg-gradient-to-b from-amber-50/60 via-white to-slate-50 text-slate-800 relative py-12 px-4 md:py-24">
        
        {/* Soft Radial Background Vibe (Light Pattern) */}
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#e11d48_1.5px,transparent_1.5px)] [background-size:20px_24px]"></div>

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          
          {/* Mini Top Banner in Light Theme */}
          <span className="inline-block bg-amber-500/10 text-amber-700 text-[9px] md:text-xs font-black uppercase tracking-widest px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-amber-500/20">
            ⚡ Fast Delivery (Within 5 KM in 45 Mins)
          </span>

          {/* Main Heading with Bright Contrast */}
          <h2 className="text-3xl md:text-6xl font-black tracking-tight leading-tight text-slate-900">
            The Ultimate <br />
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
              Crispy & Juicy
            </span> Fry Experience.
          </h2>

          {/* Subtitle with better reading contrast */}
          <p className="text-slate-600 text-xs md:text-base max-w-xl mx-auto leading-relaxed px-2">
            Welcome to Diamond Fry Center! Taste our secret heritage spices on perfectly deep-fried crispy items. Fresh, hot, and delivered straight to your doorstep.
          </p>

          {/* Big Action Signup Button */}
          <div className="pt-2 md:pt-4">
            <button
              onClick={handleSignUpClick}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white font-black text-xs md:text-sm px-6 py-3.5 md:px-8 md:py-4 rounded-xl md:rounded-2xl shadow-xl shadow-amber-500/30 transition-all uppercase tracking-widest border border-amber-400/20"
            >
              Create Account & Order Now 🚀
            </button>
          </div>
        </div>
      </main>

      {/* 3. LIGHT BUSINESS LOGIC STRIP (Highlights) */}
      <section className="bg-white border-y border-slate-200 py-4 md:py-6 px-2 md:px-4 shadow-sm relative z-10">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-2 md:gap-4 text-center">
          <div className="border-r border-slate-200">
            <p className="text-base md:text-2xl font-black text-rose-600">10 KM</p>
            <p className="text-[9px] md:text-xs text-slate-400 font-bold uppercase tracking-wider">Max Radius</p>
          </div>
          <div className="border-r border-slate-200">
            <p className="text-base md:text-2xl font-black text-amber-500">₹15</p>
            <p className="text-[9px] md:text-xs text-slate-400 font-bold uppercase tracking-wider">Delivery Starts</p>
          </div>
          <div>
            <p className="text-base md:text-2xl font-black text-emerald-600">5% GST</p>
            <p className="text-[9px] md:text-xs text-slate-400 font-bold uppercase tracking-wider">Automated Tax</p>
          </div>
        </div>
      </section>

    </div>
  );
}