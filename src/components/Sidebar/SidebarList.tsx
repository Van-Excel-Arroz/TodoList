'use client';

import { useState, useTransition, memo, useCallback } from 'react';
import { useSidebar } from '@/components/Context/SidebarContext';
import SidebarContent from './SidebarContent';

interface Todolist {
	id: number;
	title: string;
}

interface SidebarListProps {
	initialTodolist: Todolist[];
}

const SidebarList = memo(function ({ initialTodolist }: SidebarListProps) {
	const [todolists, setTodolists] = useState(initialTodolist);
	const [isPending, startTransition] = useTransition();
	const { isSidebarOpen } = useSidebar();

	const handleAddTodolist = useCallback((newTodolist: Todolist) => {
		startTransition(() => {
			setTodolists(prev => [...prev, newTodolist]);
		});
	}, []);

	if (!isSidebarOpen) {
		return null;
	}

	return (
		<>
			<SidebarContent todolists={todolists} onAddTodolist={handleAddTodolist} />
		</>
	);
});

export default SidebarList;
