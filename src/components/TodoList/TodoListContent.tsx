'use client';

import TodoForm from './TodoForm';
import React, { memo, useState } from 'react';
import TodolistHeader from './TodolistHeader';
import TodosRender from './TodosRender';
import { Todo, TodoList } from '@/types';

interface TodolistContentProps {
	todolist: TodoList;
	todolistId: number;
	initialTodos: Todo[];
}

function TodoListContent({ todolist, todolistId, initialTodos }: TodolistContentProps) {
	const [todos, setTodos] = useState<Todo[]>(initialTodos);

	const addTodo = (newTodo: Todo) => {
		setTodos(prevTodos => [...prevTodos, newTodo]);
	};

	const updateCompletion = (todoId: number, isCompleted: boolean) => {
		setTodos(prevTodos => prevTodos.map(todo => (todo.id === todoId ? { ...todo, is_completed: isCompleted } : todo)));
	};

	return (
		<>
			<div className="font-body flex flex-col px-6 p-9">
				<TodolistHeader todolist={todolist} />
				<TodoForm todolistId={todolistId} onAddTodo={addTodo} />
				<TodosRender todos={todos} />
			</div>
		</>
	);
}

export default memo(TodoListContent);
