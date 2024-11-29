'use client';

import useSidebarStore from '@/Context/SidebarContext';

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
	const { isSidebarOpen } = useSidebarStore();
	return (
		<>
			<div
				className={`font-body border-r-2 rounded-r-3xl drop-shadow-xl bg-white py-9 h-screen transition-all duration-200 ease-in-out  ${
					isSidebarOpen ? 'w-72' : 'w-0 overflow-hidden'
				}`}
			>
				{children}
			</div>
		</>
	);
}
