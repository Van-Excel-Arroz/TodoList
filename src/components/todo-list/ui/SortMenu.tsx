import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import useQueryParams from '@/hooks/useQueryParams';
import { CalendarDays, CalendarPlus, CaseSensitive, Check, Star } from 'lucide-react';

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
	width = 'w-64',
	top,
	header = true,
}: SortMenuProps) {
	const { getQueryParam, updateSearchParams } = useQueryParams();
	const [todolistId] = getQueryParam('id');
	const [smart_list] = getQueryParam('smart-list');
	const [sortField, sortValue] = getQueryParam('sort');

	return (
		<Menu open={isSortMenuOpen} onClose={() => setIsSortMenuOpen(false)} width={width} top={top}>
			{header ? (
				<MenuItem className="border-b font-bold justify-center" clickable={false}>
					<p>Sort by</p>
				</MenuItem>
			) : null}

			{Object.entries(MenuItems).map(([label, menuItem]) => (
				<MenuItem
					onClick={() => updateSearchParams('sort', menuItem.param, todolistId || smart_list)}
					key={label}
					className="justify-between"
				>
					<div className="flex items-center gap-2">
						<menuItem.icon className="text-slate-600" size={18} />
						<p>{label}</p>
					</div>
					<div className="w-6">
						{menuItem.param === `${sortField}:${sortValue}` ? <Check size={18} className="text-slate-600" /> : null}
					</div>
				</MenuItem>
			))}
		</Menu>
	);
}
