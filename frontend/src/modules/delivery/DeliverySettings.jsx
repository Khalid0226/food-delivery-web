import React, { useState } from 'react';
import { 
  FiUser, 
  FiBell, 
  FiVolume2, 
  FiShield, 
  FiCreditCard, 
  FiHelpCircle, 
  FiLogOut, 
  FiChevronRight 
} from 'react-icons/fi';

const DeliverySettings = () => {
  // Mock state for toggle switches
  const [notifications, setNotifications] = useState(true);
  const [orderSound, setOrderSound] = useState(true);

  // Reusable component for settings rows
  const SettingsRow = ({ icon: Icon, title, subtitle, rightElement, onClick, isDanger }) => (
    <div 
      onClick={onClick}
      className={`flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${isDanger ? 'text-red-600' : 'text-gray-800'}`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg ${isDanger ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
          <Icon className="text-xl" />
        </div>
        <div>
          <h3 className="font-semibold text-sm">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div>
        {rightElement ? rightElement : <FiChevronRight className="text-gray-400 text-lg" />}
      </div>
    </div>
  );

  // Toggle Switch UI
  const ToggleSwitch = ({ isOn, onToggle }) => (
    <div 
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${isOn ? 'bg-orange-500' : 'bg-gray-300'}`}
    >
      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${isOn ? 'translate-x-5' : 'translate-x-0'}`} />
    </div>
  );

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-6 bg-gray-50 min-h-screen pb-24">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Settings ⚙️</h1>
        <p className="text-sm text-gray-500">Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg flex items-center gap-5">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
          <FiUser className="text-3xl text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Pintu</h2>
          <p className="text-orange-100 text-sm mt-1">+91 98765 43210</p>
          <div className="mt-2 inline-flex items-center gap-1.5 bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-xs font-medium text-white">Active Partner</span>
          </div>
        </div>
      </div>

      {/* App Preferences */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">App Preferences</h3>
        
        <SettingsRow 
          icon={FiBell} 
          title="Push Notifications" 
          subtitle="Get alerts for new orders"
          rightElement={<ToggleSwitch isOn={notifications} onToggle={() => setNotifications(!notifications)} />}
        />
        
        <SettingsRow 
          icon={FiVolume2} 
          title="New Order Sound" 
          subtitle="Play loud ringtone for new orders"
          rightElement={<ToggleSwitch isOn={orderSound} onToggle={() => setOrderSound(!orderSound)} />}
        />
      </div>

      {/* Account Settings */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Account</h3>
        
        <SettingsRow 
          icon={FiCreditCard} 
          title="Bank Details" 
          subtitle="Manage your payout account"
        />
        
        <SettingsRow 
          icon={FiShield} 
          title="Security & Password" 
          subtitle="Update your password or PIN"
        />
      </div>

      {/* Help & Support */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Support</h3>
        
        <SettingsRow 
          icon={FiHelpCircle} 
          title="Help & Support" 
          subtitle="Contact partner care"
        />
      </div>

      {/* Logout Button */}
      <div className="pt-4">
        <SettingsRow 
          icon={FiLogOut} 
          title="Log Out" 
          isDanger={true}
          onClick={() => alert("Logging out...")}
          rightElement={<div />} // Empty div to hide chevron for logout
        />
      </div>

      {/* App Version */}
      <div className="text-center pb-6">
        <p className="text-xs text-gray-400 font-medium">Diamond Fry Center - Partner App v1.0.0</p>
      </div>

    </div>
  );
};

export default DeliverySettings;