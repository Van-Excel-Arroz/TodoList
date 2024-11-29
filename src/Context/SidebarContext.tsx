import { create } from 'zustand';

interface SidebarState {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
}

const useSidebarStore = create<SidebarState>()((set: any) => ({
	isSidebarOpen: true,
	toggleSidebar: () => set((state: SidebarState) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

export default useSidebarStore;
