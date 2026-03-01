import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { GoogleLogin } from '@react-oauth/google';
import {
    Users,
    HeartPulse,
    Activity,
    CalendarDays,
    Mail,
    Lock,
    EyeOff,
    ArrowRight,
    ShieldCheck,
    Briefcase
} from 'lucide-react';

export default function Landing() {
    const { login, signup, googleLogin } = useUser();
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        setError('');
        let result;
        if (isSignup) {
            result = await signup(formData.username, formData.email, formData.password);
        } else {
            result = await login(formData.email, formData.password);
        }

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        const result = await googleLogin(credentialResponse.credential);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="h-screen w-full relative overflow-hidden font-sans selection:bg-[#A388FF]/30 select-none">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url("/images/background.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.9)'
                }}
            />

            <nav className="relative z-10 px-12 py-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                        <span className="text-white font-bold text-xl italic">A</span>
                    </div>
                    <span className="text-white font-bold text-2xl tracking-tight">AURA Connect</span>
                </div>
                <div className="flex items-center gap-8">
                    <a href="#" className="text-white/80 hover:text-white transition-colors font-medium text-sm">Features</a>
                    <a href="#" className="text-white/80 hover:text-white transition-colors font-medium text-sm">Pricing</a>
                    <a href="#" className="text-white/80 hover:text-white transition-colors font-medium text-sm">About</a>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="bg-white text-gray-900 px-5 py-2 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-[0_8px_20px_rgba(255,255,255,0.15)] text-sm"
                    >
                        Demo Access
                    </button>
                </div>
            </nav>

            <main className="relative z-10 px-12 h-[calc(100vh-120px)] flex items-center justify-between gap-8">
                <div className="max-w-4xl">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6">
                        <Activity size={16} className="text-[#A388FF]" />
                        <span className="text-white/90 text-xs font-bold tracking-widest uppercase">v2.0 Beta Now Live</span>
                    </div>
                    <h1 className="text-7xl font-black text-white leading-[1] mb-8 tracking-tighter">
                        AI-Powered <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A388FF] to-[#FF8EDC]">Relationship</span> <br /> Intelligence.
                    </h1>
                    <p className="text-xl text-white/70 leading-relaxed mb-6 font-medium max-w-3xl">
                        AURA Connect utilizes advanced neural processing to decode the subtle nuances of your digital interactions.
                        We help you stay ahead of the curve by identifying high-priority follow-ups and suggesting the optimal moments
                        to reconnect with those who matter most.
                    </p>

                    <button className="bg-[#A388FF] text-white px-9 py-5 rounded-2xl font-bold text-lg hover:bg-[#9171FF] transition-all shadow-[0_12px_40px_rgba(163,136,255,0.3)] flex items-center gap-3 group">
                        Get Early Access <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="w-[400px] bg-white/95 backdrop-blur-xl rounded-[32px] p-8 shadow-[0_32px_80px_rgba(0,0,0,0.2)] border border-white relative overflow-hidden flex-shrink-0">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#A388FF]/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                    <div className="relative">
                        <h2 className="text-2xl font-black text-gray-900 mb-1">{isSignup ? 'Join AURA' : 'Welcome Back'}</h2>
                        <p className="text-gray-500 text-xs font-semibold mb-6">
                            {isSignup ? "Start tracking your connections today." : "Unlock your social potential with AI."}
                        </p>

                        {error && (
                            <div className="mb-3 p-2 bg-rose-50 text-rose-500 text-[11px] rounded-xl border border-rose-100 font-bold">
                                {error}
                            </div>
                        )}

                        <div className="space-y-3">
                            {isSignup && (
                                <div className="relative">
                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pl-11 pr-4 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A388FF]/10 focus:border-[#A388FF] transition-all"
                                    />
                                </div>
                            )}
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pl-11 pr-4 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A388FF]/10 focus:border-[#A388FF] transition-all"
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pl-11 pr-4 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A388FF]/10 focus:border-[#A388FF] transition-all"
                                />
                                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <EyeOff size={16} />
                                </button>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full bg-[#A388FF] text-white py-3.5 rounded-xl font-bold text-[14px] hover:bg-[#9171FF] transition-all shadow-[0_8px_15px_rgba(163,136,255,0.2)] block text-center mt-1 tracking-widest uppercase"
                            >
                                {isSignup ? 'Create Account' : 'Log In'}
                            </button>

                            <div className="relative py-2 flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-100"></div>
                                </div>
                                <span className="relative px-3 bg-white text-gray-400 text-[9px] font-black tracking-[0.2em] uppercase">OR</span>
                            </div>

                            <div className="flex justify-center scale-95 origin-center">
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={() => setError("Google Login Failed")}
                                    useOneTap
                                    shape="circle"
                                    width="100%"
                                />
                            </div>

                            <p className="text-center text-gray-500 text-[11px] font-bold mt-4">
                                {isSignup ? 'Already have an account?' : "Don't have an account?"} {' '}
                                <button
                                    onClick={() => setIsSignup(!isSignup)}
                                    className="text-[#A388FF] font-black hover:underline underline-offset-2"
                                >
                                    {isSignup ? 'Log In' : 'Sign Up'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
