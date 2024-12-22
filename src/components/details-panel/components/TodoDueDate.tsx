'use client';

import DatePicker from '@/components/todo-list/ui/DatePicker';
import { Button } from '@/components/ui-shared/Button';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';
import { Save } from 'lucide-react';

interface TodoDueDateProps {
	dueDatetime: string;
	todoId: number;
}

export default function TodoDueDate({ dueDatetime, todoId }: TodoDueDateProps) {
	const { updateSelectedTodoDueDate } = useSelectedTodoStore();
	const { updateDueDate } = useTodosStore();
	const initialDate = dueDatetime ? new Date(dueDatetime) : undefined;

	const handleOnSubmit = () => {
		if (!initialDate) return;
		updateDueDate(todoId, initialDate.toISOString());
	};

	return (
		<div className="flex items-center justify-between gap-4 bg-slate-100 rounded-md px-4 py-2 border border-slate-300">
			<DatePicker dueDate={initialDate} setDueDate={updateSelectedTodoDueDate} defaultEmptyText={true} />
			<Button ariaLabel="Save Due Date" type="submit">
				<Save size={18} />
			</Button>
		</div>
	);
}
