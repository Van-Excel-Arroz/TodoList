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

export default function BehaviorSection() {
	const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
	const { getQueryParam } = useQueryParams();
	const [sortField] = getQueryParam('sort');

	return (
		<div className="space-y-1">
			<p className="pl-2">Sort tasks by:</p>
			<div className="border rounded-md px-4 py-2 relative" onClick={() => setIsSortMenuOpen(prev => !prev)}>
				<div className="flex items-center justify-between cursor-pointer text-sm">
					{sortField ? <p>{sortLabels[sortField]}</p> : <p className="text-slate-600">Select Sort</p>}
					<ChevronDown size={20} className="text-slate-600" />
				</div>
				<SortMenu
					isMenuOpen={isSortMenuOpen}
					setIsMenuOpen={setIsSortMenuOpen}
					width="w-full"
					top="top-12"
					header={false}
				/>
			</div>
			<p className="pl-2">Filter tasks by:</p>
			<div className="border rounded-md px-4 py-2 relative" onClick={() => setIsSortMenuOpen(prev => !prev)}>
				<div className="flex items-center justify-between cursor-pointer text-sm">
					{sortField ? <p>{sortLabels[sortField]}</p> : <p className="text-slate-600">Select Filter</p>}
					<ChevronDown size={20} className="text-slate-600" />
				</div>
			</div>
		</div>
	);
}
