import { Button } from '@/components/ui-shared/Button';
import { add, format, setHours, setMinutes, setSeconds } from 'date-fns';
import { Calendar, CalendarPlus, Clock3, Trash2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
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
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [isTimeOpen, setIsTimeOpen] = useState(false);
	const menuItemStyle = 'hover:bg-slate-200 active:bg-slate-300 p-2 cursor-pointer';
	const notch =
		"before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:border-t before:border-l before:border-gray-300 before:rotate-45";

	const DateMenuRef = useRef<HTMLDivElement>(null);
	const customDatePickerRef = useRef<HTMLDivElement>(null);
	const customTimePickerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (isDateMenuOpen && DateMenuRef.current && !DateMenuRef.current.contains(event.target as Node)) {
				setIsDateMenuOpen(false);
			}
			if (
				isCalendarOpen &&
				customDatePickerRef.current &&
				!customDatePickerRef.current.contains(event.target as Node)
			) {
				setIsCalendarOpen(false);
			}
			if (isTimeOpen && customTimePickerRef.current && !customTimePickerRef.current.contains(event.target as Node)) {
				setIsTimeOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isDateMenuOpen, isCalendarOpen, isTimeOpen]);

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
			setIsDateMenuOpen(false);
		}
	};

	return (
		<div className="relative flex">
			{dueDate || isDatePickerOpen ? (
				<div className="flex items-center py-0 gap-1">
					<Button ariaLabel="Edit Due Date" onClick={() => setIsDateMenuOpen(prev => !prev)}>
						<Calendar size={20} />
					</Button>
					<Button ariaLabel="Due Date" onClick={() => setIsCalendarOpen(prev => !prev)}>
						<p>{dueDate ? format(dueDate, 'MM/dd/yy') : 'MM/DD/YY'}</p>
					</Button>
					<Button ariaLabel="Edit Time">
						<Clock3 size={20} />
					</Button>
					<Button ariaLabel="Due Date" onClick={() => setIsTimeOpen(prev => !prev)}>
						<p>{dueDate ? format(dueDate, 'hh:mm a') : 'HH:MM a'}</p>
					</Button>
				</div>
			) : (
				<div className="flex items-center gap-1">
					<Button ariaLabel="Add Due Date" onClick={() => setIsDateMenuOpen(prev => !prev)}>
						<CalendarPlus size={20} />
					</Button>
					{defaultEmptyText && (
						<>
							<Button ariaLabel="Due Date" onClick={() => setIsCalendarOpen(prev => !prev)}>
								<p>{dueDate ? format(dueDate, 'MM/dd/yy') : 'MM/DD/YY'}</p>
							</Button>
							<Button ariaLabel="Edit Time">
								<Clock3 size={20} />
							</Button>
							<Button ariaLabel="Due Date" onClick={() => setIsTimeOpen(prev => !prev)}>
								<p>{dueDate ? format(dueDate, 'hh:mm a') : 'HH:MM a'}</p>
							</Button>
						</>
					)}
				</div>
			)}

			<div
				ref={DateMenuRef}
				className={`absolute top-10 -left-4 bg-white text-center text-black text-sm rounded-lg
                  flex flex-col w-44 border border-gray-300 shadow-lg before:-top-2 before:left-5 ${notch}
                  ${isDateMenuOpen ? 'block' : 'hidden'}`}
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
						setIsDatePickerOpen(true);
						setIsCalendarOpen(true);
						setIsDateMenuOpen(false);
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
				ref={customDatePickerRef}
				className={`absolute top-10 -left-5 border border-gray-300 shadow-md rounded-md before:-top-2 before:left-20 bg-white ${notch} ${
					isCalendarOpen ? 'block' : 'hidden'
				}`}
			>
				<div className="relative">
					<DateTime
						value={dueDate}
						open={isCalendarOpen}
						onChange={handleDateTimeChange}
						closeOnSelect={true}
						input={false}
						dateFormat={true}
						timeFormat={false}
					/>
				</div>
			</div>

			<div
				ref={customTimePickerRef}
				className={`absolute top-10 left-16 border border-gray-300 shadow-md rounded-md before:-top-2 before:left-28 bg-white ${notch} ${
					isTimeOpen ? 'block' : 'hidden'
				}`}
			>
				<div className="relative">
					<DateTime
						value={dueDate}
						open={isTimeOpen}
						onChange={handleDateTimeChange}
						closeOnSelect={true}
						input={false}
						dateFormat={false}
						timeFormat={true}
					/>
				</div>
			</div>
		</div>
	);
}
