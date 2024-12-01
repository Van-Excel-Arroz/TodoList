'use client';

import useLeftSidebarStore from '@/Context/LeftSidebarContext';
import { Menu } from 'lucide-react';
import { memo } from 'react';

function SidebarToggle() {
	const { toggleSidebar } = useLeftSidebarStore();
	return (
		<button onClick={toggleSidebar} aria-label="Sidebar Menu">
			<Menu />
		</button>
	);
}
export default memo(SidebarToggle);
