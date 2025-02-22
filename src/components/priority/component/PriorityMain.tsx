'use client';

import TodoItem from '@/components/ui-shared/TodoItem';
import ExpandableSection from '@/components/ui-shared/ExpandableSection';
import { Todo, TodoListWithImportantTodos } from '@/utils/types';
import { useEffect } from 'react';
import useTodosStore from '@/context/TodosContext';
import { motion } from 'framer-motion';
import { itemVariants } from '@/utils/framer-motion';

interface PriorityMainProps {
	importantTodosWithTodoList: TodoListWithImportantTodos[];
}

export default function PriorityMain({ importantTodosWithTodoList }: PriorityMainProps) {
	const { todos, setTodos } = useTodosStore();

	useEffect(() => {
		const todos: Todo[] = [];
		importantTodosWithTodoList.map(todoList => todoList.importantTodos.map(todo => todos.push(todo)));

		setTodos(todos);
	}, [importantTodosWithTodoList, setTodos]);

	return (
		<>
			{importantTodosWithTodoList.map((todoList, index) => (
				<ExpandableSection isEmpty={false} title={todoList.title} key={todoList.id}>
					<ul>
						<motion.li key={index} layout variants={itemVariants} initial="initial" animate="animate">
							{todos.map((todo, index) =>
								todo.todo_list_id === todoList.id ? <TodoItem todo={todo} key={index} /> : null
							)}
						</motion.li>
					</ul>
				</ExpandableSection>
			))}
		</>
	);
}
