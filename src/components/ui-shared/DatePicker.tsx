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

	const DateMenuRef = useRef<HTMLDivElement>(null);
	const customDatePickerRef = useRef<HTMLDivElement>(null);

	const notch =
		"before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:border-t before:border-l before:border-gray-300 before:rotate-45";

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (isDateMenuOpen && DateMenuRef.current && !DateMenuRef.current.contains(event.target as Node)) {
				setIsDateMenuOpen(false);
			}
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
	}, [isDateMenuOpen, isDatePickerOpen]);

	const handleDateTimeChange = (value: string | moment.Moment) => {
		if (typeof value === 'object' && value !== null) {
			const date = value instanceof Date ? value : value.toDate();
			setDueDate(date);
		}
	};

	return (
		<div className={`relative flex ${defaultEmptyText && 'py-2'}`}>
			<div className="flex items-center h-4">
				<Button ariaLabel="Add Due Date" onClick={() => setIsDateMenuOpen(prev => !prev)}>
					{dueDate ? <Calendar size={20} /> : <CalendarPlus size={20} />}
				</Button>
				{(defaultEmptyText || dueDate) && (
					<Button ariaLabel="Due Date" onClick={() => setIsDatePickerOpen(prev => !prev)}>
						<p>{dueDate ? format(dueDate, 'MM/dd/yy') : 'MM/DD/YY'}</p>
					</Button>
				)}
			</div>

			<DateMenu
				DateMenuRef={DateMenuRef}
				isDateMenuOpen={isDateMenuOpen}
				setDueDate={setDueDate}
				setIsDateMenuOpen={setIsDateMenuOpen}
				setIsDatePickerOpen={setIsDatePickerOpen}
			/>

			<div
				ref={customDatePickerRef}
				className={`absolute top-10 -left-5 border border-gray-300 shadow-md rounded-md before:-top-2 before:left-20 bg-white ${notch} ${
					isDatePickerOpen ? 'block' : 'hidden'
				}`}
			>
				<div className="relative">
					<DateTime
						value={dueDate}
						open={isDatePickerOpen}
						onChange={handleDateTimeChange}
						closeOnSelect={true}
						input={false}
						dateFormat={true}
						timeFormat={false}
					/>
				</div>
			</div>
		</div>
	);
}

interface DateMenuProps {
	DateMenuRef: RefObject<HTMLDivElement>;
	isDateMenuOpen: boolean;
	setDueDate: (newDueDate: Date | undefined) => void;
	setIsDatePickerOpen: (vaL: boolean) => void;
	setIsDateMenuOpen: (val: boolean) => void;
}

function DateMenu({ DateMenuRef, isDateMenuOpen, setDueDate, setIsDatePickerOpen, setIsDateMenuOpen }: DateMenuProps) {
	const notch =
		"before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:border-t before:border-l before:border-gray-300 before:rotate-45";
	const menuItemStyle = 'hover:bg-slate-200 active:bg-slate-300 p-2 cursor-pointer';

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
                  flex flex-col w-44 border border-gray-300 shadow-lg before:-top-2 before:left-5 ${notch}
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
