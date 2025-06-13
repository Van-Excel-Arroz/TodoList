import { format, setHours, setMinutes, startOfToday } from 'date-fns';
import { memo, useState } from 'react';
import Button from './Button';
import { Clock3, Trash2 } from 'lucide-react';
import DateTime from 'react-datetime';
import Menu from './Menu';
import MenuItem from './MenuItem';
import moment from 'moment';

interface DueDateInputProps {
	dueDate: string | undefined;
	setDueDate: (newDueDate: string | undefined) => void;
	defaultEmptyText?: boolean;
}

function DueTimeInput({ dueDate, setDueDate, defaultEmptyText = false }: DueDateInputProps) {
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
					/>
				</div>
				{(defaultEmptyText || dueDate || isTimePickerOpen) && (
					<div className="relative w-18">
						<Button ariaLabel="Due Date" onClick={() => setIsTimePickerOpen(prev => !prev)}>
							<p>{dueDate ? format(new Date(dueDate), 'hh:mm a') : 'HH:MM a'}</p>
						</Button>
						<TimePicker
							isTimePickerOpen={isTimePickerOpen}
							setIsTimePickerOpen={setIsTimePickerOpen}
							dueDate={dueDate}
							setDueDate={setDueDate}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default memo(DueTimeInput);

interface TimeMenuProps {
	isTimeMenuOpen: boolean;
	setIsTimeMenuOpen: (val: boolean) => void;
	setIsTimePickerOpen: (val: boolean) => void;
	dueDate: string | undefined;
	setDueDate: (newDueDate: string | undefined) => void;
}

const timeLabels = {
	morning: 'Morning (09:00 a.m)',
	noon: 'Noon (12:00 p.m)',
	afternoon: 'Afternoon (03:00 p.m)',
	evening: 'Evening (06:00 p.m)',
	night: 'Night (09:00 p.m)',
};

function TimeMenu({ isTimeMenuOpen, setIsTimeMenuOpen, setIsTimePickerOpen, dueDate, setDueDate }: TimeMenuProps) {
	const handleSetTime = (time: string): void => {
		if (time === 'clear') {
			setDueDate(undefined);
			return;
		}

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
		}
		setDueDate(baseDate.toISOString());
	};

	return (
		<Menu open={isTimeMenuOpen} onClose={() => setIsTimeMenuOpen(false)} width="w-48">
			<MenuItem className="border-b border-gray-200 font-bold" clickable={false}>
				<p>Select Due Time</p>
			</MenuItem>

			{Object.entries(timeLabels).map(([label, text]) => (
				<MenuItem key={label} onClick={() => handleSetTime(label)}>
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
			<MenuItem className="border-t border-slate-300 flex justify-center" onClick={() => handleSetTime('clear')}>
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
}

function TimePicker({ isTimePickerOpen, setIsTimePickerOpen, dueDate, setDueDate }: TimePickerProps) {
	const handleDateTimeChange = (value: string | moment.Moment) => {
		if (value && moment.isMoment(value)) {
			setDueDate(value.toDate().toISOString());
		}
	};

	return (
		<Menu open={isTimePickerOpen} onClose={() => setIsTimePickerOpen(false)} width="w-fit">
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
