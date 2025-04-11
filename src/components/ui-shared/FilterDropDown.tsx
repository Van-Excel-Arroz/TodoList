import Button from '@/components/ui-shared/Button';
import DropDown from '@/components/ui-shared/DropDown';
import MenuItem from '@/components/ui-shared/MenuItem';
import { CalendarDays, CalendarX2, Check, X } from 'lucide-react';
import { useState } from 'react';
import Selection from './Selection';
import { Category } from '@/utils/types';

const filterBy = ['Due Date', 'Categories'];

export default function FilterDropDown() {
	const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
	const [filter, setFilter] = useState(filterBy[0]);

	const DateFilterItems = [
		{ icon: CalendarDays, label: 'Today' },
		{ icon: CalendarDays, label: 'Tomorrow' },
		{ icon: CalendarDays, label: 'This Week' },
		{ icon: CalendarDays, label: 'This Month' },
		{ icon: CalendarX2, label: 'No Due Date' },
	];

	return (
		<div className="flex flex-row items-center gap-2 mb-4">
			<DropDown selectedItem={selectedFilter}>
				<MenuItem
					clickable={false}
					onClick={e => {
						if (e) e.stopPropagation();
					}}
				>
					<Selection options={filterBy} selectedOption={filter} setSelectedOption={setFilter} />
				</MenuItem>

				{DateFilterItems.map(item => (
					<MenuItem key={item.label} className="justify-between" onClick={() => setSelectedFilter([item.label])}>
						<div className="flex gap-2">
							<item.icon className="text-slate-600" size={18} />
							<p>{item.label}</p>
						</div>
						{<Check size={18} className={`${item.label == selectedFilter[0] ? 'block' : 'hidden'} text-slate-600`} />}
					</MenuItem>
				))}
			</DropDown>
			<Button ariaLabel="Clear Sorting" onClick={() => setSelectedFilter([])}>
				<X />
			</Button>
		</div>
	);
}
