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
		<div className="flex items-center justify-center gap-2 w-1/2 p-2 border border-slate-300 rounded-md">
			<Importance isImportant={isImportant} handleOnClick={handleImportanceChange} />
			<p>Importance</p>
		</div>
	);
}
