'use client';

import Button from '@/components/ui-shared/Button';
import { add, format, setHours, setMinutes, setSeconds, startOfToday } from 'date-fns';
import { Calendar, Trash2 } from 'lucide-react';
import { memo, useRef, useState } from 'react';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import Menu from './Menu';
import MenuItem from './MenuItem';
import moment from 'moment';

interface DueDateInputProps {
	dueDate: string | undefined;
	setDueDate: (newDueDate: string | undefined) => void;
	defaultEmptyText?: boolean;
}

function DueDateInput({ dueDate, setDueDate, defaultEmptyText = false }: DueDateInputProps) {
	const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

	const dateMenuTriggerRef = useRef<HTMLButtonElement>(null);
	const datePickerTriggerRef = useRef<HTMLButtonElement>(null);

	return (
		<div className={`flex ${defaultEmptyText && 'py-2'}`}>
			<div className="flex items-center h-4">
				<div className="relative">
					<Button ariaLabel="Add Due Date" ref={dateMenuTriggerRef} onClick={() => setIsDateMenuOpen(prev => !prev)}>
						<Calendar size={20} />
					</Button>
					<DateMenu
						isDateMenuOpen={isDateMenuOpen}
						setDueDate={setDueDate}
						setIsDateMenuOpen={setIsDateMenuOpen}
						setIsDatePickerOpen={setIsDatePickerOpen}
						usePortal={true}
						triggerRef={dateMenuTriggerRef}
					/>
				</div>
				{(defaultEmptyText || dueDate || isDatePickerOpen) && (
					<div className="relative">
						<Button ariaLabel="Due Date" ref={datePickerTriggerRef} onClick={() => setIsDatePickerOpen(prev => !prev)}>
							<p>{dueDate ? format(new Date(dueDate), 'MM/dd/yy') : 'MM/DD/YY'}</p>
						</Button>
						<DatePicker
							isDatePickerOpen={isDatePickerOpen}
							setIsDatePickerOpen={setIsDatePickerOpen}
							dueDate={dueDate}
							setDueDate={setDueDate}
							usePortal={true}
							triggerRef={datePickerTriggerRef}
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
	usePortal?: boolean;
	triggerRef?: React.RefObject<HTMLElement>;
}

const dateLabels = {
	today: `Today (${format(new Date(), 'EEE')})`,
	tomorrow: `Tomorrow (${format(add(new Date(), { days: 1 }), 'EEE')})`,
	'next week': `Next ${format(add(new Date(), { days: 7 }), 'EEEE')}`,
};

function DateMenu({
	isDateMenuOpen,
	setDueDate,
	setIsDatePickerOpen,
	setIsDateMenuOpen,
	usePortal,
	triggerRef,
}: DateMenuProps) {
	const handleSetDate = (date: string) => {
		let baseDate = startOfToday();

		switch (date) {
			case 'tomorrow':
				baseDate = add(new Date(), { days: 1 });
				break;
			case 'next week':
				baseDate = add(new Date(), { days: 7 });
				break;
			case 'clear':
				setDueDate(undefined);
				return;
		}
		const endOfDay = setSeconds(setMinutes(setHours(baseDate, 23), 59), 59);
		setDueDate(endOfDay.toISOString());
	};

	return (
		<Menu
			open={isDateMenuOpen}
			onClose={() => setIsDateMenuOpen(false)}
			posX="-left-5"
			posXNotch="before:left-6"
			width="w-44"
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
	usePortal: boolean;
	triggerRef: React.RefObject<HTMLElement>;
}

function DatePicker({
	isDatePickerOpen,
	setIsDatePickerOpen,
	dueDate,
	setDueDate,
	usePortal,
	triggerRef,
}: DatePickerProps) {
	const handleDateTimeChange = (value: string | moment.Moment) => {
		if (value && moment.isMoment(value)) {
			setDueDate(value.toDate().toISOString());
		}
	};

	return (
		<Menu
			open={isDatePickerOpen}
			onClose={() => setIsDatePickerOpen(false)}
			posX="-left-10"
			posXNotch="before:left-20"
			width="w-fit"
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
