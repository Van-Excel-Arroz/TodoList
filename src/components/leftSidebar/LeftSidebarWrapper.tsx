'use client';

import useLeftSidebarStore from '@/context/LeftSidebarContext';

export default function LeftSidebarWrapper({ children }: { children: React.ReactNode }) {
	const { isLeftSidebarOpen, toggleLeftSidebar } = useLeftSidebarStore();

	return (
		<>
			<div
				className={`fixed inset-0 bg-black/20 transition-opacity md:hidden cursor-pointer ${
					isLeftSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
				onClick={toggleLeftSidebar}
			/>
			<div
				className={`fixed lg:relative left-0 top-0 border-r-2 rounded-r-3xl drop-shadow-xl bg-white pb-9 pt-6 lg:h-[calc(100vh-3.5rem)] h-screen transition-all duration-200 ease-in-out text-nowrap overflow-hidden backdrop-blur-sm bg-opacity-80 ${
					isLeftSidebarOpen ? 'w-72' : 'w-0'
				}`}
			>
				{children}
			</div>
		</>
	);
}
