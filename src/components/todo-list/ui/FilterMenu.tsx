import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import { MenuOpenProps, SortFilterMenuProps } from '@/utils/types';
import DateFilterMenu from './DateFilterMenu';

export default function FilterMenu({ isOpen, setIsOpen, width = 'w-52', top, header = true }: SortFilterMenuProps) {
	return (
		<Menu open={isOpen} onClose={() => setIsOpen(false)} width="w-52">
			<MenuItem className="border-b font-bold justify-center" clickable={false}>
				<p>Filter by</p>
			</MenuItem>
			<MenuItem clickable={false} textSize="text-sm" className="text-slate-600">
				<p>Due Date</p>
			</MenuItem>
			<DateFilterMenu />
			<MenuItem clickable={false} textSize="text-sm" className="text-slate-600 border-t">
				<p>Categories</p>
			</MenuItem>
		</Menu>
	);
}
