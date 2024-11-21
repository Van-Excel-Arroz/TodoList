'use client';

import TodoForm from './TodoForm';
import React, { memo, useState } from 'react';
import TodolistHeader from './TodolistHeader';
import TodosRender from './TodosRender';
import { Category, Todo, TodoList } from '@/types';

interface TodolistContentProps {
	todolist: TodoList;
	todolistId: number;
	inititialTodos: Todo[];
	initialCategories: Category[];
}

function TodoListContent({ todolist, todolistId, inititialTodos, initialCategories }: TodolistContentProps) {
	const [todos, setTodos] = useState(inititialTodos);
	const [categories, setCategories] = useState(initialCategories);

	const addTodo = (newTodo: Todo) => {
		setTodos([...todos, newTodo]);
	};

	const addCategories = (newCategories: Category) => {
		setCategories([...categories, newCategories]);
	};

	return (
		<>
			<div className="font-body flex flex-col px-6 p-9">
				<TodolistHeader todolist={todolist} />
				<TodoForm todolistId={todolistId} onAddTodo={addTodo} onAddCategories={addCategories} />
				<TodosRender todos={todos} />
			</div>
		</>
	);
}

export default memo(TodoListContent);
