import { updateTodoImportanceAction } from '@/actions/todo-action';
import Importance from '@/components/ui-shared/Importance';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodosStore from '@/context/TodosContext';

interface TodoImportanceProps {
	isImportant: boolean;
	accentColor: string;
}

export default function TodoImportance({ isImportant, accentColor }: TodoImportanceProps) {
	const { selectedTodoId } = useSelectedTodoIdStore();
	const { toggleTodoImportance } = useTodosStore();

	const handleImportanceChange = async () => {
		await updateTodoImportanceAction(selectedTodoId, !isImportant);
		toggleTodoImportance(selectedTodoId);
	};

	return (
		<div className="flex items-center justify-center gap-2 w-1/2 p-2 border border-slate-300 rounded-md">
			<Importance isImportant={isImportant} handleOnClick={handleImportanceChange} accentColor={accentColor} />
			<p>Importance</p>
		</div>
	);
}
