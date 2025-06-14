import { Todo } from '@/utils/types';
import TodoSection from './TodoSection';
import { useTodoDataManagement } from '@/hooks/useTodoDataManagement';
import TodoForm from './TodoForm';
import TodoSearch from '../ui/TodoSearch';
import TodoSort from './TodoSort';
import TodoFilter from './TodoFilter';
import LayoutButtons from '@/components/ui-shared/LayoutButtons';

export default function TodoListView({ todos }: { todos: Todo[] }) {
	const { incompleteTodos, completeTodos } = useTodoDataManagement(todos);

	return (
		<div className="mx-4 mt-4">
			<div className="flex items-center gap-4 w-full">
				<TodoSearch />
				<TodoSort />
				<TodoFilter />
				<LayoutButtons param="id" />
			</div>
			<TodoForm />
			<TodoSection title="Todos" todos={incompleteTodos} />
			<TodoSection title="Completed Todos" todos={completeTodos} />
		</div>
	);
}
