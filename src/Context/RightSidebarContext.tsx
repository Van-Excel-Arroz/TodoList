import { create } from 'zustand';

interface RightSidebarState {
	isRightSidebarOpen: boolean;
	openRightSidebar: () => void;
	closeRightSidebar: () => void;
}

const useRightSidebarStore = create<RightSidebarState>()((set: any) => ({
	isRightSidebarOpen: true,
	openRightSidebar: () => set((state: RightSidebarState) => ({ isRightSidebarOpen: true })),
	closeRightSidebar: () => set((state: RightSidebarState) => ({ isRightSidebarOpen: false })),
}));

export default useRightSidebarStore;
