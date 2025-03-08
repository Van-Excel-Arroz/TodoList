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
}

function FilteredTodosPage({ filteredTodos }: FilteredTodosPage) {
	const { todos, setTodos } = useTodosStore();
	const { incompleteTodos } = useTodoDataManagement(todos);
	console.log(todos);

	useEffect(() => {
		const todos: Todo[] = [];
		filteredTodos.map(todoList => todoList.filteredTodos && todoList.filteredTodos.map(todo => todos.push(todo)));
		setTodos(todos);
	}, [filteredTodos, setTodos]);

	return (
		<div className="w-[98%] h-[calc(100vh-100px)] mx-auto mt-3 overflow-y-scroll overflow-x-hidden">
			<div className="px-5">
				{filteredTodos.map((todoList, index) => (
					<ExpandableSection isEmpty={false} title={todoList.title} key={todoList.id}>
						<ul>
							<motion.li key={index} layout variants={itemVariants} initial="initial" animate="animate">
								{incompleteTodos.map((todo, index) => (
									<TodoItem todo={todo} key={index} />
								))}
							</motion.li>
						</ul>
					</ExpandableSection>
				))}
			</div>
		</div>
	);
}

export default memo(FilteredTodosPage);
