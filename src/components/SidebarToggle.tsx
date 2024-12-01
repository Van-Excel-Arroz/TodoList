'use client';

import useLeftSidebarStore from '@/context/LeftSidebarContext';
import { Menu } from 'lucide-react';
import { memo } from 'react';

function SidebarToggle() {
	const { toggleLeftSidebar } = useLeftSidebarStore();
	return (
		<button onClick={toggleLeftSidebar} aria-label="Sidebar Menu">
			<Menu />
		</button>
	);
}
export default memo(SidebarToggle);
