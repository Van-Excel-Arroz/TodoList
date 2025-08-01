import { updateTodoImportanceAction } from '@/actions/todo-action';
import Importance from '@/components/ui-shared/Importance';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodosStore from '@/context/TodosContext';
import toast from 'react-hot-toast';

interface TodoImportanceProps {
	isImportant: boolean;
	accentColor: string;
}

export default function TodoImportance({ isImportant, accentColor }: TodoImportanceProps) {
	const { selectedTodoId } = useSelectedTodoIdStore();
	const { toggleTodoImportance } = useTodosStore();

	const handleImportanceChange = async () => {
		toggleTodoImportance(selectedTodoId);
		const result = await updateTodoImportanceAction(selectedTodoId, !isImportant);

		if (!result.success) {
			toggleTodoImportance(selectedTodoId);
			toast.error(result.message);
		}
	};

	return (
		<div className="flex items-center justify-center gap-2 w-1/2 p-2 border border-slate-300 rounded-md ring-offset-2 ring-slate-400 hover:ring-2">
			<Importance isImportant={isImportant} handleOnClick={handleImportanceChange} accentColor={accentColor} />
			<p>Important</p>
		</div>
	);
}
