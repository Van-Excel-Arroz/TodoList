'use client';

import { Todo } from '@/types';
import TodoItem from './TodoItem';
import { useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '@/utils/framer-motion';
import ExpandableSection from '@/components/sidebar/ui/ExpandableSection';

interface TodoSectionProps {
	title: string;
	todos: Todo[];
}

function TodoSection({ title, todos }: TodoSectionProps) {
	const isTodosEmpty = useMemo(() => todos.length === 0, [todos]);

	return (
		<>
			<ExpandableSection isEmpty={isTodosEmpty} title={title}>
				<ul>
					{todos.map((todo, index) => (
						<motion.li key={index} layout variants={itemVariants} initial="initial" animate="animate">
							<TodoItem todo={todo} />
						</motion.li>
					))}
				</ul>
			</ExpandableSection>
		</>
	);
}

export default memo(TodoSection);
