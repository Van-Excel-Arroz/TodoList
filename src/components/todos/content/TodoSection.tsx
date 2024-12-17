'use client';

import { Todo } from '@/types';
import TodoItem from './TodoItem';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/todo-details-panel/content/TodoTitle';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface TodoSectionProps {
	title: string;
	todos: Todo[];
}

export default function TodoSection({ title, todos }: TodoSectionProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	let isTodosEmpty = todos.length === 0;

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

			<div
				className={`
            transition-all duration-300 ease-in-out 
            overflow-hidden 
            ${isOpen && !isTodosEmpty ? 'h-auto' : 'max-h-0'}
        `}
			>
				<motion.ul>
					{todos.map(todo => (
						<motion.li
							key={todo.id}
							layout
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
						>
							<TodoItem todo={todo} />
						</motion.li>
					))}
				</motion.ul>
			</div>
		</div>
	);
}
