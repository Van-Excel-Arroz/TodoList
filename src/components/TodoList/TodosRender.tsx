import { Todo } from '@/types';
import TodoItem from './TodoItem';

interface TodosRenderProps {
	todos: Todo[];
}

export default function TodosRender({ todos }: TodosRenderProps) {
	const notCompletedTodos = todos.filter(todo => todo.is_completed === false);
	const completedTodos = todos.filter(todo => todo.is_completed === true);

	return (
		<>
			<div className="bg-white px-8 py-4 border rounded-2xl">
				<div className="grid grid-cols-6 font-semibold mb-4">
					<p className="col-span-4 ml-12">Todos</p>
					<p className="text-center">Due Date</p>
					<p className="text-center">Created In</p>
				</div>
				<ul>
					{notCompletedTodos.map(todo => (
						<li>
							<TodoItem todo={todo} />
						</li>
					))}
				</ul>
			</div>

			<div className="bg-white px-8 py-4 border rounded-2xl mt-10">
				<div className="grid grid-cols-6 font-semibold mb-4">
					<p className="col-span-4 ml-12">Completed Todos</p>
					<p className="text-center">Due Date</p>
					<p className="text-center">Created In</p>
				</div>
				<ul>
					{completedTodos.map(todo => (
						<li>
							<TodoItem todo={todo} />
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
