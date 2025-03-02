'use client';

import TodoItem from '@/components/ui-shared/TodoItem';
import ExpandableSection from '@/components/ui-shared/ExpandableSection';
import { Todo, TodoListWithFilteredTodos } from '@/utils/types';
import { useEffect } from 'react';
import useTodosStore from '@/context/TodosContext';
import { motion } from 'framer-motion';
import { itemVariants } from '@/utils/framer-motion';

interface FilteredTodosPage {
	filteredTodosWithTodoList: TodoListWithFilteredTodos[];
}

export default function FilteredTodosPage({ filteredTodosWithTodoList }: FilteredTodosPage) {
	const { todos, setTodos } = useTodosStore();

	useEffect(() => {
		const todos: Todo[] = [];
		filteredTodosWithTodoList.map(todoList => todoList.filteredTodos.map(todo => todos.push(todo)));

		setTodos(todos);
	}, [filteredTodosWithTodoList, setTodos]);

	return (
		<div className="w-[98%] h-[calc(100vh-100px)] mx-auto mt-3 overflow-y-scroll overflow-x-hidden">
			<div className='px-5'>
				{filteredTodosWithTodoList.map((todoList, index) => (
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
			</div>
		</div>
	);
}
