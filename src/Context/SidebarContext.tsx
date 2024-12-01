import { create } from 'zustand';

interface LeftSidebarState {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
}

const useLeftSidebarStore = create<LeftSidebarState>()((set: any) => ({
	isSidebarOpen: true,
	toggleSidebar: () => set((state: LeftSidebarState) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

export default useLeftSidebarStore;
