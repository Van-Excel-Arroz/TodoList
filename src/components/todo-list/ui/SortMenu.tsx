import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import useQueryParams from '@/hooks/useQueryParams';
import { SortFilterMenuProps } from '@/utils/types';
import { CalendarDays, CalendarPlus, CaseSensitive, Check, Star, Trash2 } from 'lucide-react';

const MenuItems = [
	{
		sortField: 'Due Date',
		sortOrder: 'asc',
		icon: CalendarDays,
	},
	{
		sortField: 'Creation Date',
		sortOrder: 'asc',
		icon: CalendarPlus,
	},
	{
		sortField: 'Importance',
		sortOrder: 'asc',
		icon: Star,
	},
	{
		sortField: 'Alphabetical',
		sortOrder: 'asc',
		icon: CaseSensitive,
	},
];

export default function SortMenu({
	isOpen,
	setIsOpen,
	width = 'w-52',
	top,
	header = true,
	clearBtn = false,
}: SortFilterMenuProps) {
	const { getQueryParam, updateSearchParams } = useQueryParams();
	const [todolistId] = getQueryParam('id');
	const [smart_list] = getQueryParam('smart-list');
	const [sortField, sortValue] = getQueryParam('sort');

	return (
		<Menu open={isOpen} onClose={() => setIsOpen(false)} width={width} verticalPosition={top}>
			{header ? (
				<MenuItem className="border-b font-bold justify-center" clickable={false}>
					<p>Sort by</p>
				</MenuItem>
			) : null}

			{MenuItems.map(menuItem => (
				<MenuItem
					onClick={() => updateSearchParams('sort', menuItem.sortField, todolistId || smart_list)}
					key={menuItem.sortField}
					className="justify-between"
				>
					<div className="flex items-center gap-2">
						<menuItem.icon className="text-slate-600" size={18} />
						<p>{menuItem.sortField}</p>
					</div>
					<div className="w-6">
						{`${menuItem.sortField}:${menuItem.sortOrder}` === `${sortField}:${sortValue}` ? (
							<Check size={18} className="text-slate-600" />
						) : null}
					</div>
				</MenuItem>
			))}

			{clearBtn && (
				<MenuItem
					className="border-t justify-center"
					onClick={() => updateSearchParams('sort', null, todolistId || smart_list)}
				>
					<Trash2 size={18} className="text-slate-600" />
					<p>Clear</p>
				</MenuItem>
			)}
		</Menu>
	);
}
