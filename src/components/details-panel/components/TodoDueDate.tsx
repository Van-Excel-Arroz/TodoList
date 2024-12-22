'use client';

import DatePicker from '@/components/todo-list/ui/DatePicker';
import useSelectedTodoStore from '@/context/SelectedTodoContext';

export default function TodoDueDate({ dueDatetime }: { dueDatetime: string }) {
	const { updateSelectedTodoDueDate } = useSelectedTodoStore();
	const initialDate = dueDatetime ? new Date(dueDatetime) : undefined;
	return (
		<div className="flex items-center gap-4 bg-slate-100 rounded-md px-4 py-2 border border-slate-300">
			<DatePicker dueDate={initialDate} setDueDate={updateSelectedTodoDueDate} />
		</div>
	);
}
