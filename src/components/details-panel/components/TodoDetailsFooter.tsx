import useSelectedTodoStore from '@/context/SelectedTodoContext';
import { format } from 'date-fns';

export default function TodoDetailsFooter() {
	const { selectedTodo } = useSelectedTodoStore();
	const creationDate = selectedTodo?.creation_date ?? '';

	return (
		<div className="sticky bottom-0 py-5 border-t border-slate-300  bg-white  w-full  flex items-center justify-between">
			<div className="flex items-center justify-between text-xs text-slate-600 w-full">
				<p>Created: {format(creationDate, 'MMM dd, yyyy')} </p>
				<p>Updated: {format(creationDate, 'MMM dd, yyyy')}</p>
			</div>
		</div>
	);
}
