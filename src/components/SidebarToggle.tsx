'use client';

import useLeftSidebarStore from '@/context/LeftSidebarContext';
import { Menu } from 'lucide-react';

export default function LeftSidebarToggle() {
	const { toggleLeftSidebar } = useLeftSidebarStore();
	return (
		<button onClick={toggleLeftSidebar} aria-label="Sidebar Menu">
			<Menu />
		</button>
	);
}
