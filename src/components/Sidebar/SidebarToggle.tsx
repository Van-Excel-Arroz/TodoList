'use client';

import { useSidebar } from '@/components/Context/SidebarContext';
import { RxHamburgerMenu } from 'react-icons/rx';

export default function SidebarToggle() {
	const { toggleSidebar } = useSidebar();
	return (
		<button onClick={toggleSidebar}>
			<RxHamburgerMenu size={20} />
		</button>
	);
}
