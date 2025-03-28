import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import useQueryParams from '@/hooks/useQueryParams';
import { CalendarDays, CalendarPlus, CaseSensitive, Star } from 'lucide-react';

interface SortMenuProps {
	isSortMenuOpen: boolean;
	setIsSortMenuOpen: (val: boolean) => void;
	width?: string;
	top?: string;
	header?: boolean;
}

const MenuItems = {
	'Due Date': {
		param: 'dueDate:asc',
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

export default function SortMenu({
	isSortMenuOpen,
	setIsSortMenuOpen,
	width = 'w-44',
	top,
	header = true,
}: SortMenuProps) {
	const { getQueryParam, updateSearchParams } = useQueryParams();
	const [todolistId] = getQueryParam('id');
	const [smart_list] = getQueryParam('smart-list');

	return (
		<Menu open={isSortMenuOpen} onClose={() => setIsSortMenuOpen(false)} width={width} top={top}>
			{header ? (
				<MenuItem className="border-b font-bold justify-center" clickable={false}>
					<p>Sort by</p>
				</MenuItem>
			) : null}

			{Object.entries(MenuItems).map(([label, menuItem]) => (
				<MenuItem onClick={() => updateSearchParams('sort', menuItem.param, todolistId || smart_list)} key={label}>
					<menuItem.icon className="text-slate-600" size={18} />
					<p>{label}</p>
				</MenuItem>
			))}
		</Menu>
	);
}
