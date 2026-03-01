import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import DashboardLayout from '../components/DashboardLayout';
import { useUser } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import {
    User,
    Bell,
    Settings as SettingsIcon,
    Shield,
    Cpu,
    Save,
    Trash2
} from 'lucide-react';

export default function Settings() {
    const { user, updateUserLocal, loading } = useUser();
    const [profile, setProfile] = useState({
        name: '',
        email: ''
    });

    const [threshold, setThreshold] = useState(65);

    useEffect(() => {
        if (user) {
            setProfile({
                name: user.full_name || user.username || '',
                email: user.email || ''
            });
        }
    }, [user]);

    if (loading) {
        return <DashboardLayout><div className="flex-1 flex items-center justify-center pt-24"><div className="w-12 h-12 border-4 border-[#7c5ff4]/20 border-t-[#7c5ff4] rounded-full animate-spin"></div></div></DashboardLayout>;
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    const handleSave = () => {
        updateUserLocal(profile);
    };

    return (
        <DashboardLayout>
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                <TopNavbar />

                <div className="flex-1 overflow-y-auto px-10 pb-12 custom-scrollbar">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h2>
                        <p className="text-gray-500 font-medium">AI-powered Relationship Intelligence platform</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

                        {/* Profile Settings */}
                        <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-8 border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] flex flex-col">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-[#7c5ff4]/10 rounded-xl text-[#7c5ff4]">
                                    <User size={20} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">Profile Settings</h3>
                            </div>

                            <div className="flex justify-center mb-8 relative">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                    <img
                                        src={user.avatar}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button className="absolute bottom-0 right-1/2 translate-x-12 bg-[#7c5ff4] text-white p-2 rounded-full shadow-md hover:bg-[#6b4ee3] transition-colors">
                                    <Cpu size={14} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 ml-1">NAME</label>
                                    <input
                                        type="text"
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        className="w-full mt-1 px-4 py-3 bg-white/50 border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c5ff4]/20 focus:bg-white transition-all text-gray-700"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 ml-1">EMAIL</label>
                                    <input
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                        className="w-full mt-1 px-4 py-3 bg-white/50 border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c5ff4]/20 focus:bg-white transition-all text-gray-700"
                                    />
                                </div>
                                <button
                                    onClick={handleSave}
                                    className="w-full mt-4 py-3.5 bg-[#7c5ff4] text-white rounded-2xl font-medium shadow-lg shadow-[#7c5ff4]/20 hover:bg-[#6b4ee3] transition-all transform hover:scale-[0.02]"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>

                        {/* Notification Settings */}
                        <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-8 border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-[#7c5ff4]/10 rounded-xl text-[#7c5ff4]">
                                    <Bell size={20} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">Notification Settings</h3>
                            </div>

                            <div className="space-y-6">
                                <ToggleSetting label="Enable Notifications" defaultChecked={true} />
                                <ToggleSetting label="Emotional Drift Alerts" defaultChecked={true} />
                                <ToggleSetting label="Decay Risk Alerts" defaultChecked={true} />
                                <ToggleSetting label="Weekly Summary" defaultChecked={true} />
                            </div>

                            <div className="mt-10 pt-10 border-t border-white/50">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-2 bg-[#7c5ff4]/10 rounded-xl text-[#7c5ff4]">
                                        <Cpu size={20} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Account AI Settings</h3>
                                </div>
                                <div className="space-y-6">
                                    <ToggleSetting label="Enable AI Analysis" defaultChecked={true} />
                                    <ToggleSetting label="Emotional Drift Analysis" defaultChecked={false} />
                                </div>
                            </div>
                        </div>

                        {/* Automation Settings */}
                        <div className="flex flex-col gap-6">
                            <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-8 border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-2 bg-[#7c5ff4]/10 rounded-xl text-[#7c5ff4]">
                                        <SettingsIcon size={20} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Automation Settings</h3>
                                </div>
                                <div className="space-y-8">
                                    <ToggleSetting label="Auto Analyze Chat Logs" defaultChecked={true} />
                                    <ToggleSetting label="Smart Reminders" defaultChecked={true} />
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-sm font-medium text-gray-700">Decay Alert Threshold</span>
                                            <span className="text-xs font-bold text-[#7c5ff4] bg-[#7c5ff4]/10 px-2 py-1 rounded-lg">{threshold}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={threshold}
                                            onChange={(e) => setThreshold(e.target.value)}
                                            className="w-full accent-[#7c5ff4] h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                                        />
                                        <div className="flex justify-between mt-2 px-1">
                                            <span className="text-[10px] text-gray-400 font-bold">0</span>
                                            <span className="text-[10px] text-gray-400 font-bold">100</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Privacy Settings */}
                            <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-8 border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-2 bg-[#7c5ff4]/10 rounded-xl text-[#7c5ff4]">
                                        <Shield size={20} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Privacy Settings</h3>
                                </div>
                                <div className="space-y-6">
                                    <ToggleSetting label="Store Chat Logs" defaultChecked={true} />
                                    <ToggleSetting label="AI Data Processing Consent" defaultChecked={true} />
                                    <button className="w-full flex items-center justify-center gap-2 mt-4 py-3 px-4 bg-rose-500/10 text-rose-600 rounded-2xl font-semibold border border-rose-100 hover:bg-rose-500/20 transition-all group">
                                        <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </DashboardLayout >
    );
}

function ToggleSetting({ label, defaultChecked = false }) {
    const [checked, setChecked] = useState(defaultChecked);
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <button
                onClick={() => setChecked(!checked)}
                className={`w-12 h-6 rounded-full transition-all duration-300 relative ${checked ? 'bg-[#7c5ff4]' : 'bg-gray-200'}`}
            >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${checked ? 'left-7' : 'left-1'}`} />
            </button>
        </div>
    );
}
