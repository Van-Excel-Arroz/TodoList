'use client';

import useLeftSidebarStore from '@/context/LeftSidebarContext';

export default function LeftSidebarWrapper({ children }: { children: React.ReactNode }) {
	const { isLeftSidebarOpen } = useLeftSidebarStore();
	return (
		<>
			<div
				className={`border-r-2 rounded-r-3xl drop-shadow-xl bg-white pb-9 pt-6 h-[calc(100vh-3.5rem)] transition-all duration-200 ease-in-out text-nowrap overflow-hidden ${
					isLeftSidebarOpen ? 'w-72' : 'w-0'
				}`}
			>
				{children}
			</div>
		</>
	);
}
