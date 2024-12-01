import { create } from 'zustand';

interface RightSidebarState {
	isRightSidebarOpen: boolean;
	toggleRightSidebar: () => void;
}
