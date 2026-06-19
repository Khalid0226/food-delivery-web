import React from 'react';
import { FiInstagram, FiTwitter, FiFacebook, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">
            Food<span className="text-orange-500">Dash</span>
          </h2>
          <p className="text-sm leading-relaxed max-w-sm mb-6">
            Premium quality food delivered fresh to your doorstep. Experience the taste of happiness with our curated menu, crafted by master chefs.
          </p>
          <div className="flex gap-4">
            <SocialIcon icon={<FiInstagram />} />
            <SocialIcon icon={<FiTwitter />} />
            <SocialIcon icon={<FiFacebook />} />
          </div>
        </div>

        {/* Links Column */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-widest">Company</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Support</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-widest">Get In Touch</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3"><FiMapPin className="text-orange-500"/> Ahmedabad, Gujarat</li>
            <li className="flex items-center gap-3"><FiPhone className="text-orange-500"/> +91 98765 43210</li>
            <li className="flex items-center gap-3"><FiMail className="text-orange-500"/> hello@fooddash.com</li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} FoodDash Technologies. All rights reserved.
      </div>
    </footer>
  );
}

// Social Icon helper component
function SocialIcon({ icon }) {
  return (
    <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-orange-500 transition-all">
      {icon}
    </button>
  );
}

export default Footer;