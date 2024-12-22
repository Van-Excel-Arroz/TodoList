'use client';

import DatePicker from '@/components/todo-list/ui/DatePicker';
import { Button } from '@/components/ui-shared/Button';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import { Save } from 'lucide-react';

export default function TodoDueDate({ dueDatetime }: { dueDatetime: string }) {
	const { updateSelectedTodoDueDate } = useSelectedTodoStore();
	const initialDate = dueDatetime ? new Date(dueDatetime) : undefined;
	return (
		<div className="flex items-center justify-between gap-4 bg-slate-100 rounded-md px-4 py-2 border border-slate-300">
			<DatePicker dueDate={initialDate} setDueDate={updateSelectedTodoDueDate} defaultEmptyText={true} />
			<Button ariaLabel="Save Due Date">
				<Save size={18} />
			</Button>
		</div>
	);
}
