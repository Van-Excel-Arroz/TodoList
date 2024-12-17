'use client';

import { Todo } from '@/types';
import TodoItem from './TodoItem';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/todo-details-panel/content/TodoTitle';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TodoSectionProps {
	title: string;
	todos: Todo[];
}

const itemVariants = {
	initial: {
		opacity: 0,
		x: -20,
	},
	animate: {
		opacity: 1,
		x: 0,
	},
	exit: {
		opacity: 0,
		x: -20,
	},
};

export default function TodoSection({ title, todos }: TodoSectionProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const isTodosEmpty = useMemo(() => todos.length === 0, [todos]);

	return (
		<div className={`border-b-2 border-slate-200 overflow-hidden`}>
			<div className="flex items-center py-2 gap-2">
				<Button ariaLabel="Toggle Todo Section" onClick={() => setIsOpen(prev => !prev)} disabled={isTodosEmpty}>
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
				transition={{ duration: 0.3 }}
			>
				<ul className="space-y-2 mb-2">
					<AnimatePresence mode="popLayout" initial={false}>
						{todos.map(todo => (
							<motion.li key={todo.id} layout variants={itemVariants} initial="initial" animate="animate" exit="exit">
								<TodoItem todo={todo} />
							</motion.li>
						))}
					</AnimatePresence>
				</ul>
			</motion.div>
		</div>
	);
}
