'use client';

import { Button } from '@/components/ui-shared/Button';
import updateSearchParams from '@/utils/updateSearchParams';
import {
	ArrowDownAZIcon,
	ArrowUpZAIcon,
	CalendarArrowDownIcon,
	CalendarArrowUpIcon,
	ArrowDownWideNarrowIcon,
	ArrowUpWideNarrowIcon,
	XIcon,
} from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

const sortIcons: any = {
	dueDate: { asc: CalendarArrowUpIcon, desc: CalendarArrowDownIcon },
	creationDate: { asc: CalendarArrowUpIcon, desc: CalendarArrowDownIcon },
	alphabetical: { asc: ArrowUpZAIcon, desc: ArrowDownAZIcon },
	importance: { asc: ArrowUpWideNarrowIcon, desc: ArrowDownWideNarrowIcon },
};

const sortLabels: any = {
	dueDate: (order: string) => `Due Date (${order === 'desc' ? 'Latest' : 'Earlier'} first)`,
	creationDate: (order: string) => `Creation Date (${order === 'desc' ? 'Newest' : 'Oldest'} first)`,
	importance: () => 'Importance',
	alphabetical: () => 'Alphabetical',
};

export default function TodoControls() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [field, order]: string[] = searchParams.get('sort')?.split(':') ?? [];

	const SortIcon = sortIcons[field]?.[order] ?? ArrowDownWideNarrowIcon;

	return (
		<div className={`${field ? 'inline-block' : 'hidden'} mb-3 p-1 bg-slate-200 text-slate-700 rounded-lg`}>
			<div className="flex items-center gap-1">
				<Button
					ariaLabel="Reverse Sort Order"
					onClick={() => updateSearchParams(field, order)}
					className="hover:bg-slate-300 active:bg-slate-400"
				>
					<SortIcon size={14} />
				</Button>
				<p className="text-xs">{sortLabels[field]?.(order) ?? field}</p>
				<Button
					ariaLabel="Remove Sort"
					onClick={() => updateSearchParams(null)}
					className="hover:bg-slate-300 active:bg-slate-400"
				>
					<XIcon size={12} />
				</Button>
			</div>
		</div>
	);
}
