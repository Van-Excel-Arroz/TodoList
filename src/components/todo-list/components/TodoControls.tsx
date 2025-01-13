'use client';

import { Button } from '@/components/ui-shared/Button';
import useUpdateSearchParams from '@/hooks/useUpdateSearchParams';
import {
	ArrowDownAZIcon,
	ArrowUpZAIcon,
	CalendarArrowDownIcon,
	CalendarArrowUpIcon,
	ArrowDownWideNarrowIcon,
	ArrowUpWideNarrowIcon,
	XIcon,
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';

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

export default function TodoControls() {
	const searchParams = useSearchParams();
	const updateSearchParams = useUpdateSearchParams();
	const [field, order]: string[] = searchParams.get('sort')?.split(':') ?? [];

	const SortIcon = sortIcons[field]?.[order] ?? ArrowDownWideNarrowIcon;

	return (
		<div className={`${field ? 'inline-block' : 'hidden'} p-1 bg-slate-200 text-slate-700 rounded-lg`}>
			<div className="flex items-center gap-1">
				<p className="text-xs pl-1">Sort by: </p>
				<Button
					ariaLabel="Reverse Sort Order"
					onClick={() => updateSearchParams('sort', order === 'asc' ? `${field}:desc` : `${field}:asc`)}
					className="hover:bg-slate-300 active:bg-slate-400"
				>
					<SortIcon size={14} />
				</Button>
				<Button ariaLabel="Select Filter" className="text-xs">
					{sortLabels[field]?.() ?? field}
				</Button>
				<Button
					ariaLabel="Remove Sort"
					onClick={() => updateSearchParams('sort', null)}
					className="hover:bg-slate-300 active:bg-slate-400"
				>
					<XIcon size={12} />
				</Button>
			</div>
		</div>
	);
}
