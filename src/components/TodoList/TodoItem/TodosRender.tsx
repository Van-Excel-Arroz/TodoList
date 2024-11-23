import { Todo } from '@/types';
import TodosSection from './TodosSection';

interface TodosRenderProps {
	todos: Todo[];
}

export default function TodosRender({ todos }: TodosRenderProps) {
	const incompletedTodos: Todo[] = [];
	const completedTodos: Todo[] = [];
	const isTodosEmpty = todos.length > 0;

	for (const todo of todos) {
		if (todo.is_completed) {
			completedTodos.push(todo);
		} else {
			incompletedTodos.push(todo);
		}
	}

	return (
		<>
			{isTodosEmpty ? (
				<div>
					<TodosSection title="Todos" todos={incompletedTodos} />
					<TodosSection title="Completed Todos" todos={completedTodos} />
				</div>
			) : (
				<p className="text-center">No Todos Available.</p>
			)}
		</>
	);
}
