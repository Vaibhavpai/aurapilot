import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

const API_BASE_URL = 'http://localhost:8000/auth';

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('aura_token'));
    const [loading, setLoading] = useState(true);

    // Initial user load
    useEffect(() => {
        const fetchMe = async () => {
            if (token) {
                try {
                    const res = await axios.get(`${API_BASE_URL}/me`, {
                        params: { token }
                    });
                    setUser(res.data);
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                    logout();
                }
            }
            setLoading(false);
        };
        fetchMe();
    }, [token]);

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/login`, { email, password });
            setToken(res.data.access_token);
            localStorage.setItem('aura_token', res.data.access_token);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.detail || 'Login failed' };
        }
    };

    const signup = async (username, email, password) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/signup`, { username, email, password });
            setToken(res.data.access_token);
            localStorage.setItem('aura_token', res.data.access_token);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.detail || 'Signup failed' };
        }
    };

    const googleLogin = async (googleToken) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/google-login`, { token: googleToken });
            setToken(res.data.access_token);
            localStorage.setItem('aura_token', res.data.access_token);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.detail || 'Google login failed' };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('aura_token');
    };

    const updateUserLocal = (newUserInfo) => {
        setUser(prev => ({ ...prev, ...newUserInfo }));
    };

    return (
        <UserContext.Provider value={{ user, token, login, signup, googleLogin, logout, updateUserLocal, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
