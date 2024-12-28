import { Button } from '@/components/ui-shared/Button';
import { add, format, setHours, setMinutes, setSeconds } from 'date-fns';
import { Calendar, CalendarPlus, Trash2 } from 'lucide-react';
import { useState, useEffect, useRef, RefObject } from 'react';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

interface DueDateInputProps {
	dueDate: Date | undefined;
	setDueDate: (newDueDate: Date | undefined) => void;
	defaultEmptyText?: boolean;
}

export default function DatePicker({ dueDate, setDueDate, defaultEmptyText = false }: DueDateInputProps) {
	const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

	return (
		<div className={`relative flex ${defaultEmptyText && 'py-2'}`}>
			<div className="flex items-center h-4">
				<div className="relative">
					<Button ariaLabel="Add Due Date" onClick={() => setIsDateMenuOpen(prev => !prev)}>
						{dueDate ? <Calendar size={20} /> : <CalendarPlus size={20} />}
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

	const notch =
		" before:-top-2 before:left-5 before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:border-t before:border-l before:border-gray-300 before:rotate-45";
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
	}, [isDateMenuOpen]);
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
		<div
			ref={DateMenuRef}
			className={`absolute top-10 -left-4 bg-white text-center text-black text-sm rounded-lg
                  flex flex-col w-44 border border-gray-300 shadow-lg ${notch}
                  ${isDateMenuOpen ? 'block' : 'hidden'}`}
		>
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
		</div>
	);
}

interface DatePickersProps {
	isDatePickerOpen: boolean;
	setIsDatePickerOpen: (val: boolean) => void;
	dueDate: Date | undefined;
	setDueDate: (newDueDate: Date | undefined) => void;
}

function DatePickers({ isDatePickerOpen, setIsDatePickerOpen, dueDate, setDueDate }: DatePickersProps) {
	const notch =
		"before:-top-2 before:left-20 before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:border-t before:border-l before:border-gray-300 before:rotate-45";
	const customDatePickerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isDatePickerOpen &&
				customDatePickerRef.current &&
				!customDatePickerRef.current.contains(event.target as Node)
			) {
				setIsDatePickerOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isDatePickerOpen]);

	const handleDateTimeChange = (value: string | moment.Moment) => {
		if (typeof value === 'object' && value !== null) {
			const date = value instanceof Date ? value : value.toDate();
			setDueDate(date);
		}
	};
	return (
		<div
			ref={customDatePickerRef}
			className={`absolute top-10 -left-14 border border-gray-300 shadow-md rounded-md bg-white ${notch} ${
				isDatePickerOpen ? 'block' : 'hidden'
			}`}
		>
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
		</div>
	);
}
