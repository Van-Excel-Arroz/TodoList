import { useState } from 'react';
import SortMenu from './SortMenu';
import useQueryParams from '@/hooks/useQueryParams';
import { ChevronDown } from 'lucide-react';
import FilterMenu from './FilterMenu';

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
	const dropDownStyle = 'flex items-center justify-between cursor-pointer text-sm border rounded-md px-4 py-2 relative';

	return (
		<>
			<div className="space-y-1">
				<p className="pl-2">Sort tasks by:</p>
				<div className={dropDownStyle} onClick={() => setIsSortMenuOpen(prev => !prev)}>
					{sortField ? <p>{sortLabels[sortField]}</p> : <p className="text-slate-600">Select Sort</p>}
					<ChevronDown size={20} className="text-slate-600" />
					<SortMenu isOpen={isSortMenuOpen} setIsOpen={setIsSortMenuOpen} width="w-full" top="top-12" header={false} />
				</div>
			</div>

			<div className="space-y-1">
				<p className="pl-2">Filter tasks by:</p>
				<div className={dropDownStyle} onClick={() => setIsFilterMenuOpen(prev => !prev)}>
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
			</div>
		</>
	);
}
