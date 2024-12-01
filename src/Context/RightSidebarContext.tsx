import { create } from 'zustand';

interface RightSidebarState {
	isRightSidebarOpen: boolean;
	toggleRightSidebar: () => void;
}

const useRightSidebarStore = create<RightSidebarState>()((set: any) => ({
	isRightSidebarOpen: true,
	toggleRightSidebar: () => set((state: RightSidebarState) => ({ isRightSidebarOpen: !state.isRightSidebarOpen })),
}));

export default useRightSidebarStore;
