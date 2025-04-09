import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import useQueryParams from '@/hooks/useQueryParams';
import { SortFilterMenuProps } from '@/utils/types';
import { CalendarDays, CalendarPlus, CaseSensitive, Check, Star, Trash2 } from 'lucide-react';

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

export default function SortMenu({ isOpen, setIsOpen, width = 'w-52', top, header = true }: SortFilterMenuProps) {
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
			<MenuItem
				className="border-t justify-center"
				onClick={() => updateSearchParams('sort', null, todolistId || smart_list)}
			>
				<Trash2 size={18} className="text-slate-600" />
				<p>Clear</p>
			</MenuItem>
		</Menu>
	);
}
