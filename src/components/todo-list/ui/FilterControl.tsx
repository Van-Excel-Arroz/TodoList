import { CalendarDays, Filter, Tag, XIcon } from 'lucide-react';
import Button from '@/components/ui-shared/Button';
import { useEffect, useState } from 'react';
import useQueryParams from '@/hooks/useQueryParams';

const filterIcons: any = {
	dueDate: CalendarDays,
	categories: Tag,
};

export default function FilterControl({ setIsFilterMenuOpen }: { setIsFilterMenuOpen: (val: boolean) => void }) {
	const { getQueryParam, updateSearchParams } = useQueryParams();
	const [filterField, filterValue] = getQueryParam('filter');
	const [todolistId] = getQueryParam('id');
	const [smart_list] = getQueryParam('smart-list');

	const Icon = filterIcons[filterField] ?? Filter;
	const [selectedCategories, setSelectedCategories] = useState(0);

	useEffect(() => {
		if (filterField === 'Categories') {
			setSelectedCategories(filterValue.split(',').length);
		}
	}, [filterField, filterValue]);

	return (
		<div className="flex items-center gap-1">
			<Button
				ariaLabel="Change Filter"
				onClick={() => setIsFilterMenuOpen(true)}
				className="flex items-center gap-1 hover:bg-slate-300 active:bg-slate-400"
			>
				<Icon size={16} />
				<p className="text-[12px]">{filterField === 'Categories' ? 'Category' : filterValue}</p>
				{filterField === 'Categories' && (
					<p className="bg-slate-500 text-slate-200 text-xs rounded-full px-2">{selectedCategories}</p>
				)}
			</Button>
			<Button
				ariaLabel="Remove Sort"
				onClick={() => updateSearchParams('filter', null, todolistId || smart_list)}
				className="hover:bg-slate-300 active:bg-slate-400"
			>
				<XIcon size={16} />
			</Button>
		</div>
	);
}
