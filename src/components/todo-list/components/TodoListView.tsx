import { Todo } from '@/utils/types';
import TodoSection from './TodoSection';
import { useTodoDataManagement } from '@/hooks/useTodoDataManagement';

export default function TodoListView({ todos }: { todos: Todo[] }) {
	const { incompleteTodos, completeTodos } = useTodoDataManagement(todos);

	return (
		<div className="mx-4">
			<TodoSection title="Todos" todos={incompleteTodos} />
			<TodoSection title="Completed Todos" todos={completeTodos} />
		</div>
	);
}
