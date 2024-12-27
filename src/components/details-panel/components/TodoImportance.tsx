import { updateTodoImportanceAction } from '@/actions/todo-action';
import Importance from '@/components/ui-shared/Importance';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';

export default function TodoImportance() {
	const { selectedTodo, toggleSelectedTodoImportance } = useSelectedTodoStore();
	const { toggleTodoImportance } = useTodosStore();
	const isImportant = selectedTodo?.is_important ?? false;
	const todoId = selectedTodo?.id ?? 0;

	const handleImportanceChange = async () => {
		await updateTodoImportanceAction(todoId, !isImportant);
		toggleTodoImportance(todoId);
		toggleSelectedTodoImportance(todoId);
	};
	return (
		<div className="flex items-center">
			<Importance isImportant={isImportant} handleOnClick={handleImportanceChange} />
			<p>{isImportant ? 'Important' : 'Mark as important'}</p>
		</div>
	);
}
