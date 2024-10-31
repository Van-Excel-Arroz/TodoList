'use client';

import { memo } from 'react';
import TodolistForm from './TodolistForm';
import TodoListItem from './TodoListItem';
import SidebarToggle from './SidebarToggle';
import Link from 'next/link';

const MemoizedTodolistForm = memo(TodolistForm);
const MemoizedTodoListItem = memo(TodoListItem);
const MemoizedSidebarToggle = memo(SidebarToggle);

interface Todolist {
	id: number;
	title: string;
}

interface SidebarContentProps {
	todolists: Todolist[];
	onAddTodolist: (todolist: Todolist) => void;
}

const SidebarContent = memo(function ({ todolists, onAddTodolist }: SidebarContentProps) {
	return (
		<div className="sticky top-0 left-0 w-80 h-screen overflow-y-scroll px-6 py-10">
			<div className="flex gap-4">
				<MemoizedSidebarToggle />
				<Link href="/" className="text-lg font-bold">
					Home
				</Link>
			</div>
			<MemoizedTodolistForm onAdd={onAddTodolist} />

			<ul className="container mx-auto p-4 flex flex-col gap-10">
				{todolists.map(todolist => (
					<li key={todolist.id}>
						<MemoizedTodoListItem key={todolist.id} todolist={todolist} />
					</li>
				))}
			</ul>
		</div>
	);
});

export default SidebarContent;
