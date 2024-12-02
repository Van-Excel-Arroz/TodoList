import { create } from 'zustand';

interface RightSidebarState {
	isRightSidebarOpen: boolean;
	toggleRightSidebar: () => void;
	closeRightSidebar: () => void;
}

const useRightSidebarStore = create<RightSidebarState>()((set: any) => ({
	isRightSidebarOpen: false,
	toggleRightSidebar: () => set((state: RightSidebarState) => ({ isRightSidebarOpen: !state.isRightSidebarOpen })),
	closeRightSidebar: () => set(() => ({ isRightSidebarOpen: false })),
}));
export default useRightSidebarStore;
