import { CalendarDays, Filter, Tag, XIcon } from 'lucide-react';
import { Button } from '@/components/ui-shared/Button';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useQueryParams from '@/hooks/useQueryParams';

const filterIcons: any = {
	dueDate: CalendarDays,
	categories: Tag,
};

interface FilterControlProps {
	setIsDateFilterOpen: Dispatch<SetStateAction<boolean>>;
	setIsCategoryFilterOpen: Dispatch<SetStateAction<boolean>>;
}

export default function FilterControl({ setIsCategoryFilterOpen, setIsDateFilterOpen }: FilterControlProps) {
	const { getQueryParam, updateSearchParams } = useQueryParams();
	const [filterField, filterValue] = getQueryParam('filter');
	const [todolistId] = getQueryParam('id');
	const Icon = filterIcons[filterField] ?? Filter;
	const [selectedCategories, setSelectedCategories] = useState(0);

	useEffect(() => {
		if (filterField === 'categories') {
			setSelectedCategories(filterValue.split(',').length);
		}
	}, [filterField, filterValue]);

	const handleMenuToggle = () => {
		if (filterField === 'dueDate') setIsDateFilterOpen(prev => !prev);
		if (filterField === 'categories') return setIsCategoryFilterOpen(prev => !prev);
	};

	return (
		<div className="flex items-center border-b-2 border-slate-300 py-1">
			<Button
				ariaLabel="Change Filter"
				onClick={handleMenuToggle}
				className="flex items-center gap-1 hover:bg-slate-300 active:bg-slate-400"
			>
				<Icon size={12} />
				<p className="text-sm">{filterField === 'categories' ? 'Category' : filterValue}</p>
				{filterField === 'categories' && (
					<p className="bg-slate-500 text-slate-200 text-xs rounded-full px-2">{selectedCategories}</p>
				)}
			</Button>
			<Button
				ariaLabel="Remove Sort"
				onClick={() => updateSearchParams('filter', null, todolistId)}
				className="hover:bg-slate-300 active:bg-slate-400"
			>
				<XIcon size={12} />
			</Button>
		</div>
	);
}
