'use client';

import TodolistForm from './TodolistForm';
import TodoListItem from './TodolistItem/TodoListItem';
import SidebarToggle from './SidebarToggle';
import Link from 'next/link';
import { memo } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { usePathname } from 'next/navigation';

interface Todolist {
	id: number;
	title: string;
}

interface SidebarContentProps {
	todolists: Todolist[];
	onAddTodolist: (todolist: Todolist) => void;
}

function SidebarContent({ todolists, onAddTodolist }: SidebarContentProps) {
	const pathname = usePathname();
	const isHome = pathname === '/tasks/home';

	return (
		<>
			<div className="flex flex-col gap-4 px-6">
				<div className="flex gap-4 items-center">
					{!isHome && <SidebarToggle />}
					<Link href="/" className="text-lg font-bold">
						<AiOutlineHome size={27} />
					</Link>
				</div>
				<TodolistForm onAdd={onAddTodolist} />
			</div>

			<div className="h-[calc(100%-90px)] overflow-y-auto overflow-x-hidden">
				<ul className="container mx-auto flex flex-col gap-2">
					{todolists.map(todolist => (
						<li key={todolist.id}>
							<TodoListItem key={todolist.id} todolist={todolist} />
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
//sidebar
export default memo(SidebarContent);
