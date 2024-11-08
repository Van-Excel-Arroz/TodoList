'use client';

import useSidebarStore from '../Context/SidebarContext';
import SidebarToggle from '../Sidebar/SidebarToggle';

interface TodolistHeaderProps {
	todolist: {
		title: string;
		id: number;
	};
}

export default function TodolistHeader({ todolist }: TodolistHeaderProps) {
	const { isSidebarOpen } = useSidebarStore();

	return (
		<div className="flex gap-4">
			{!isSidebarOpen && <SidebarToggle />}
			<p className="text-lg font-bold">
				{todolist.title} #{todolist.id}
			</p>
		</div>
	);
}
