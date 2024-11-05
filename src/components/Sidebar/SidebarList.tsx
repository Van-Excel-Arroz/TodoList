'use client';

import { useState, useTransition, memo, useCallback } from 'react';
import useSidebarStore from '@/components/Context/SidebarContext';
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
	const { isSidebarOpen } = useSidebarStore();

	const handleAddTodolist = useCallback((newTodolist: Todolist) => {
		startTransition(() => {
			setTodolists(prev => [...prev, newTodolist]);
		});
	}, []);

	return (
		<>
			<div className={`${isSidebarOpen ? 'w-[350px]' : 'w-0'}`}>
				<SidebarContent todolists={todolists} onAddTodolist={handleAddTodolist} />
			</div>
		</>
	);
});

export default SidebarList;
