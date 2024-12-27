import { updateTodoImportanceAction } from '@/actions/todo-action';
import Importance from '@/components/ui-shared/Importance';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';

export default function TodoImportance() {
	const { selectedTodo, toggleSelectedTodoImportance } = useSelectedTodoStore();
	const { toggleTodoImportance } = useTodosStore();
	const isImportant = selectedTodo?.is_important ?? false;

	const handleImportanceChange = async () => {
		if (!selectedTodo) return;
		await updateTodoImportanceAction(selectedTodo.id, !isImportant);
		toggleTodoImportance(selectedTodo.id);
		toggleSelectedTodoImportance(selectedTodo.id);
	};
	return (
		<div className="flex items-center">
			<Importance isImportant={isImportant} handleOnClick={handleImportanceChange} />
		</div>
	);
}
