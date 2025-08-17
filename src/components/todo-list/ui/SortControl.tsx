import Button from '@/components/ui-shared/Button';
import useQueryParams from '@/hooks/useQueryParams';
import {
	ArrowDownAZIcon,
	ArrowUpZAIcon,
	CalendarArrowDownIcon,
	CalendarArrowUpIcon,
	ArrowDownWideNarrowIcon,
	ArrowUpWideNarrowIcon,
	XIcon,
} from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

const sortIcons: any = {
	dueDate: { asc: CalendarArrowUpIcon, desc: CalendarArrowDownIcon },
	creationDate: { asc: CalendarArrowUpIcon, desc: CalendarArrowDownIcon },
	alphabetical: { asc: ArrowUpZAIcon, desc: ArrowDownAZIcon },
	importance: { asc: ArrowUpWideNarrowIcon, desc: ArrowDownWideNarrowIcon },
};

const sortLabels: any = {
	dueDate: () => 'Due Date',
	creationDate: () => 'Creation Date',
	importance: () => 'Importance',
	alphabetical: () => 'Alphabetical',
};

export default function SortControl({ setIsSortMenuOpen }: { setIsSortMenuOpen: Dispatch<SetStateAction<boolean>> }) {
	const { getQueryParam, updateSearchParams } = useQueryParams();
	const [sortField, sortValue] = getQueryParam('sort');
	const [todolistId] = getQueryParam('id');
	const [smart_list] = getQueryParam('smart-list');
	const SortIcon = sortIcons[sortField] ?? { asc: ArrowUpWideNarrowIcon, desc: ArrowDownWideNarrowIcon };

	const handleReverseSort = (isSorting: boolean) => {
		const paramSortValue = sortValue === 'asc' ? `${sortField}:desc` : `${sortField}:asc`;
		const paramValue = isSorting ? paramSortValue : null;
		updateSearchParams({ sort: paramValue }, todolistId || smart_list);
	};

	return (
		<div className="flex items-center gap-1">
			<Button
				ariaLabel="Reverse Sort Order"
				onClick={() => handleReverseSort(true)}
				className="hover:bg-slate-300 active:bg-slate-400"
			>
				{sortValue === 'asc' ? <SortIcon.asc size={16} /> : <SortIcon.desc size={16} />}
			</Button>
			<Button
				ariaLabel="Change Filter"
				onClick={() => setIsSortMenuOpen(prev => !prev)}
				className="text-[12px] hover:bg-slate-300 active:bg-slate-400"
			>
				<p>{sortLabels[sortField]?.() ?? sortField}</p>
			</Button>
			<Button
				ariaLabel="Remove Sort"
				onClick={() => handleReverseSort(false)}
				className="hover:bg-slate-300 active:bg-slate-400"
			>
				<XIcon size={16} />
			</Button>
		</div>
	);
}
