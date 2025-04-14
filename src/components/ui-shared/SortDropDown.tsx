import Button from '@/components/ui-shared/Button';
import DropDown from '@/components/ui-shared/DropDown';
import MenuItem from '@/components/ui-shared/MenuItem';
import { SingleSelectionProps } from '@/utils/types';
import { ArrowBigDown, ArrowBigUp, CalendarDays, CalendarPlus, CaseSensitive, Check, Star, X } from 'lucide-react';
import { useState } from 'react';

export default function SortDropDown({ selectedOption, onOptionSelect }: SingleSelectionProps) {
	const [sortOrder, setSortOrder] = useState<'Asc' | 'Desc'>('Asc');

	const handleSortOrder = () => {
		const newOrder = sortOrder === 'Asc' ? 'Desc' : 'Asc';
		setSortOrder(newOrder);
		onOptionSelect(`${selectedOption} ${newOrder}`);
	};

	const SortItems = [
		{ icon: CalendarDays, label: 'Due Date' },
		{ icon: CalendarPlus, label: 'Creation Date' },
		{ icon: Star, label: 'Importance' },
		{ icon: CaseSensitive, label: 'Alphabetical' },
	];

	return (
		<div className="flex flex-row items-center gap-2 mb-4">
			<DropDown selectedItem={selectedOption?.split(' ')[0] ?? null}>
				{SortItems.map(item => (
					<MenuItem
						key={item.label}
						className="justify-between"
						onClick={() => onOptionSelect(`${item.label} ${sortOrder}`)}
					>
						<div className="flex gap-2">
							<item.icon className="text-slate-600" size={18} />
							<p>{item.label}</p>
						</div>
						{<Check size={18} className={`${item.label === selectedOption ? 'block' : 'hidden'} text-slate-600`} />}
					</MenuItem>
				))}
			</DropDown>
			<div className="flex items-center gap-2 border px-3 py-2 rounded-md cursor-pointer" onClick={handleSortOrder}>
				{sortOrder === 'Asc' ? <ArrowBigUp size={20} /> : <ArrowBigDown size={20} />}
				<p className="select-none text-sm">{sortOrder}</p>
			</div>
			<Button ariaLabel="Clear Sorting" onClick={() => onOptionSelect(null)}>
				<X />
			</Button>
		</div>
	);
}
