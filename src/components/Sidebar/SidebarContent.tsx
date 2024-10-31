'use client';

import TodolistForm from './TodolistForm';
import TodoListItem from './TodoListItem';
import SidebarToggle from './SidebarToggle';
import Link from 'next/link';
import { memo } from 'react';

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
		<div className="sticky top-0 left-0 w-80 h-screen overflow-y-scroll px-6 py-10">
			<div className="flex gap-4">
				<SidebarToggle />
				<Link href="/" className="text-lg font-bold">
					Home
				</Link>
			</div>
			<TodolistForm onAdd={onAddTodolist} />

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
