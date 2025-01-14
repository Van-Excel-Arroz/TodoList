import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import { useQueryParam } from '@/hooks/useQueryParam';
import useUpdateSearchParams from '@/hooks/useUpdateSearchParams';
import { CalendarDays, CalendarPlus, CaseSensitive, Star } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface SortMenuProps {
	isSortMenuOpen: boolean;
	setIsSortMenuOpen: (val: boolean) => void;
	todolistId: number;
}

const MenuItems = {
	'Due Date': {
		param: 'dueDate%3Aasc',
		icon: CalendarDays,
	},
	'Creation Date': {
		param: 'creationDate:asc',
		icon: CalendarPlus,
	},
	Importance: {
		param: 'importance:asc',
		icon: Star,
	},
	Alphabetical: {
		param: 'alphabetical:asc',
		icon: CaseSensitive,
	},
};

export default function SortMenu({ isSortMenuOpen, setIsSortMenuOpen, todolistId }: SortMenuProps) {
	const updateSearchParams = useUpdateSearchParams();
	const queryParam = useQueryParam();
	const [filterField, filterValue] = queryParam('filter');
	const [sortField] = queryParam('sort');

	return (
		<Menu
			open={isSortMenuOpen}
			onClose={() => setIsSortMenuOpen(false)}
			posX={`${sortField ? 'right-8' : '-right-5'}`}
			posXNotch="before:right-6"
			width="w-44"
		>
			<MenuItem className="border-b border-gray-200 font-bold" clickable={false}>
				<p>Sort by</p>
			</MenuItem>

			{Object.entries(MenuItems).map(([label, menuItem]) => (
				<MenuItem onClick={() => updateSearchParams('sort', menuItem.param)} key={label}>
					<menuItem.icon className="text-slate-600" size={18} />
					<p>{label}</p>
				</MenuItem>
			))}
		</Menu>
	);
}
