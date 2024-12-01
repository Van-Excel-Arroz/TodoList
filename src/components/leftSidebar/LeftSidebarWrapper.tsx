'use client';

import useLeftSidebarStore from '@/context/LeftSidebarContext';

export default function LeftSidebarWrapper({ children }: { children: React.ReactNode }) {
	const { isLeftSidebarOpen } = useLeftSidebarStore();
	return (
		<>
			<div
				className={`font-body border-r-2 rounded-r-3xl drop-shadow-xl bg-white pb-9 pt-6 h-screen transition-all duration-200 ease-in-out text-nowrap overflow-hidden ${
					isLeftSidebarOpen ? 'w-72' : 'w-0'
				}`}
			>
				{children}
			</div>
		</>
	);
}
