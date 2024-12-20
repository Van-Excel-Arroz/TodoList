import { Button } from '@/components/ui/Button';
import { add, format, isToday, isTomorrow } from 'date-fns';
import { Calendar, CalendarPlus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface DueDateInputProps {
	handleSetDueDate: (date?: 'today' | 'tomorrow' | 'next week') => void;
	dueDate: Date | undefined;
}

export default function DueDateInputMenu({ handleSetDueDate, dueDate }: DueDateInputProps) {
	const [isOpen, setIsOpen] = useState(false);
	const menuItemStyle = 'hover:bg-slate-200 active:bg-slate-300 p-2 cursor-pointer';

	const handleInputBlur = (e: React.FocusEvent<HTMLDivElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node)) {
			setIsOpen(false);
		}
	};

	const handleDateFormat = (date: Date) => {
		if (isToday(date)) return format(date, "'Today at' h:mm a");
		if (isTomorrow(date)) return format(date, "'Tomorrow at' h:mm a");
		return format(date, "EEE, MMMM d 'at' h:mm a");
	};

	return (
		<div className="relative flex" onBlur={handleInputBlur} tabIndex={-1}>
			<Button ariaLabel="Add Due Date" onClick={() => setIsOpen(prev => !prev)}>
				{dueDate ? (
					<p className="text-sm flex items-center gap-2">
						<Calendar size={18} /> {handleDateFormat(dueDate)}
					</p>
				) : (
					<CalendarPlus size={18} />
				)}
			</Button>

			<div
				className={`absolute top-10 -left-4 bg-white text-center text-black text-sm rounded-lg 
    flex flex-col w-44 border border-gray-300 shadow-lg
    before:content-[''] before:absolute before:-top-2 before:left-5 before:w-4 before:h-4 
    before:bg-white before:border-t before:border-l before:border-gray-300 before:rotate-45
    ${isOpen ? 'block' : 'hidden'}`}
			>
				<p className="border-b border-gray-200 p-2 font-medium">
					{dueDate ? format(dueDate, 'MM/dd/yy hh:mm:ss a') : 'Select Due Date'}
				</p>
				<p className={menuItemStyle} onClick={() => handleSetDueDate('today')}>
					Today ({format(new Date(), 'EEE')})
				</p>
				<p className={menuItemStyle} onClick={() => handleSetDueDate('tomorrow')}>
					Tommorow ({format(add(new Date(), { days: 1 }), 'EEE')})
				</p>
				<p className={menuItemStyle} onClick={() => handleSetDueDate('next week')}>
					Next {format(add(new Date(), { days: 7 }), 'EEEE')}
				</p>
				<p className={menuItemStyle}>Custom</p>

				<button
					aria-label="Clear Due Date"
					type="button"
					onClick={() => handleSetDueDate()}
					className={`flex items-center justify-center gap-2 border-t border-slate-300 ${menuItemStyle}`}
				>
					<Trash2 size={16} />
					<p>Clear</p>
				</button>
			</div>
		</div>
	);
}
