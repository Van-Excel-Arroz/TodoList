import { updateTodoImportanceAction } from '@/actions/todo-action';
import Importance from '@/components/ui-shared/Importance';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';

export default function TodoImportance({ isImportant }: { isImportant: boolean }) {
	const { selectedTodo } = useSelectedTodoStore();
	const { toggleTodoImportance } = useTodosStore();
	const todoId = selectedTodo?.id ?? 0;

	const handleImportanceChange = async () => {
		await updateTodoImportanceAction(todoId, !isImportant);
		toggleTodoImportance(todoId);
	};

	return (
		<div className="flex items-center gap-2">
			<Importance isImportant={isImportant} handleOnClick={handleImportanceChange} />
			<p>{isImportant ? 'Important' : 'Mark as important'}</p>
		</div>
	);
}
