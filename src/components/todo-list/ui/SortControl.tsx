import { Button } from '@/components/ui-shared/Button';
import useUpdateSearchParams from '@/hooks/useUpdateSearchParams';
import { useSearchParams } from 'next/navigation';
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
import { useQueryParam } from '@/hooks/useQueryParam';

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
	const updateSearchParams = useUpdateSearchParams();
	const queryParam = useQueryParam();
	const [sortField, sortValue] = queryParam('sort');
	const SortIcon = sortIcons[sortField] ?? ArrowDownWideNarrowIcon;

	return (
		<div className="flex items-center gap-1 p-1 bg-slate-200 text-slate-700 rounded-lg border border-slate-300 hover:border-slate-400">
			<p className="text-xs pl-1">Sort by: </p>
			<Button
				ariaLabel="Reverse Sort Order"
				onClick={() => updateSearchParams('sort', sortValue === 'asc' ? `${sortField}:desc` : `${sortField}:asc`)}
				className="hover:bg-slate-300 active:bg-slate-400"
			>
				{sortValue === 'asc' ? <SortIcon.asc size={14} /> : <SortIcon.desc size={14} />}
			</Button>
			<Button
				ariaLabel="Change Filter"
				onClick={() => setIsSortMenuOpen(prev => !prev)}
				className="text-xs hover:bg-slate-300 active:bg-slate-400"
			>
				<p>{sortLabels[sortField]?.() ?? sortField}</p>
			</Button>
			<Button
				ariaLabel="Remove Sort"
				onClick={() => updateSearchParams('sort', null)}
				className="hover:bg-slate-300 active:bg-slate-400"
			>
				<XIcon size={12} />
			</Button>
		</div>
	);
}
