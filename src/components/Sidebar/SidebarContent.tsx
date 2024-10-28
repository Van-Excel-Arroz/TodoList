'use client';

import { memo } from 'react';
import TodolistForm from './TodolistForm';
import TodoListItem from './TodoListItem';
import SidebarToggle from './SidebarToggle';

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
		<div className="sticky top-0 left-0 h-screen w-80 overflow-y-scroll px-6 py-10">
			<MemoizedSidebarToggle />
			<MemoizedTodolistForm onAdd={onAddTodolist} />

			<ul className="container mx-auto p-4 flex flex-col gap-10">
				{todolists.map(todolist => (
					<li>
						<MemoizedTodoListItem key={todolist.id} todolist={todolist} />
					</li>
				))}
			</ul>
		</div>
	);
});

export default SidebarContent;
