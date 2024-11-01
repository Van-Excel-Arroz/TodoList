'use client';

import TodolistForm from './TodolistForm';
import TodoListItem from './TodoListItem';
import SidebarToggle from './SidebarToggle';
import Link from 'next/link';
import { memo } from 'react';
import { AiOutlineHome } from 'react-icons/ai';

interface Todolist {
	id: number;
	title: string;
}

interface SidebarContentProps {
	todolists: Todolist[];
	onAddTodolist: (todolist: Todolist) => void;
}

function SidebarContent({ todolists, onAddTodolist }: SidebarContentProps) {
	return (
		<div className="border-r-2 h-screen sticky top-0 left-0 bg-white py-9">
			<div className="flex flex-col gap-4 px-6">
				<div className="flex gap-4 items-center">
					<SidebarToggle />
					<Link href="/" className="text-lg font-bold">
						<AiOutlineHome size={27} />
					</Link>
				</div>
				<TodolistForm onAdd={onAddTodolist} />
			</div>

			<ul className="container mx-auto flex flex-col gap-2">
				{todolists.map(todolist => (
					<li key={todolist.id}>
						<TodoListItem key={todolist.id} todolist={todolist} />
					</li>
				))}
			</ul>
		</div>
	);
}

export default memo(SidebarContent);
