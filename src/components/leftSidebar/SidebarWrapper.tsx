'use client';

import useSidebarStore from '@/Context/LeftSidebarContext';

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
	const { isSidebarOpen } = useSidebarStore();
	return (
		<>
			<div
				className={`font-body border-r-2 rounded-r-3xl drop-shadow-xl bg-white pb-9 pt-6 h-screen transition-all duration-200 ease-in-out text-nowrap overflow-hidden ${
					isSidebarOpen ? 'w-72' : 'w-0'
				}`}
			>
				{children}
			</div>
		</>
	);
}
