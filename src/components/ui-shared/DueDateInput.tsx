'use client';

import Button from '@/components/ui-shared/Button';
import { add, format, setHours, setMinutes, setSeconds, startOfToday } from 'date-fns';
import { Calendar, Trash2 } from 'lucide-react';
import { memo, useState } from 'react';
import DateTime from 'react-datetime';
import Menu from './Menu';
import MenuItem from './MenuItem';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';

interface DueDateInputProps {
	dueDate: string | undefined;
	setDueDate: (newDueDate: string | undefined) => void;
	defaultEmptyText?: boolean;
}

function DueDateInput({ dueDate, setDueDate, defaultEmptyText = false }: DueDateInputProps) {
	const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

	return (
		<div className={`flex ${defaultEmptyText && 'py-2'}`}>
			<div className="flex items-center h-4 gap-1">
				<div className="relative">
					<Button ariaLabel="Add Due Date" onClick={() => setIsDateMenuOpen(prev => !prev)}>
						<Calendar size={20} />
					</Button>
					<DateMenu
						isDateMenuOpen={isDateMenuOpen}
						setDueDate={setDueDate}
						setIsDateMenuOpen={setIsDateMenuOpen}
						setIsDatePickerOpen={setIsDatePickerOpen}
					/>
				</div>
				{(defaultEmptyText || dueDate || isDatePickerOpen) && (
					<div className="relative">
						<Button ariaLabel="Due Date" onClick={() => setIsDatePickerOpen(prev => !prev)}>
							<p>{dueDate ? format(new Date(dueDate), 'MM/dd/yy') : 'MM/DD/YY'}</p>
						</Button>
						<DatePicker
							isDatePickerOpen={isDatePickerOpen}
							setIsDatePickerOpen={setIsDatePickerOpen}
							dueDate={dueDate}
							setDueDate={setDueDate}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default memo(DueDateInput);

interface DateMenuProps {
	isDateMenuOpen: boolean;
	setDueDate: (newDueDate: string | undefined) => void;
	setIsDatePickerOpen: (vaL: boolean) => void;
	setIsDateMenuOpen: (val: boolean) => void;
}

const dateLabels = {
	today: `Today (${format(new Date(), 'EEE')})`,
	tomorrow: `Tomorrow (${format(add(new Date(), { days: 1 }), 'EEE')})`,
	'next week': `Next ${format(add(new Date(), { days: 7 }), 'EEEE')}`,
};

function DateMenu({ isDateMenuOpen, setDueDate, setIsDatePickerOpen, setIsDateMenuOpen }: DateMenuProps) {
	const handleSetDate = (date: string) => {
		if (date === 'clear') {
			setDueDate(undefined);
			return;
		}

		let baseDate = startOfToday();

		switch (date) {
			case 'tomorrow':
				baseDate = add(new Date(), { days: 1 });
				break;
			case 'next week':
				baseDate = add(new Date(), { days: 7 });
				break;
		}
		const endOfDay = setSeconds(setMinutes(setHours(baseDate, 23), 59), 59);
		setDueDate(endOfDay.toISOString());
	};

	return (
		<Menu
			open={isDateMenuOpen}
			onClose={() => setIsDateMenuOpen(false)}
			width="w-44"
			horizontalPosition="-left-[30px]"
			verticalPosition="top-[50px]"
		>
			<MenuItem className="border-b border-gray-200 font-bold" clickable={false}>
				<p>Select Due Date</p>
			</MenuItem>
			{Object.entries(dateLabels).map(([label, text]) => (
				<MenuItem key={label} onClick={() => handleSetDate(label)}>
					<p>{text}</p>
				</MenuItem>
			))}
			<MenuItem
				onClick={() => {
					setIsDatePickerOpen(true);
					setIsDateMenuOpen(false);
				}}
			>
				<p>Custom</p>
			</MenuItem>
			<MenuItem className="border-t border-slate-300" onClick={() => handleSetDate('clear')}>
				<button aria-label="Clear Due Date" type="button" className="w-full flex justify-center gap-2">
					<Trash2 size={16} />
					<p>Clear</p>
				</button>
			</MenuItem>
		</Menu>
	);
}

interface DatePickerProps {
	isDatePickerOpen: boolean;
	setIsDatePickerOpen: (val: boolean) => void;
	dueDate: string | undefined;
	setDueDate: (newDueDate: string | undefined) => void;
}

function DatePicker({ isDatePickerOpen, setIsDatePickerOpen, dueDate, setDueDate }: DatePickerProps) {
	const handleDateTimeChange = (value: string | moment.Moment) => {
		if (value && moment.isMoment(value)) {
			setDueDate(value.toDate().toISOString());
		}
	};

	return (
		<Menu
			open={isDatePickerOpen}
			onClose={() => setIsDatePickerOpen(false)}
			width="w-fit"
			horizontalPosition="top-[50px]"
			verticalPosition="left-[68px]"
		>
			<div className="relative">
				<DateTime
					value={dueDate ? new Date(dueDate) : undefined}
					open={isDatePickerOpen}
					onChange={handleDateTimeChange}
					input={false}
					dateFormat={true}
					timeFormat={false}
				/>
			</div>
		</Menu>
	);
}
