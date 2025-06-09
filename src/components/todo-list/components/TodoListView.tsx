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
	const { getTodoListSettingValue } = useTodoListsStore();
	const accentColor = getTodoListSettingValue('appearance', 'accent', Number(todolistId));
	const dueDateFormat = getTodoListSettingValue('behavior', 'dueDateFormat', Number(todolistId));
	const newTasksPosition = getTodoListSettingValue('behavior', 'newTasksPosition', Number(todolistId));

	return (
		<div className="mx-4">
			<TodoForm todolistId={Number(todolistId)} newTasksPosition={newTasksPosition ?? ''} />
			<TodoSection
				title="Todos"
				todos={incompleteTodos}
				accentColor={accentColor ?? ''}
				dueDateFormat={dueDateFormat ?? ''}
			/>
			<TodoSection
				title="Completed Todos"
				todos={completeTodos}
				accentColor={accentColor ?? ''}
				dueDateFormat={dueDateFormat ?? ''}
			/>
		</div>
	);
}
