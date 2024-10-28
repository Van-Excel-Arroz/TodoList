'use client';

import { createContext, useContext, useState } from 'react';

interface SidebarContextProps {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
	closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export function useSidebar() {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error('useSidebar must be used within a SidebarProvider');
	}
	return context;
}

interface SidebarProviderProps {
	children: React.ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	function toggleSidebar() {
		setIsSidebarOpen(prev => !prev);
	}

	function closeSidebar() {
		setIsSidebarOpen(false);
	}

	return (
		<SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, closeSidebar }}>{children}</SidebarContext.Provider>
	);
}
