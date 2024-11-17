'use client';

import useSidebarStore from '@/components/Context/SidebarContext';
import { memo } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';

function SidebarToggle() {
	const { toggleSidebar } = useSidebarStore();
	return (
		<button onClick={toggleSidebar} aria-label="Sidebar Menu">
			<RxHamburgerMenu size={20} />
		</button>
	);
}
export default memo(SidebarToggle);
