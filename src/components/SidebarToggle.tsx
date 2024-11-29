'use client';

import useSidebarStore from '@/Context/SidebarContext';
import { Menu } from 'lucide-react';
import { memo } from 'react';

function SidebarToggle() {
	const { toggleSidebar } = useSidebarStore();
	return (
		<button onClick={toggleSidebar} aria-label="Sidebar Menu">
			<Menu />
		</button>
	);
}
export default memo(SidebarToggle);
