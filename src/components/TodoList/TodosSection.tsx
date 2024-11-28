import { Todo } from '@/types';
import TodoItem from './TodoItem/TodoItem';

interface TodosSectionProps {
	title: string;
	todos: Todo[];
}

export default function TodosSection({ title, todos }: TodosSectionProps) {
	return (
		<div className="bg-white px-8 py-4 border rounded-2xl mt-5">
			<div className="grid grid-cols-12 font-semibold">
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
