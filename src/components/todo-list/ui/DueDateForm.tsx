import Button from '@/components/ui-shared/Button';
import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import { Calendar, CalendarCheck, Trash2 } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import DueTime from '@/components/ui-shared/DueTime';
import DueDateInput from '@/components/ui-shared/DueDateInput';

interface DueDateInputProps {
	dueDate: string | undefined;
	setDueDate: Dispatch<SetStateAction<string | undefined>>;
}

export default function DueDateForm({ dueDate, setDueDate }: DueDateInputProps) {
	const [isDueDateMenuOpen, setIsDueDateMenuOpen] = useState(false);

	return (
		<div className="flex items-center gap-1 text-slate-600">
			<div className="relative">
				<Button ariaLabel="Select Due Date" onClick={() => setIsDueDateMenuOpen(true)}>
					{dueDate ? <CalendarCheck size={20} /> : <Calendar size={20} />}
				</Button>
				<Menu open={isDueDateMenuOpen} onClose={() => setIsDueDateMenuOpen(false)} width="w-44">
					<MenuItem className="border-b border-gray-200 font-bold flex flex-col items-center" clickable={false}>
						<p>Select Due Date</p>
					</MenuItem>
					<MenuItem clickable={false}>
						<DueDateInput dueDate={dueDate} setDueDate={setDueDate} defaultEmptyText={true} />
					</MenuItem>
					<MenuItem clickable={false}>
						<DueTime dueDate={dueDate} setDueDate={setDueDate} defaultEmptyText={true} />
					</MenuItem>
					<MenuItem className="border-t border-slate-300" onClick={() => setDueDate(undefined)}>
						<Trash2 size={16} />
						<p>Clear</p>
					</MenuItem>
				</Menu>
			</div>
		</div>
	);
}
