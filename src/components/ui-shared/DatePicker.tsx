import { Button } from '@/components/ui-shared/Button';
import { add, format, setHours, setMinutes, setSeconds } from 'date-fns';
import { Calendar, CalendarPlus, Trash2 } from 'lucide-react';
import { useState, useEffect, useRef, RefObject } from 'react';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import Menu from './Menu';

interface DueDateInputProps {
	dueDate: Date | undefined;
	setDueDate: (newDueDate: Date | undefined) => void;
	defaultEmptyText?: boolean;
}

export default function DatePicker({ dueDate, setDueDate, defaultEmptyText = false }: DueDateInputProps) {
	const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

	return (
		<div className={`flex ${defaultEmptyText && 'py-2'}`}>
			<div className="flex items-center h-4">
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
							<p>{dueDate ? format(dueDate, 'MM/dd/yy') : 'MM/DD/YY'}</p>
						</Button>
						<DatePickers
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

interface DateMenuProps {
	isDateMenuOpen: boolean;
	setDueDate: (newDueDate: Date | undefined) => void;
	setIsDatePickerOpen: (vaL: boolean) => void;
	setIsDateMenuOpen: (val: boolean) => void;
}

function DateMenu({ isDateMenuOpen, setDueDate, setIsDatePickerOpen, setIsDateMenuOpen }: DateMenuProps) {
	const DateMenuRef = useRef<HTMLDivElement>(null);
	const menuItemStyle = 'hover:bg-slate-200 active:bg-slate-300 p-2 cursor-pointer';

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (isDateMenuOpen && DateMenuRef.current && !DateMenuRef.current.contains(event.target as Node)) {
				setIsDateMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isDateMenuOpen, setIsDateMenuOpen]);

	const handleSetDate = (date: string) => {
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
			case 'clear':
				setDueDate(undefined);
				return;
		}
		const endOfDay = setSeconds(setMinutes(setHours(baseDate, 23), 59), 59);
		setDueDate(endOfDay);
	};

	return (
		<Menu ref={DateMenuRef} open={isDateMenuOpen} leftNotch={5} posLeft={5}>
			<p className="border-b border-gray-200 p-2 font-medium">Select Due Date</p>
			<p className={menuItemStyle} onClick={() => handleSetDate('today')}>
				Today ({format(new Date(), 'EEE')})
			</p>
			<p className={menuItemStyle} onClick={() => handleSetDate('tomorrow')}>
				Tomorrow ({format(add(new Date(), { days: 1 }), 'EEE')})
			</p>
			<p className={menuItemStyle} onClick={() => handleSetDate('next week')}>
				Next {format(add(new Date(), { days: 7 }), 'EEEE')}
			</p>
			<p
				className={menuItemStyle}
				onClick={() => {
					setIsDatePickerOpen(true);
					setIsDateMenuOpen(false);
				}}
			>
				Custom
			</p>
			<button
				aria-label="Clear Due Date"
				type="button"
				onClick={() => handleSetDate('clear')}
				className={`flex items-center justify-center gap-2 border-t border-slate-300 ${menuItemStyle}`}
			>
				<Trash2 size={16} />
				Clear
			</button>
		</Menu>
	);
}

interface DatePickersProps {
	isDatePickerOpen: boolean;
	setIsDatePickerOpen: (val: boolean) => void;
	dueDate: Date | undefined;
	setDueDate: (newDueDate: Date | undefined) => void;
}

function DatePickers({ isDatePickerOpen, setIsDatePickerOpen, dueDate, setDueDate }: DatePickersProps) {
	const DatePickerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (isDatePickerOpen && DatePickerRef.current && !DatePickerRef.current.contains(event.target as Node)) {
				setIsDatePickerOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isDatePickerOpen, setIsDatePickerOpen]);

	const handleDateTimeChange = (value: string | moment.Moment) => {
		if (typeof value === 'object' && value !== null) {
			const date = value instanceof Date ? value : value.toDate();
			setDueDate(date);
		}
	};
	return (
		<Menu ref={DatePickerRef} open={isDatePickerOpen} leftNotch={20} posLeft={14}>
			<div className="relative">
				<DateTime
					value={dueDate}
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
