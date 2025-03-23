import { Todo } from '@/utils/types';
import TodoSection from './TodoSection';
import { useTodoDataManagement } from '@/hooks/useTodoDataManagement';
import useQueryParams from '@/hooks/useQueryParams';
import TodoForm from './TodoForm';

export default function TodoListView({ todos }: { todos: Todo[] }) {
	const { incompleteTodos, completeTodos } = useTodoDataManagement(todos);
	const { getQueryParam } = useQueryParams();
	const [todolistId] = getQueryParam('id');

	return (
		<div className="mx-4">
			<TodoForm todolistId={Number(todolistId)} />
			<TodoSection title="Todos" todos={incompleteTodos} />
			<TodoSection title="Completed Todos" todos={completeTodos} />
		</div>
	);
}
