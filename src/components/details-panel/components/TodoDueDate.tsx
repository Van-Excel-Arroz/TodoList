'use client';

import { Button } from '@/components/ui-shared/Button';
import DatePicker from '@/components/ui-shared/DatePicker';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';
import { Save, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TodoDueDateProps {
	dueDatetime: string;
	todoId: number;
}

export default function TodoDueDate({ dueDatetime, todoId }: TodoDueDateProps) {
	const { updateSelectedTodoDueDate } = useSelectedTodoStore();
	const { updateDueDate, deleteDueDate } = useTodosStore();
	const [isChanged, setIsChanged] = useState(false);
	const initialDate = dueDatetime ? new Date(dueDatetime) : undefined;

	const handleOnSubmit = () => {
		if (!initialDate) return;
		updateDueDate(todoId, initialDate.toISOString());
	};
	useEffect(() => {
		setIsChanged(dueDatetime !== initialDate?.toString());
	}, [initialDate]);

	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-between">
				<p className="py-2 text-slate-600">Due Date</p>
				{isChanged && (
					<div className="flex items-center gap-1">
						<Button ariaLabel="Save Due Date" type="submit" onClick={() => handleOnSubmit()}>
							<Save size={18} />
						</Button>
						<Button
							ariaLabel="Cancel Due Date Edit"
							type="submit"
							onClick={() => {
								updateSelectedTodoDueDate(undefined);
								deleteDueDate(todoId);
							}}
						>
							<Trash2 size={18} />
						</Button>
					</div>
				)}
			</div>
			<div className="flex items-center justify-between gap-4 rounded-md px-1 py-2 border bg-white border-slate-300 hover:border-slate-400">
				<DatePicker dueDate={initialDate} setDueDate={updateSelectedTodoDueDate} defaultEmptyText={true} />
			</div>
		</div>
	);
}
