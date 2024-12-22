'use client';

import DatePicker from '@/components/todo-list/ui/DatePicker';
import DueDate from '@/components/todo-list/ui/DueDate';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import { Calendar } from 'lucide-react';

export default function TodoDueDate({ dueDatetime }: { dueDatetime: string }) {
	const { updateSelectedTodoDueDate } = useSelectedTodoStore();
	return (
		<div className="flex items-center gap-4 bg-slate-100 rounded-md px-4 py-2 border border-slate-300">
			<div className="flex flex-col justify-start">
				<div className="text-slate-600 flex items-center gap-2 py-1">
					<Calendar size={16} />
					<p className="text-sm">Due</p>
				</div>
				{dueDatetime ? (
					<div>
						<DueDate dueDatetime={dueDatetime ?? ''} textSize="base" />
						<DatePicker dueDate={new Date(dueDatetime)} setDueDate={updateSelectedTodoDueDate} />
					</div>
				) : (
					<p className="text-slate-600">MM/DD/YYYY</p>
				)}
			</div>
		</div>
	);
}
