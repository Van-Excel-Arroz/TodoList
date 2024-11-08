import { memo } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import React from 'react';
import TodolistHeader from './TodolistHeader';

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

				<div className="grid grid-cols-6 my-3 px-4 font-semibold">
					<p className="col-span-4">Todos</p>
					<p className="text-center">Due Date</p>
					<p className="text-center">Created In</p>
				</div>
				<div>
					{todos.map(todo => (
						<TodoItem key={todo.id} todo={todo} />
					))}
				</div>
			</div>
		</>
	);
}

export default memo(TodoListContent);
