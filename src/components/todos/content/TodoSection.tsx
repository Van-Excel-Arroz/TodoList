'use client';

import { Todo } from '@/types';
import TodoItem from './TodoItem';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/todo-details-panel/content/TodoTitle';
import { useState } from 'react';

interface TodoSectionProps {
	title: string;
	todos: Todo[];
}

export default function TodoSection({ title, todos }: TodoSectionProps) {
	const [isOpen, setIsOpen] = useState(false);
	let isTodosEmpty = todos.length === 0;

	return (
		<div className={`border-b-2 border-slate-200 overflow-hidden transition-all duration-200 ease-in-out`}>
			<div className="flex items-center py-2">
				<Button ariaLabel="Toggle Todo Section" onClick={() => setIsOpen(prev => !prev)} disabled={isTodosEmpty}>
					<div className={`${isOpen && !isTodosEmpty && 'rotate-180'}`}>
						<ChevronDown size={20} />
					</div>
				</Button>
				<p className="pl-2 font-semibold">{title}</p>
			</div>

			<ul className={`${isOpen ? 'block' : 'hidden'}`}>
				{todos.map(todo => (
					<li key={todo.id}>
						<TodoItem todo={todo} />
					</li>
				))}
			</ul>
		</div>
	);
}
