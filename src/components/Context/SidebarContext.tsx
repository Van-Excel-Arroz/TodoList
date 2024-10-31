import { create } from 'zustand';

interface SidebarState {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
}

const useSidebarStore = create<SidebarState>()((set: any) => ({
	isSidebarOpen: false,
	toggleSidebar: () => set((state: any) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

export default useSidebarStore;
