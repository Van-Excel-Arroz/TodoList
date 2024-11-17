'use client';

import { memo } from 'react';
import useSidebarStore from '@/components/Context/SidebarContext';
import SidebarContent from './SidebarContent';
import { TodoList } from '@/types';

interface SidebarListProps {
	todolists: TodoList[];
}

function SidebarList({ todolists }: SidebarListProps) {
	const { isSidebarOpen } = useSidebarStore();
	return (
		<>
			<div
				className={`font-body border-r-2 rounded-r-3xl drop-shadow-xl bg-white py-9 h-screen ${
					isSidebarOpen ? 'w-72' : 'hidden'
				}`}
			>
				<SidebarContent todolists={todolists} />
			</div>
		</>
	);
}

export default memo(SidebarList);
