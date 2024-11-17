'use client';

import { memo } from 'react';
import useSidebarStore from '@/components/Context/SidebarContext';

function SidebarWrapper({ children }: { children: React.ReactNode }) {
	const { isSidebarOpen } = useSidebarStore();
	return (
		<>
			<div
				className={`font-body border-r-2 rounded-r-3xl drop-shadow-xl bg-white py-9 h-screen ${
					isSidebarOpen ? 'w-72' : 'hidden'
				}`}
			>
				{children}
			</div>
		</>
	);
}

export default memo(SidebarWrapper);
