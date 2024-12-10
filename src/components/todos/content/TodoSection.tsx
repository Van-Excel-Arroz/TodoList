import { Todo } from '@/types';
import TodoItem from './TodoItem';

interface TodoSectionProps {
	title: string;
	todos: Todo[];
}

export default function TodoSection({ title, todos }: TodoSectionProps) {
	return (
		<div className="py-2 border-b-2">
			<div className="grid grid-cols-12 font-semibold mb-2">
				<p className="col-span-9 ml-12">{title}</p>
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
