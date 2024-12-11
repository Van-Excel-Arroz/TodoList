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
	let disabledButton = todos.length === 0;

	return (
		<div className={`border-b-2 border-slate-200 overflow-hidden py-2 ${isOpen ? 'h-auto  ' : 'h-12'}`}>
			<div className="flex items-center">
				<Button ariaLabel="Toggle Todo Section" onClick={() => setIsOpen(prev => !prev)} disabled={disabledButton}>
					<ChevronDown size={20} />
				</Button>
				<p className="pl-2 font-semibold">{title}</p>
			</div>

			{isOpen && (
				<ul>
					{todos.map(todo => (
						<li key={todo.id}>
							<TodoItem todo={todo} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
