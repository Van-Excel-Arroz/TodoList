'use client';

import TodolistForm from './TodolistForm';
import TodoListItem from './TodoListItem';
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
		<div className="border-r-2 rounded-r-3xl h-screen sticky top-0 bg-white left-0 py-9">
			<div className="flex flex-col gap-4 px-6">
				<div className="flex gap-4 items-center">
					{!isHome && <SidebarToggle />}
					<Link href="/" className="text-lg font-bold">
						<AiOutlineHome size={27} />
					</Link>
				</div>
				<TodolistForm onAdd={onAddTodolist} />
			</div>

			<ul className="container mx-auto flex flex-col gap-2 overflow-y-scroll">
				{todolists.map(todolist => (
					<li key={todolist.id}>
						<TodoListItem key={todolist.id} todolist={todolist} />
					</li>
				))}
			</ul>
		</div>
	);
}
//sidebar
export default memo(SidebarContent);
