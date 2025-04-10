import { useState } from 'react';
import SortMenu from './SortMenu';
import useQueryParams from '@/hooks/useQueryParams';
import { ArrowBigUp, ChevronDown, X } from 'lucide-react';
import FilterMenu from './FilterMenu';
import Button from '@/components/ui-shared/Button';
import DropDown from '@/components/ui-shared/DropDown';
import MenuItem from '@/components/ui-shared/MenuItem';

const sortLabels: any = {
	dueDate: 'Due Date',
	creationDate: 'Creation Date',
	importance: 'Importance',
	alphabetical: 'Alphabetical',
};

const filterLabels: any = {
	dueDate: 'Due Date',
	categories: 'Categories',
};

export default function BehaviorSection() {
	const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
	const { getQueryParam } = useQueryParams();
	const [sortField] = getQueryParam('sort');
	const [filterField] = getQueryParam('filter');
	const dropDownStyle =
		'flex items-center justify-between gap-2 cursor-pointer text-sm border rounded-md px-4 py-2 relative';
	const [selectedSort, setSelectedSort] = useState<string[]>([]);

	return (
		<div className="flex flex-col gap-2">
			<p className="pl-2">Sort tasks by:</p>
			<div className="flex items-center gap-2 mb-4">
				<div className={`${dropDownStyle} w-full`} onClick={() => setIsSortMenuOpen(prev => !prev)}>
					{sortField ? <p>{sortLabels[sortField]}</p> : <p className="text-slate-600">Select Sort</p>}
					<ChevronDown size={20} className="text-slate-600" />
					<SortMenu isOpen={isSortMenuOpen} setIsOpen={setIsSortMenuOpen} width="w-full" top="top-12" header={false} />
				</div>
				<div className={dropDownStyle}>
					<ArrowBigUp size={20} />
					<p>Asc</p>
				</div>
				<Button ariaLabel="Clear Sorting">
					<X />
				</Button>
			</div>

			<p className="pl-2">Filter tasks by:</p>
			<div className="flex items-center gap-2 mb-4">
				<div className={`${dropDownStyle} w-full`} onClick={() => setIsFilterMenuOpen(prev => !prev)}>
					{filterField ? <p>{filterLabels[filterField]}</p> : <p className="text-slate-600">Select Filter</p>}
					<ChevronDown size={20} className="text-slate-600" />
					<FilterMenu
						isOpen={isFilterMenuOpen}
						setIsOpen={setIsFilterMenuOpen}
						width="w-full"
						top="top-12"
						header={false}
					/>
				</div>
				<Button ariaLabel="Clear Sorting">
					<X />
				</Button>
			</div>
			<DropDown selectedItem={selectedSort}>
				<MenuItem onClick={() => setSelectedSort(['Try'])}>
					<p>Try</p>
				</MenuItem>
			</DropDown>
		</div>
	);
}
