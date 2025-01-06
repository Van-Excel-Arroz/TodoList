import { updateTodoImportanceAction } from '@/actions/todo-action';
import Importance from '@/components/ui-shared/Importance';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodosStore from '@/context/TodosContext';

export default function TodoImportance({ isImportant }: { isImportant: boolean }) {
	const { selectedTodoId } = useSelectedTodoIdStore();
	const { toggleTodoImportance } = useTodosStore();

	const handleImportanceChange = async () => {
		await updateTodoImportanceAction(selectedTodoId, !isImportant);
		toggleTodoImportance(selectedTodoId);
	};

	return (
		<div className="flex items-center gap-2">
			<Importance isImportant={isImportant} handleOnClick={handleImportanceChange} />
			<p>{isImportant ? 'Important' : 'Mark as important'}</p>
		</div>
	);
}
