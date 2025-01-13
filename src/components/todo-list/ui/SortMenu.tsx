import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
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
		param: 'creationDate%3Aasc',
		icon: CalendarPlus,
	},
	Importance: {
		param: 'importance%3Aasc',
		icon: Star,
	},
	Alphabetical: {
		param: 'alphabetical%3Aasc',
		icon: CaseSensitive,
	},
};

export default function SortMenu({ isSortMenuOpen, setIsSortMenuOpen, todolistId }: SortMenuProps) {
	const [filterField, filterValue] = useSearchParams().get('filter')?.split(':') || [];

	return (
		<Menu
			open={isSortMenuOpen}
			onClose={() => setIsSortMenuOpen(false)}
			posX="-right-5"
			posXNotch="before:right-6"
			width="w-44"
		>
			<MenuItem className="border-b border-gray-200 font-bold" clickable={false}>
				<p>Sort by</p>
			</MenuItem>

			{Object.entries(MenuItems).map(([label, menuItem]) => (
				<MenuItem
					href={`/tasks/?id=${todolistId}&sort=${menuItem.param}${
						filterField ? `&filter=${filterField}:${filterValue}` : ''
					}`}
					key={label}
				>
					<menuItem.icon className="text-slate-600" size={18} />
					<p>{label}</p>
				</MenuItem>
			))}
		</Menu>
	);
}
