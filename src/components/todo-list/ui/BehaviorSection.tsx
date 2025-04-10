import { useState } from 'react';
import useQueryParams from '@/hooks/useQueryParams';
import {
	ArrowBigDown,
	ArrowBigUp,
	CalendarDays,
	CalendarPlus,
	CaseSensitive,
	Check,
	ChevronDown,
	Star,
	X,
} from 'lucide-react';
import FilterMenu from './FilterMenu';
import Button from '@/components/ui-shared/Button';
import DropDown from '@/components/ui-shared/DropDown';
import MenuItem from '@/components/ui-shared/MenuItem';

const filterLabels: any = {
	dueDate: 'Due Date',
	categories: 'Categories',
};

const SortItems = [
	{ icon: CalendarDays, label: 'Due Date' },
	{ icon: CalendarPlus, label: 'Creation Date' },
	{ icon: Star, label: 'Importance' },
	{ icon: CaseSensitive, label: 'Alphabetical' },
];

export default function BehaviorSection() {
	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
	const { getQueryParam } = useQueryParams();
	const [filterField] = getQueryParam('filter');
	const dropDownStyle =
		'flex items-center justify-between gap-2 cursor-pointer text-sm border rounded-md px-4 py-2 relative';
	const [selectedSort, setSelectedSort] = useState<string[]>([]);
	const [sortOrder, setSortOrder] = useState<'Asc' | 'Desc'>('Asc');

	const handleSortOrder = () => {
		const newOrder = sortOrder === 'Asc' ? 'Desc' : 'Asc';
		setSortOrder(newOrder);
	};

	return (
		<div className="flex flex-col gap-2">
			<p className="pl-2">Sort tasks by:</p>
			<div className="flex flex-row items-center gap-2">
				<DropDown selectedItem={selectedSort}>
					{SortItems.map(item => (
						<MenuItem className="justify-between" onClick={() => setSelectedSort([item.label])}>
							<div className="flex gap-2">
								<item.icon className="text-slate-600" size={18} />
								<p>{item.label}</p>
							</div>
							{<Check size={18} className={`${item.label == selectedSort[0] ? 'block' : 'hidden'} text-slate-600`} />}
						</MenuItem>
					))}
				</DropDown>
				<div className={dropDownStyle} onClick={handleSortOrder}>
					{sortOrder === 'Asc' ? <ArrowBigUp size={20} /> : <ArrowBigDown size={20} />}
					<p className="select-none">{sortOrder}</p>
				</div>
			</div>

			<p className="pl-2">Filter tasks by:</p>
			<div className="flex items-center gap-2 mb-4">
				<div className={`${dropDownStyle} w-full`} onClick={() => setIsFilterMenuOpen(prev => !prev)}>
					{filterField ? <p>{filterLabels[filterField]}</p> : <p className="text-slate-600">Select Filter</p>}
					<ChevronDown size={20} className="text-slate-600" />
					<FilterMenu
						isOpen={isFilterMenuOpen}
						setIsOpen={setIsFilterMenuOpen}
						width="w-full"
						top="top-12"
						header={false}
					/>
				</div>
				<Button ariaLabel="Clear Sorting">
					<X />
				</Button>
			</div>
		</div>
	);
}
