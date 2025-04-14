import Button from '@/components/ui-shared/Button';
import DropDown from '@/components/ui-shared/DropDown';
import MenuItem from '@/components/ui-shared/MenuItem';
import { CalendarDays, CalendarX2, Check, X } from 'lucide-react';
import { useState } from 'react';
import Selection from './Selection';
import { Category, SingleSelectionProps } from '@/utils/types';
import CategorySelectionList from './CategorySelectionList';

const filterBy = ['Due Date', 'Categories'];

export default function FilterDropDown({ selectedOption, onOptionSelect }: SingleSelectionProps) {
	const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
	const [filter, setFilter] = useState(filterBy[0]);

	const DateFilterItems = [
		{ icon: CalendarDays, label: 'Today' },
		{ icon: CalendarDays, label: 'Tomorrow' },
		{ icon: CalendarDays, label: 'This Week' },
		{ icon: CalendarDays, label: 'This Month' },
		{ icon: CalendarX2, label: 'No Due Date' },
	];

	const applyCategoriesFilter = () => {
		const selectedCategoryTitles = selectedCategories.join(', ');
		onOptionSelect(selectedCategoryTitles);
	};

	return (
		<div className="flex flex-row items-center gap-2 mb-4">
			<DropDown selectedItem={selectedOption}>
				<MenuItem
					clickable={false}
					onClick={e => {
						if (e) e.stopPropagation();
					}}
				>
					<Selection options={filterBy} selectedOption={filter} setSelectedOption={setFilter} />
				</MenuItem>

				{filter === 'Due Date' ? (
					DateFilterItems.map(item => (
						<MenuItem key={item.label} className="justify-between" onClick={() => onOptionSelect(item.label)}>
							<div className="flex gap-2">
								<item.icon className="text-slate-600" size={18} />
								<p>{item.label}</p>
							</div>
							{<Check size={18} className={`${item.label == selectedOption ? 'block' : 'hidden'} text-slate-600`} />}
						</MenuItem>
					))
				) : (
					<>
						<CategorySelectionList
							selectedCategories={selectedCategories}
							setSelectedCategories={setSelectedCategories}
						/>
						<MenuItem className="border-t font-bold gap-2 justify-end" clickable={false}>
							<Button ariaLabel="Add Selected Categories" darkMode={true} onClick={applyCategoriesFilter}>
								<p className="px-1 text-sm">Apply</p>
							</Button>
						</MenuItem>
					</>
				)}
			</DropDown>
			<Button
				ariaLabel="Clear Sorting"
				onClick={() => {
					onOptionSelect(null);
					setSelectedCategories([]);
				}}
			>
				<X />
			</Button>
		</div>
	);
}
