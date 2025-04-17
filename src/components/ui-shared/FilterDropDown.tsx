import Button from '@/components/ui-shared/Button';
import DropDown from '@/components/ui-shared/DropDown';
import MenuItem from '@/components/ui-shared/MenuItem';
import { CalendarDays, CalendarX2, Check, X } from 'lucide-react';
import { useState } from 'react';
import Selection from './Selection';
import CategorySelectionList from './CategorySelectionList';

const filterBy = ['Due Date', 'Categories'];

interface FilterDropDownProps {
	selectedField: string | null;
	selectedValue: string | null;
	onFieldChange: (field: string | null) => void;
	onValueSelect: (value: string | null) => void;
}

export default function FilterDropDown({
	selectedField,
	selectedValue,
	onFieldChange,
	onValueSelect,
}: FilterDropDownProps) {
	const initialCategories = selectedField === 'categories' ? selectedValue?.split(',') ?? [] : [];
	const [selectedCategoryTitles, setSelectedCategoryTitles] = useState<string[]>(initialCategories);
	const [filter, setFilter] = useState(filterBy[0]);

	const DateFilterItems = [
		{ icon: CalendarDays, label: 'Today' },
		{ icon: CalendarDays, label: 'Tomorrow' },
		{ icon: CalendarDays, label: 'This Week' },
		{ icon: CalendarDays, label: 'This Month' },
		{ icon: CalendarX2, label: 'No Due Date' },
	];

	const applyCategoriesFilter = () => {
		const stringTitles = selectedCategoryTitles.join(',');
		onFieldChange('Categories');
		onValueSelect(stringTitles);
	};

	const applyDueDateFilter = (val: string) => {
		onFieldChange('Due Date');
		onValueSelect(val);
	};

	const handleFilterRemoval = () => {
		onFieldChange(null);
		onValueSelect(null);
		setSelectedCategoryTitles([]);
	};

	return (
		<div className="flex flex-row items-center gap-2 mb-4">
			<DropDown selectedItem={selectedValue}>
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
						<MenuItem key={item.label} className="justify-between" onClick={() => applyDueDateFilter(item.label)}>
							<div className="flex gap-2">
								<item.icon className="text-slate-600" size={18} />
								<p>{item.label}</p>
							</div>
							{<Check size={18} className={`${item.label === selectedValue ? 'block' : 'hidden'} text-slate-600`} />}
						</MenuItem>
					))
				) : (
					<>
						<CategorySelectionList
							selectedCategoryTitles={selectedCategoryTitles}
							setSelectedCategoryTitles={setSelectedCategoryTitles}
						/>
						<MenuItem className="border-t font-bold gap-2 justify-end" clickable={false}>
							<Button ariaLabel="Add Selected Categories" darkMode={true} onClick={applyCategoriesFilter}>
								<p className="px-1 text-sm">Apply</p>
							</Button>
						</MenuItem>
					</>
				)}
			</DropDown>
			<Button ariaLabel="Clear Sorting" onClick={handleFilterRemoval}>
				<X />
			</Button>
		</div>
	);
}
