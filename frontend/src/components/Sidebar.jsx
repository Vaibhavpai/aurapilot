import React from 'react';
import {
    LayoutDashboard,
    Users,
    Bell,
    LineChart,
    CalendarClock,
    Settings,
    Database
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

export default function Sidebar() {
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Relationships', path: '/relationships', icon: <Users size={20} /> },
        { name: 'Alerts', path: '/alerts', icon: <Bell size={20} /> },
        { name: 'Insights', path: '/insights', icon: <LineChart size={20} /> },
        { name: 'Reminders', path: '/reminders', icon: <CalendarClock size={20} /> },
        { name: 'Ingest', path: '/ingest', icon: <Database size={20} /> },
        { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
    ];

    return (
        <aside className="w-[260px] bg-white/40 h-full flex flex-col pt-8 px-4 flex-shrink-0 relative z-10">
            <div className="flex items-center gap-3 px-3 mb-12">
                <div className="w-9 h-9 bg-[#7c5ff4]/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-[#7c5ff4]/20">
                    <span className="text-[#7c5ff4] font-bold text-lg italic">A</span>
                </div>
                <div>
                    <h1 className="text-gray-900 font-bold text-lg tracking-tight leading-none">AURA Connect</h1>
                    <p className="text-gray-500 text-[9px] font-medium tracking-wide mt-0.5 uppercase">Relationship Intelligence</p>
                </div>
            </div>

            <nav className="flex-1 space-y-1">
                {menuItems.map((item) => {
                    const isActive = location.pathname.startsWith(item.path);
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 ${isActive
                                ? 'bg-[#efecf9] text-[#5b3eb8] font-medium shadow-sm'
                                : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                                }`}
                        >
                            {item.icon}
                            <span className="text-[15px]">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
