'use client';

import useSidebarStore from '@/components/Context/SidebarContext';
import { RxHamburgerMenu } from 'react-icons/rx';

export default function SidebarToggle() {
	const { toggleSidebar } = useSidebarStore();
	return (
		<button onClick={toggleSidebar}>
			<RxHamburgerMenu size={20} />
		</button>
	);
}
