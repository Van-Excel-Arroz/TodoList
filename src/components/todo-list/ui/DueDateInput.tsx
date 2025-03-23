import Button from '@/components/ui-shared/Button';
import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import { Calendar, CalendarCheck, Trash2 } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import DueTime from '@/components/ui-shared/DueTime';
import DueDate from '@/components/ui-shared/DueDate';

interface DueDateInputProps {
	dueDate: string | undefined;
	setDueDate: Dispatch<SetStateAction<string | undefined>>;
}

export default function DueDateInput({ dueDate, setDueDate }: DueDateInputProps) {
	const [isDueDateMenuOpen, setIsDueDateMenuOpen] = useState(false);

	return (
		<div className="flex items-center gap-1 text-slate-600">
			<div className="relative">
				<Button ariaLabel="Select Due Date" onClick={() => setIsDueDateMenuOpen(true)}>
					{dueDate ? <CalendarCheck size={20} /> : <Calendar size={20} />}
				</Button>
				<Menu
					open={isDueDateMenuOpen}
					onClose={() => setIsDueDateMenuOpen(false)}
					posX="-right-5"
					posXNotch="before:right-7"
					width="w-44"
				>
					<MenuItem className="border-b border-gray-200 font-bold flex flex-col items-center" clickable={false}>
						<p>Select Due Date</p>
					</MenuItem>
					<MenuItem clickable={false}>
						<DueDate dueDate={dueDate} setDueDate={setDueDate} defaultEmptyText={true} />
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
