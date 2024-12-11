import { Todo } from '@/types';
import TodoItem from './TodoItem';
import { ChevronDown } from 'lucide-react';

interface TodoSectionProps {
	title: string;
	todos: Todo[];
}

export default function TodoSection({ title, todos }: TodoSectionProps) {
	return (
		<div className="border-b-2 border-slate-200 py-2">
			<div className="flex items-center">
				<button className="p-1 hover:bg-slate-200 rounded-md">
					<ChevronDown size={20} />
				</button>
				<p className="pl-2 font-semibold">{title}</p>
			</div>

			<ul>
				{todos.map(todo => (
					<li key={todo.id}>
						<TodoItem todo={todo} />
					</li>
				))}
			</ul>
		</div>
	);
}
