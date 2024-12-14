import { Todo } from '@/types';
import TodoSection from './TodoSection';

interface TodoListViewProps {
	todos: Todo[];
}

export default function TodoListView({ todos }: TodoListViewProps) {
	const incompletedTodos = todos.filter(todo => !todo.is_completed);
	const completedTodos = todos.filter(todo => todo.is_completed);

	return (
		<div>
			<TodoSection title="Todos" todos={incompletedTodos} />
			<TodoSection title="Completed Todos" todos={completedTodos} />
		</div>
	);
}
