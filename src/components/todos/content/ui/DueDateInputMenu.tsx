import { Button } from '@/components/ui/Button';
import { add, format, setHours, setMinutes, setSeconds } from 'date-fns';
import { Calendar, CalendarPlus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

interface DueDateInputProps {
	dueDate: Date | undefined;
	setDueDate: (newDueDate: Date | undefined) => void;
}

export default function DueDateInputMenu({ dueDate, setDueDate }: DueDateInputProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
	const [showCustomDatePickerMenu, setShowCustomDatePickerMenu] = useState(false);
	const menuItemStyle = 'hover:bg-slate-200 active:bg-slate-300 p-2 cursor-pointer';
	const notch =
		"before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:border-t before:border-l before:border-gray-300 before:rotate-45";

	const handleSelectMenuInputBlur = (e: React.FocusEvent<HTMLDivElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node)) {
			setIsOpen(false);
		}
	};

	const handleCustomeDatePickerInputBlur = (e: React.FocusEvent<HTMLDivElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node)) {
			setShowCustomDatePicker(false);
		}
	};

	const handleSetDueDate = (date?: 'today' | 'tomorrow' | 'next week') => {
		if (!date) {
			setDueDate(undefined);
			return;
		}
		let baseDate = new Date();

		switch (date) {
			case 'today':
				baseDate = new Date();
				break;
			case 'tomorrow':
				baseDate = add(new Date(), { days: 1 });
				break;
			case 'next week':
				baseDate = add(new Date(), { days: 7 });
				break;
		}
		const endOfDay = setSeconds(setMinutes(setHours(baseDate, 23), 59), 59);
		setDueDate(endOfDay);
	};

	const handleDateTimeChange = (value: string | moment.Moment) => {
		if (typeof value === 'object' && value !== null) {
			const date = value instanceof Date ? value : value.toDate();
			setDueDate(date);
			setIsOpen(false);
		}
	};

	return (
		<>
			<div className="relative flex" onBlur={handleSelectMenuInputBlur} tabIndex={-1}>
				{dueDate || showCustomDatePicker ? (
					<div className="flex items-center py-0">
						<Button
							ariaLabel="Edit Due Date"
							onClick={() => {
								setIsOpen(prev => !prev);
								setShowCustomDatePickerMenu(false);
							}}
						>
							<Calendar size={20} />
						</Button>
						<Button
							ariaLabel="Due Date"
							onClick={() => {
								setShowCustomDatePickerMenu(prev => !prev);
								setIsOpen(false);
							}}
						>
							<p>{dueDate ? format(dueDate, 'MM/dd/yy hh:mm a') : 'MM/DD/YY HH:MM a'}</p>
						</Button>
					</div>
				) : (
					<Button
						ariaLabel="Add Due Date"
						onClick={() => {
							setIsOpen(prev => !prev);
						}}
					>
						<CalendarPlus size={20} />
					</Button>
				)}

				<div
					className={`absolute top-10 -left-4 bg-white text-center text-black text-sm rounded-lg
                    flex flex-col w-44 border border-gray-300 shadow-lg  before:-top-2 before:left-5 ${notch}
                    ${isOpen ? 'block' : 'hidden'}`}
				>
					<p className="border-b border-gray-200 p-2 font-medium">
						{dueDate ? format(dueDate, 'MM/dd/yy hh:mm:ss a') : 'Select Due Date'}
					</p>
					<p className={menuItemStyle} onClick={() => handleSetDueDate('today')}>
						Today ({format(new Date(), 'EEE')})
					</p>
					<p className={menuItemStyle} onClick={() => handleSetDueDate('tomorrow')}>
						Tomorrow ({format(add(new Date(), { days: 1 }), 'EEE')})
					</p>
					<p className={menuItemStyle} onClick={() => handleSetDueDate('next week')}>
						Next {format(add(new Date(), { days: 7 }), 'EEEE')}
					</p>
					<p
						className={menuItemStyle}
						onClick={() => {
							setShowCustomDatePicker(true);
							setShowCustomDatePickerMenu(true);
							setIsOpen(false);
						}}
					>
						Custom
					</p>
					<button
						aria-label="Clear Due Date"
						type="button"
						onClick={() => handleSetDueDate()}
						className={`flex items-center justify-center gap-2 border-t border-slate-300 ${menuItemStyle}`}
					>
						<Trash2 size={16} />
						Clear
					</button>
				</div>

				<div
					className={`absolute top-10 left-0 border border-gray-300 shadow-md rounded-md before:-top-2 before:left-20 bg-white ${notch} ${
						showCustomDatePickerMenu ? 'block' : 'hidden'
					}`}
					onBlur={handleCustomeDatePickerInputBlur}
					tabIndex={-1}
				>
					<div className="relative">
						<DateTime
							value={dueDate}
							open={showCustomDatePickerMenu}
							onChange={handleDateTimeChange}
							closeOnSelect={true}
							input={false}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
