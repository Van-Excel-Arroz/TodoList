'use client';

import { Todo } from '@/utils/types';
import TodoItem from '../../ui-shared/TodoItem';
import { useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '@/utils/framer-motion';
import ExpandableSection from '@/components/ui-shared/ExpandableSection';
import useQueryParams from '@/hooks/useQueryParams';
import useTodoListsStore from '@/context/TodoListsContext';

interface TodoSectionProps {
	title: string;
	todos: Todo[];
}

function TodoSection({ title, todos }: TodoSectionProps) {
	const isTodosEmpty = useMemo(() => todos.length === 0, [todos]);
	const { getQueryParam } = useQueryParams();
	const [view] = getQueryParam('view');
	const [id] = getQueryParam('id');
	const { getTodoListById } = useTodoListsStore();
	const todolist = getTodoListById(Number(id));
	const accentColor = todolist?.settings?.appearance.accent ?? '#6b7280';

	return (
		<ExpandableSection
			isEmpty={isTodosEmpty}
			title={title}
			titleClass="font-bold text-lg"
			className="mb-4 pt-2"
			itemCount={todos.length}
			view={view}
			accentColor={accentColor}
		>
			<ul>
				{todos.map((todo, index) => (
					<motion.li key={index} layout variants={itemVariants} initial="initial" animate="animate">
						<TodoItem todo={todo} accentColor={accentColor} />
					</motion.li>
				))}
			</ul>
		</ExpandableSection>
	);
}

export default memo(TodoSection);
