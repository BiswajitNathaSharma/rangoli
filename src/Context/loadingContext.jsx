import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Loading Context
const LoadingContext = createContext();

// Create Loading Provider
export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const updateNetworkStatus = () => {
        setIsOnline(navigator.onLine);
    };

    useEffect(() => {
        window.addEventListener('online', updateNetworkStatus);
        window.addEventListener('offline', updateNetworkStatus);

        return () => {
            window.removeEventListener('online', updateNetworkStatus);
            window.removeEventListener('offline', updateNetworkStatus);
        };
    }, []);
    const toggleLoading = (state) => {
        setIsLoading(state);
    };
    return (
        <LoadingContext.Provider value={{ isLoading, toggleLoading, isOnline }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);
