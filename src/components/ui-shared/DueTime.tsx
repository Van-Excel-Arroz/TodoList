import { format, setHours, setMinutes, startOfToday } from 'date-fns';
import { useState } from 'react';
import { Button } from './Button';
import { Clock3, Trash2 } from 'lucide-react';
import DateTime from 'react-datetime';
import Menu from './Menu';
import MenuItem from './MenuItem';

interface DueDateInputProps {
	dueDate: Date | undefined;
	setDueDate: (newDueDate: Date | undefined) => void;
	defaultEmptyText?: boolean;
	right?: boolean;
}

export default function DueTime({ dueDate, setDueDate, defaultEmptyText = false, right = false }: DueDateInputProps) {
	const [isTimeMenuOpen, setIsTimeMenuOpen] = useState(false);
	const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

	return (
		<div className={`flex ${defaultEmptyText && 'py-2'}`}>
			<div className="flex items-center h-4">
				<div className="relative">
					<Button ariaLabel="Edit Time">
						<Clock3 size={20} onClick={() => setIsTimeMenuOpen(prev => !prev)} />
					</Button>
					<TimeMenu
						isTimeMenuOpen={isTimeMenuOpen}
						setIsTimeMenuOpen={setIsTimeMenuOpen}
						setIsTimePickerOpen={setIsTimePickerOpen}
						dueDate={dueDate}
						setDueDate={setDueDate}
						right={right}
					/>
				</div>
				{(defaultEmptyText || dueDate || isTimePickerOpen) && (
					<div className="relative">
						<Button ariaLabel="Due Date" onClick={() => setIsTimePickerOpen(prev => !prev)}>
							<p>{dueDate ? format(dueDate, 'hh:mm a') : 'HH:MM a'}</p>
						</Button>
						<TimePicker
							isTimePickerOpen={isTimePickerOpen}
							setIsTimePickerOpen={setIsTimePickerOpen}
							dueDate={dueDate}
							setDueDate={setDueDate}
							right={right}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

interface TimeMenuProps {
	isTimeMenuOpen: boolean;
	setIsTimeMenuOpen: (val: boolean) => void;
	setIsTimePickerOpen: (val: boolean) => void;
	dueDate: Date | undefined;
	setDueDate: (newDueDate: Date | undefined) => void;
	right?: boolean;
}

function TimeMenu({
	isTimeMenuOpen,
	setIsTimeMenuOpen,
	setIsTimePickerOpen,
	dueDate,
	setDueDate,
	right = false,
}: TimeMenuProps) {
	const handleSetTime = (time: string) => {
		const baseDate = dueDate ? new Date(dueDate) : startOfToday();

		switch (time) {
			case 'morning':
				setDueDate(setHours(setMinutes(baseDate, 0), 9));
				break;
			case 'noon':
				setDueDate(setHours(setMinutes(baseDate, 0), 12));
				break;
			case 'afternoon':
				setDueDate(setHours(setMinutes(baseDate, 0), 15));
				break;
			case 'evening':
				setDueDate(setHours(setMinutes(baseDate, 0), 18));
				break;
			case 'night':
				setDueDate(setHours(setMinutes(baseDate, 0), 21));
				break;
			case 'clear':
				setDueDate(undefined);
				break;
		}
	};

	return (
		<Menu
			open={isTimeMenuOpen}
			onClose={() => setIsTimeMenuOpen(false)}
			posX={`${right ? '-right-5' : '-left-5'}`}
			posXNotch={`${right ? 'before:right-6' : 'before:left-6'}`}
			width="w-44"
		>
			<MenuItem className="border-b border-gray-200 font-bold" clickable={false}>
				<p>Select Due Time</p>
			</MenuItem>
			<MenuItem onClick={() => handleSetTime('morning')}>
				<p>Morning (09:00 a.m)</p>
			</MenuItem>
			<MenuItem onClick={() => handleSetTime('noon')}>
				<p>Noon (12:00 p.m)</p>
			</MenuItem>
			<MenuItem onClick={() => handleSetTime('afternoon')}>
				<p>Afternoon (03:00 p.m)</p>
			</MenuItem>
			<MenuItem onClick={() => handleSetTime('evening')}>
				<p>Evening (06:00 p.m)</p>
			</MenuItem>
			<MenuItem onClick={() => handleSetTime('night')}>
				<p>Evening (09:00 p.m)</p>
			</MenuItem>
			<MenuItem
				onClick={() => {
					setIsTimePickerOpen(true);
					setIsTimeMenuOpen(false);
				}}
			>
				<p>Custom</p>
			</MenuItem>
			<MenuItem className="border-t border-slate-300" onClick={() => handleSetTime('clear')}>
				<button aria-label="Clear Due Date" type="button" className="w-full flex justify-center gap-1">
					<Trash2 size={16} />
					<p>Clear</p>
				</button>
			</MenuItem>
		</Menu>
	);
}

interface TimePickerProps {
	isTimePickerOpen: boolean;
	setIsTimePickerOpen: (val: boolean) => void;
	dueDate: Date | undefined;
	setDueDate: (newDueDate: Date | undefined) => void;
	right?: boolean;
}

function TimePicker({ isTimePickerOpen, setIsTimePickerOpen, dueDate, setDueDate, right = false }: TimePickerProps) {
	const handleDateTimeChange = (value: string | moment.Moment) => {
		if (typeof value === 'object' && value !== null) {
			const date = value instanceof Date ? value : value.toDate();
			setDueDate(date);
		}
	};

	return (
		<Menu
			open={isTimePickerOpen}
			onClose={() => setIsTimePickerOpen(false)}
			posX={`${right ? '-right-5' : '-left-5'}`}
			posXNotch={`${right ? 'before:right-14' : 'before:left-10'}`}
			width="w-fit"
		>
			<div className="relative">
				<DateTime
					value={dueDate}
					open={isTimePickerOpen}
					onChange={handleDateTimeChange}
					closeOnSelect={true}
					input={false}
					dateFormat={false}
					timeFormat={true}
				/>
			</div>
		</Menu>
	);
}
