'use client';

import TodoItem from '@/components/ui-shared/TodoItem';
import ExpandableSection from '@/components/ui-shared/ExpandableSection';
import { Todo, TodoListWithFilteredTodos } from '@/utils/types';
import { memo, useEffect } from 'react';
import useTodosStore from '@/context/TodosContext';
import { motion } from 'framer-motion';
import { itemVariants } from '@/utils/framer-motion';
import { useTodoDataManagement } from '@/hooks/useTodoDataManagement';

interface FilteredTodosPage {
	filteredTodos: TodoListWithFilteredTodos[];
	title?: string;
}

function FilteredTodosPage({ filteredTodos, title }: FilteredTodosPage) {
	const { todos, setTodos } = useTodosStore();
	const { incompleteTodos: sortedTodos } = useTodoDataManagement(todos);

	useEffect(() => {
		console.log(filteredTodos);
		const todos: Todo[] = [];
		filteredTodos.forEach(todoList => {
			if (todoList.filtered_todos) {
				todoList.filtered_todos.forEach(todo => {
					if (title == 'tagged') {
						if (todo.categories && todo.categories.length > 0) {
							todos.push(todo);
						}
					} else {
						todos.push(todo);
					}
				});
			}
		});

		setTodos(todos);
	}, [filteredTodos, setTodos]);

	return (
		<div className="w-[98%] h-[calc(100vh-100px)] mx-auto mt-3 overflow-y-scroll overflow-x-hidden">
			<div className="px-5">
				{filteredTodos.map((todoList, index) => (
					<ExpandableSection isEmpty={false} title={todoList.title} key={todoList.id}>
						<ul>
							<motion.li key={index} layout variants={itemVariants} initial="initial" animate="animate">
								{title == 'tagged'
									? sortedTodos.map((todo, index) =>
											todo.categories!.some(cat => cat.category_title == todoList.title) ? (
												<TodoItem todo={todo} key={index} />
											) : null
									  )
									: sortedTodos.map((todo, index) =>
											todoList.id == todo.todo_list_id ? <TodoItem todo={todo} key={index} /> : null
									  )}
							</motion.li>
						</ul>
					</ExpandableSection>
				))}
			</div>
		</div>
	);
}

export default memo(FilteredTodosPage);
