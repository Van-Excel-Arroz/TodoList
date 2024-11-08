import { memo } from 'react';
import TodoForm from './TodoForm';
import React from 'react';
import TodolistHeader from './TodolistHeader';
import TodosRender from './TodosRender';

interface Todo {
	id: number;
	task_text: string;
	category: string | null;
	due_datetime: string | null;
	creation_date: string;
	todo_list_id: number;
}
interface TodoList {
	id: number;
	title: string;
}

interface TodolistContentProps {
	todolist: TodoList;
	todos: Todo[];
}

function TodoListContent({ todolist, todos }: TodolistContentProps) {
	return (
		<>
			<div className="font-body flex flex-col px-6 p-9">
				<TodolistHeader todolist={todolist} />
				<TodoForm todolistId={todolist.id} />
				<TodosRender todos={todos} />
			</div>
		</>
	);
}

export default memo(TodoListContent);
