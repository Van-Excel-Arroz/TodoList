import { Todo } from '@/utils/types';
import TodoSection from './TodoSection';
import { useTodoDataManagement } from '@/hooks/useTodoDataManagement';
import useQueryParams from '@/hooks/useQueryParams';
import TodoForm from './TodoForm';
import useTodoListsStore from '@/context/TodoListsContext';

export default function TodoListView({ todos }: { todos: Todo[] }) {
	const { incompleteTodos, completeTodos } = useTodoDataManagement(todos);
	const { getQueryParam } = useQueryParams();
	const [todolistId] = getQueryParam('id');
	const { getTodoListById } = useTodoListsStore();
	const todolist = getTodoListById(Number(todolistId));
	const accentColor = todolist?.settings?.appearance.accent ?? '#6b7280';

	return (
		<div className="mx-4">
			<TodoForm todolistId={Number(todolistId)} accentColor={accentColor} />
			<TodoSection title="Todos" todos={incompleteTodos} accentColor={accentColor} />
			<TodoSection title="Completed Todos" todos={completeTodos} accentColor={accentColor} />
		</div>
	);
}
