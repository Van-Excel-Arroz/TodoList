'use client';

import useRightSidebarStore from '@/context/RightSidebarContext';

export default function RightSidebarWrapper({ children }: { children: React.ReactNode }) {
	const { isRightSidebarOpen } = useRightSidebarStore();
	return (
		<>
			<div
				className={`font-body border-l-2 rounded-l-3xl drop-shadow-xl bg-white pb-9 pt-6 h-screen transition-all duration-200 ease-in-out text-nowrap overflow-hidden ${
					isRightSidebarOpen ? 'w-72' : 'w-0'
				}`}
			>
				{children}
			</div>
		</>
	);
}
