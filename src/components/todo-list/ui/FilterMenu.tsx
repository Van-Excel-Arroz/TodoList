import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import { MenuOpenProps } from '@/utils/types';
import { CalendarDays, Tag } from 'lucide-react';

interface FilterMenuProps extends MenuOpenProps {
	setIsCategoryFilterOpen: (val: boolean) => void;
	setIsDateFilterOpen: (val: boolean) => void;
}

export default function FilterMenu({
	isOpen,
	setIsOpen,
	setIsCategoryFilterOpen,
	setIsDateFilterOpen,
}: FilterMenuProps) {
	return (
		<Menu open={isOpen} onClose={() => setIsOpen(false)} width="w-44">
			<MenuItem className="border-b font-bold justify-center" clickable={false}>
				<p>Filter by</p>
			</MenuItem>
			<MenuItem
				onClick={() => {
					setIsCategoryFilterOpen(true);
					setIsOpen(false);
				}}
			>
				<Tag className="text-slate-600" size={18} />
				<p>Categories</p>
			</MenuItem>
			<MenuItem
				onClick={() => {
					setIsDateFilterOpen(true);
					setIsOpen(false);
				}}
			>
				<CalendarDays className="text-slate-600" size={18} />
				<p>Due Date</p>
			</MenuItem>
		</Menu>
	);
}
