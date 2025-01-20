import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import useQueryParams from '@/hooks/useQueryParams';
import { MenuOpenProps } from '@/types';
import { CheckIcon } from 'lucide-react';

const DateFilters = ['Today', 'Tomorrow', 'This Week', 'This Month', 'No Due Date'];

export default function DateFilterMenu({ isOpen, setIsOpen }: MenuOpenProps) {
	const { getQueryParam, updateSearchParams } = useQueryParams();
	const [filterField, filterValue] = getQueryParam('filter');
	const [todolistId] = getQueryParam('id');

	return (
		<Menu
			open={isOpen}
			onClose={() => setIsOpen(false)}
			posX={`${filterField ? 'right-6' : '-right-5'}`}
			posXNotch="before:right-6"
			width="w-44"
		>
			<MenuItem className="border-b border-gray-200 font-bold" clickable={false}>
				<p>Filter by Date</p>
			</MenuItem>
			{DateFilters.map(label => (
				<MenuItem
					key={label}
					className="flex items-center justify-between w-full"
					onClick={() => updateSearchParams('filter', `dueDate:${label}`, todolistId)}
				>
					<p className="text-base text-left w-full">{label}</p>
					<div className="h-3 w-3">
						<CheckIcon size={14} className={`${label === filterValue ? 'block' : 'hidden'}`} />
					</div>
					<p>{label === filterValue}</p>
				</MenuItem>
			))}
		</Menu>
	);
}
