'use client';

import { Todo } from '@/types';
import TodoItem from './TodoItem';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui-shared/Button';
import { useState, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '@/utils/framer-motion';

interface TodoSectionProps {
	title: string;
	todos: Todo[];
}

function TodoSection({ title, todos }: TodoSectionProps) {
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const isTodosEmpty = useMemo(() => todos.length === 0, [todos]);

	return (
		<>
			<div className="flex items-center py-2 px-6 gap-2">
				<Button ariaLabel="Toggle Todo Section" onClick={() => setIsOpen(prev => !prev)} disabled={isTodosEmpty}>
					<div
						className={`transition-transform duration-200 ease-in-out ${isOpen && !isTodosEmpty ? 'rotate-180' : ''}`}
					>
						<ChevronDown size={20} />
					</div>
				</Button>
				<div className="flex items-center w-full">
					<p className="font-semibold mr-3 text-nowrap">{title}</p>
					<hr className="border border-slate-200 w-full" />
				</div>
			</div>

			<motion.div
				className="overflow-hidden"
				initial={{ height: isOpen && !isTodosEmpty ? 'auto' : 0 }}
				animate={{ height: isOpen && !isTodosEmpty ? 'auto' : 0 }}
				transition={{ duration: 0.25 }}
			>
				<ul>
					{todos.map((todo, index) => (
						<motion.li key={index} layout variants={itemVariants} initial="initial" animate="animate">
							<TodoItem todo={todo} />
						</motion.li>
					))}
				</ul>
			</motion.div>
		</>
	);
}

export default memo(TodoSection);
