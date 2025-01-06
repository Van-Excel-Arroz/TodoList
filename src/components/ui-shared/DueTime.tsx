import { format, setHours, setMinutes, startOfToday } from 'date-fns';
import { useState } from 'react';
import { Button } from './Button';
import { Clock3, Trash2 } from 'lucide-react';
import DateTime from 'react-datetime';
import Menu from './Menu';
import MenuItem from './MenuItem';
import moment from 'moment';

interface DueDateInputProps {
	dueDate: string | undefined;
	setDueDate: (newDueDate: string | undefined) => void;
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
							<p>{dueDate ? format(new Date(dueDate), 'hh:mm a') : 'HH:MM a'}</p>
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
	dueDate: string | undefined;
	setDueDate: (newDueDate: string | undefined) => void;
	right?: boolean;
}

const timeLabels = {
	morning: 'Morning (09:00 a.m)',
	noon: 'Noon (12:00 p.m)',
	afternoon: 'Afternoon (03:00 p.m)',
	evening: 'Evening (06:00 p.m)',
	night: 'Night (09:00 p.m)',
};

function TimeMenu({
	isTimeMenuOpen,
	setIsTimeMenuOpen,
	setIsTimePickerOpen,
	dueDate,
	setDueDate,
	right = false,
}: TimeMenuProps) {
	const handleSetTime = (time: string): void => {
		let baseDate = dueDate ? new Date(dueDate) : startOfToday();

		switch (time) {
			case 'morning':
				baseDate = setHours(setMinutes(baseDate, 0), 9);
				break;
			case 'noon':
				baseDate = setHours(setMinutes(baseDate, 0), 12);
				break;
			case 'afternoon':
				baseDate = setHours(setMinutes(baseDate, 0), 15);
				break;
			case 'evening':
				baseDate = setHours(setMinutes(baseDate, 0), 18);
				break;
			case 'night':
				baseDate = setHours(setMinutes(baseDate, 0), 21);
				break;
			case 'clear':
				setDueDate(undefined);
				break;
		}
		setDueDate(baseDate.toISOString());
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

			{Object.entries(timeLabels).map(([label, text]) => (
				<MenuItem onClick={() => handleSetTime(label)}>
					<p>{text}</p>
				</MenuItem>
			))}
			<MenuItem
				onClick={() => {
					setIsTimePickerOpen(true);
					setIsTimeMenuOpen(false);
				}}
			>
				<p>Custom</p>
			</MenuItem>
			<MenuItem className="border-t border-slate-300" onClick={() => handleSetTime('clear')}>
				<Trash2 size={16} />
				<p>Clear</p>
			</MenuItem>
		</Menu>
	);
}

interface TimePickerProps {
	isTimePickerOpen: boolean;
	setIsTimePickerOpen: (val: boolean) => void;
	dueDate: string | undefined;
	setDueDate: (newDueDate: string | undefined) => void;
	right?: boolean;
}

function TimePicker({ isTimePickerOpen, setIsTimePickerOpen, dueDate, setDueDate, right = false }: TimePickerProps) {
	const handleDateTimeChange = (value: string | moment.Moment) => {
		if (value && moment.isMoment(value)) {
			setDueDate(value.toDate().toISOString());
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
					value={dueDate ? new Date(dueDate) : undefined}
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
