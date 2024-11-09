'use client';

import TodolistForm from './TodolistForm';
import TodoListItem from './TodolistItem/TodoListItem';
import { memo } from 'react';

import { TodoList } from '@/types';
import SidebarHeader from './SidebarHeader';

interface SidebarContentProps {
	todolists: TodoList[];
	onAddTodolist: (todolist: TodoList) => void;
}

function SidebarContent({ todolists, onAddTodolist }: SidebarContentProps) {
	return (
		<>
			<div className="flex flex-col gap-4 px-6">
				<SidebarHeader />
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
