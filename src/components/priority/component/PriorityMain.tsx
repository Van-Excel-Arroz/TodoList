'use client';

import TodoItem from '@/components/ui-shared/TodoItem';
import ExpandableSection from '@/components/ui-shared/ExpandableSection';
import { Todo, TodoListWithImportantTodos } from '@/utils/types';
import { useEffect, useState } from 'react';
import useTodosStore from '@/context/TodosContext';

interface PriorityMainProps {
	importantTodosWithTodoList: TodoListWithImportantTodos[];
}

export default function PriorityMain({ importantTodosWithTodoList }: PriorityMainProps) {
	const { todos, setTodos } = useTodosStore();
	const [todoLists, setTodoLists] = useState<TodoListWithImportantTodos[]>(importantTodosWithTodoList);

	useEffect(() => {
		const todos: Todo[] = [];
		importantTodosWithTodoList.map(todoList => todoList.importantTodos.map(todo => todos.push(todo)));

		setTodos(todos);
	}, [importantTodosWithTodoList, setTodos]);

	return (
		<>
			{importantTodosWithTodoList.map((todoList: TodoListWithImportantTodos) => (
				<ExpandableSection isEmpty={false} title={todoList.title} key={todoList.id}>
					{todos.map((todo, index) =>
						todo.todo_list_id === todoList.id ? <TodoItem todo={todo} key={index} /> : null
					)}
				</ExpandableSection>
			))}
		</>
	);
}
