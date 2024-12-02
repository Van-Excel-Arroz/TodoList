import { create } from 'zustand';

interface RightSidebarState {
	isRightSidebarOpen: boolean;
	openRightSidebar: () => void;
	closeRightSidebar: () => void;
}

const useRightSidebarStore = create<RightSidebarState>()((set: any) => ({
	isRightSidebarOpen: false,
	openRightSidebar: () => set(() => ({ isRightSidebarOpen: true })),
	closeRightSidebar: () => set(() => ({ isRightSidebarOpen: false })),
}));

export default useRightSidebarStore;
