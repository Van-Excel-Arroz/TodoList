'use client';

import { Todo } from '@/utils/types';
import TodoItem from '../../ui-shared/TodoItem';
import { useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '@/utils/framer-motion';
import ExpandableSection from '@/components/ui-shared/ExpandableSection';

interface TodoSectionProps {
	title: string;
	todos: Todo[];
	accentColor: string;
}

function TodoSection({ title, todos, accentColor }: TodoSectionProps) {
	const isTodosEmpty = useMemo(() => todos.length === 0, [todos]);

	return (
		<ExpandableSection
			isEmpty={isTodosEmpty}
			title={title}
			titleClass="font-bold text-lg"
			className="mb-4"
			itemCount={todos.length}
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
