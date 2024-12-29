import { format, setHours, setMinutes, startOfToday } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { Clock3, Trash2 } from 'lucide-react';
import DateTime from 'react-datetime';

interface DueDateInputProps {
	dueDate: Date | undefined;
	setDueDate: (newDueDate: Date | undefined) => void;
	defaultEmptyText?: boolean;
	right?: boolean;
}

export default function TimePicker({
	dueDate,
	setDueDate,
	defaultEmptyText = false,
	right = false,
}: DueDateInputProps) {
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
						dueDate={dueDate}
						setDueDate={setDueDate}
						right={right}
					/>
				</div>
				{(defaultEmptyText || dueDate) && (
					<div className="relative">
						<Button ariaLabel="Due Date" onClick={() => setIsTimePickerOpen(prev => !prev)}>
							<p>{dueDate ? format(dueDate, 'hh:mm a') : 'HH:MM a'}</p>
						</Button>
						<TimePickers
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
	dueDate: Date | undefined;
	setDueDate: (newDueDate: Date | undefined) => void;
	right?: boolean;
}

function TimeMenu({ isTimeMenuOpen, setIsTimeMenuOpen, dueDate, setDueDate, right = false }: TimeMenuProps) {
	const menuItemStyle = 'hover:bg-slate-200 active:bg-slate-300 p-2 cursor-pointer';
	const notch =
		"before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:border-t before:border-l before:border-gray-300 before:rotate-45";
	const TimeMenuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (isTimeMenuOpen && TimeMenuRef.current && !TimeMenuRef.current.contains(event.target as Node)) {
				setIsTimeMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isTimeMenuOpen]);

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
		<div
			ref={TimeMenuRef}
			className={`absolute top-10 ${
				right ? '-right-5 before:right-6 ' : '-left-7 before:left-8'
			} before:-top-2 z-20 bg-white text-center text-black text-sm rounded-lg
							flex flex-col w-44 border border-gray-300 shadow-lg  ${notch}
							${isTimeMenuOpen ? 'block' : 'hidden'}`}
		>
			<p className="border-b border-gray-200 p-2 font-medium">Select Due Time</p>
			<p className={menuItemStyle} onClick={() => handleSetTime('morning')}>
				Morning (09:00 a.m)
			</p>
			<p className={menuItemStyle} onClick={() => handleSetTime('noon')}>
				Noon (12:00 p.m)
			</p>
			<p className={menuItemStyle} onClick={() => handleSetTime('afternoon')}>
				Afternoon (03:00 p.m)
			</p>
			<p className={menuItemStyle} onClick={() => handleSetTime('evening')}>
				Evening (06:00 p.m)
			</p>
			<p className={menuItemStyle} onClick={() => handleSetTime('night')}>
				Evening (09:00 p.m)
			</p>
			<p
				className={menuItemStyle}
				onClick={() => {
					setIsTimeMenuOpen(false);
				}}
			>
				Custom
			</p>
			<button
				aria-label="Clear Due Date"
				type="button"
				onClick={() => handleSetTime('clear')}
				className={`flex items-center justify-center gap-2 border-t border-slate-300 ${menuItemStyle}`}
			>
				<Trash2 size={16} />
				Clear
			</button>
		</div>
	);
}

interface TimePickerProps {
	isTimePickerOpen: boolean;
	setIsTimePickerOpen: (val: boolean) => void;
	dueDate: Date | undefined;
	setDueDate: (newDueDate: Date | undefined) => void;
	right?: boolean;
}

function TimePickers({ isTimePickerOpen, setIsTimePickerOpen, dueDate, setDueDate, right = false }: TimePickerProps) {
	const notch =
		"before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:border-t before:border-l before:border-gray-300 before:rotate-45";

	const customTimePickerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isTimePickerOpen &&
				customTimePickerRef.current &&
				!customTimePickerRef.current.contains(event.target as Node)
			) {
				setIsTimePickerOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isTimePickerOpen]);

	const handleDateTimeChange = (value: string | moment.Moment) => {
		if (typeof value === 'object' && value !== null) {
			const date = value instanceof Date ? value : value.toDate();
			setDueDate(date);
		}
	};

	return (
		<div
			ref={customTimePickerRef}
			className={`absolute top-10 ${
				right ? '-right-1 before:right-10' : '-left-5 before:left-10'
			} before:-top-2  z-20 border border-gray-300 shadow-md rounded-md  bg-white ${notch} ${
				isTimePickerOpen ? 'block' : 'hidden'
			}`}
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
		</div>
	);
}
