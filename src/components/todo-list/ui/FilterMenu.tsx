import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import { SortFilterMenuProps } from '@/utils/types';
import DateFilterMenu from './DateFilterMenu';
import { useState } from 'react';
import Selection from '@/components/ui-shared/Selection';

const filterBy = ['Due Date', 'Categories'];

export default function FilterMenu({ isOpen, setIsOpen, width = 'w-60', top, header = true }: SortFilterMenuProps) {
	const [filter, setFilter] = useState(filterBy[0].toLowerCase());

	return (
		<Menu open={isOpen} onClose={() => setIsOpen(false)} width={width} top={top}>
			{header && (
				<MenuItem className="border-b font-bold justify-center" clickable={false}>
					<p>Filter by</p>
				</MenuItem>
			)}
			<MenuItem clickable={false}>
				<Selection options={filterBy} selectedOption={filter} setSelectedOption={setFilter} />
			</MenuItem>
			<DateFilterMenu />
		</Menu>
	);
}
