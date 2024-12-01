import { create } from 'zustand';

interface LeftSidebarState {
	isLeftSidebarOpen: boolean;
	toggleLeftSidebar: () => void;
}

const useLeftSidebarStore = create<LeftSidebarState>()((set: any) => ({
	isLeftSidebarOpen: true,
	toggleLeftSidebar: () => set((state: LeftSidebarState) => ({ isLeftSidebarOpen: !state.isLeftSidebarOpen })),
}));

export default useLeftSidebarStore;
