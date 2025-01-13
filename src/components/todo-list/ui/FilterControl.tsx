import { CalendarDays, Filter, Tag, XIcon } from 'lucide-react';

import { Button } from '@/components/ui-shared/Button';
import { useSearchParams } from 'next/navigation';
import useUpdateSearchParams from '@/hooks/useUpdateSearchParams';

const filterIcons: any = {
	dueDate: CalendarDays,
	categories: Tag,
};

interface FilterControlProps {
	setIsDateFilterOpen: (val: boolean | ((prev: boolean) => boolean)) => void;
	setIsCategoryFilterOpen: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export default function FilterControl({ setIsCategoryFilterOpen, setIsDateFilterOpen }: FilterControlProps) {
	const searchParams = useSearchParams();
	const updateSearchParams = useUpdateSearchParams();
	const [filterField, filterValue] = searchParams.get('filter')?.split(':') || [];
	const Icon = filterIcons[filterField] ?? Filter;

	const handleMenuToggle = () => {
		if (filterField === 'dueDate') setIsDateFilterOpen(prev => !prev);
		if (filterField === 'categories') return setIsCategoryFilterOpen(prev => !prev);
	};

	return (
		<div className="flex items-center text-xs gap-1 p-1 bg-slate-200 text-slate-700 rounded-lg border border-slate-300 hover:border-slate-400">
			<p className=" pl-1">Filter by:</p>
			<Button
				ariaLabel="Change Filter"
				onClick={handleMenuToggle}
				className="flex items-center gap-1 hover:bg-slate-300 active:bg-slate-400"
			>
				<Icon size={12} />
				<p>{filterField === 'categories' ? 'Category' : filterValue}</p>
			</Button>
			<Button
				ariaLabel="Remove Sort"
				onClick={() => updateSearchParams('filter', null)}
				className="hover:bg-slate-300 active:bg-slate-400"
			>
				<XIcon size={12} />
			</Button>
		</div>
	);
}
