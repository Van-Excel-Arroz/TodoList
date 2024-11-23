import { Todo } from '@/types';
import TodoItem from './TodoItem';

interface TodosSectionProps {
	title: string;
	todos: Todo[];
}

export default function TodosSection({ title, todos }: TodosSectionProps) {
	const isTodosEmpty = todos.length > 0;

	return (
		<div className="bg-white px-8 py-4 border rounded-2xl mt-5">
			<div className="grid grid-cols-6 font-semibold mb-4">
				<p className="col-span-4 ml-12">{title}</p>
				<p className="text-center">Due Date</p>
				<p className="text-center">Created In</p>
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
