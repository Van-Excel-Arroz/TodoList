'use client';

import { Todo } from '@/types';
import TodoItem from './TodoItem';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/todo-details-panel/content/TodoTitle';
import { useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import useTodoSectionStore from '@/context/TodoSectionContext';

interface TodoSectionProps {
	title: string;
	todos: Todo[];
}

const itemVariants = {
	initial: {
		opacity: 0,
		x: -20,
		transition: { duration: 0.3, type: 'spring' },
	},
	animate: {
		opacity: 1,
		x: 0,
	},
};

export default function TodoSection({ title, todos }: TodoSectionProps) {
	const params = useParams();
	const todoListId = params.id as string;
	const useTodoSectionStoreForList = useTodoSectionStore(todoListId);
	const { openSections, toggleSection, initializeSectionState } = useTodoSectionStoreForList();
	const isTodosEmpty = useMemo(() => todos.length === 0, [todos]);

	useEffect(() => {
		initializeSectionState(title);
	}, [todoListId, title]);

	const isOpen = openSections[title] ?? true;
	return (
		<div className="overflow-hidden">
			<div className="flex items-center py-2 gap-2">
				<Button ariaLabel="Toggle Todo Section" onClick={() => toggleSection(title)} disabled={isTodosEmpty}>
					<div
						className={`transition-transform duration-200 ease-in-out ${isOpen && !isTodosEmpty ? 'rotate-180' : ''}`}
					>
						<ChevronDown size={20} />
					</div>
				</Button>
				<p className="font-semibold">{title}</p>
			</div>

			<motion.div
				className="overflow-hidden"
				initial={{ height: isOpen && !isTodosEmpty ? 'auto' : 0 }}
				animate={{ height: isOpen && !isTodosEmpty ? 'auto' : 0 }}
				transition={{ duration: 0.25 }}
			>
				<ul>
					{todos.map(todo => (
						<motion.li key={todo.id} layout variants={itemVariants} initial="initial" animate="animate">
							<TodoItem todo={todo} />
						</motion.li>
					))}
				</ul>
			</motion.div>
		</div>
	);
}
