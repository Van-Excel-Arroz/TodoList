'use client';

import TodoItem from '@/components/ui-shared/TodoItem';
import ExpandableSection from '@/components/ui-shared/ExpandableSection';
import { Todo, TodoListWithFilteredTodos } from '@/utils/types';
import { memo, useEffect } from 'react';
import useTodosStore from '@/context/TodosContext';
import { motion } from 'framer-motion';
import { itemVariants } from '@/utils/framer-motion';
import { useTodoDataManagement } from '@/hooks/useTodoDataManagement';
import TodoSort from '../todo-list/components/TodoSort';
import TodoFilter from '../todo-list/components/TodoFilter';
import LayoutButtons from './LayoutButtons';
import TodoSearch from '../todo-list/ui/TodoSearch';

interface FilteredTodoListPage {
	filteredTodoList: TodoListWithFilteredTodos[];
	title?: string;
}

function FilteredTodoListPage({ filteredTodoList, title }: FilteredTodoListPage) {
	const { todos, setTodos } = useTodosStore();
	const { incompleteTodos: sortedTodos } = useTodoDataManagement(todos);

	useEffect(() => {
		const todos: Todo[] = [];
		filteredTodoList.forEach(todoList => {
			if (todoList.filtered_todos) {
				todoList.filtered_todos.forEach(todo => {
					todos.push(todo);
				});
			}
		});
		setTodos(todos);
	}, [filteredTodoList, setTodos]);

	return (
		<div className="w-[98%] h-[calc(100vh-70px)] mx-auto mt-2 overflow-y-scroll overflow-x-hidden">
			<div className="px-5">
				<div className="flex items-center gap-4 my-4">
					<TodoSearch />
					<TodoSort />
					<TodoFilter />
					<LayoutButtons param="smart-list" />
				</div>
				{filteredTodoList.map((todoList, index) => (
					<ExpandableSection
						isEmpty={false}
						title={todoList.title}
						key={todoList.id}
						itemCount={todoList.filtered_todos?.length ?? 0}
						className="mb-4"
					>
						<ul>
							<motion.li key={index} layout variants={itemVariants} initial="initial" animate="animate">
								{title == 'tagged'
									? sortedTodos.map((todo, index) =>
											todo.categories?.every(cat => cat.category_title == todoList.title) ? (
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

export default memo(FilteredTodoListPage);
