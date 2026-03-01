import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState({
        name: 'Mridul',
        email: 'mridul@email.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop'
    });

    // Load from localStorage on init
    useEffect(() => {
        const savedUser = localStorage.getItem('aura_user');
        if (savedUser) {
            let parsed = JSON.parse(savedUser);
            // Force male avatar if it's the old female one
            if (parsed.avatar === 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop') {
                parsed.avatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop';
            }
            setUser(parsed);
        }
    }, []);

    const updateUser = (newUserInfo) => {
        const updatedUser = { ...user, ...newUserInfo };
        setUser(updatedUser);
        localStorage.setItem('aura_user', JSON.stringify(updatedUser));
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
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
