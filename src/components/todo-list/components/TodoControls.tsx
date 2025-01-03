import { Button } from '@/components/ui-shared/Button';
import {
	ArrowDownAZ,
	ArrowDownWideNarrow,
	ArrowUpWideNarrow,
	ArrowUpZA,
	CalendarArrowDown,
	CalendarArrowUp,
	X,
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function TodoControls() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [field, order] = searchParams.get('sort')?.split(':') || [];

	const handleSortToggle = () => {
		const newOrder = order === 'desc' ? 'asc' : 'desc';
		const params = new URLSearchParams(searchParams.toString());
		params.set('sort', `${field}:${newOrder}`);
		router.push(`/tasks/?${params.toString()}`);
	};

	const handleRemoveSort = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete('sort');
		router.push(`/tasks/?${params.toString()}`);
	};

	return (
		<div className={`${field ? 'inline-block' : 'hidden'} mb-3 p-1 bg-slate-200 text-slate-700 rounded-lg`}>
			<div className="flex items-center gap-1">
				<Button ariaLabel="Reverse Sort Order" onClick={handleSortToggle}>
					{field === 'dueDate' || field === 'creationDate' ? (
						order === 'desc' ? (
							<CalendarArrowDown size={14} />
						) : (
							<CalendarArrowUp size={14} />
						)
					) : field === 'alphabetical' ? (
						order === 'desc' ? (
							<ArrowDownAZ size={14} />
						) : (
							<ArrowUpZA size={14} />
						)
					) : order === 'desc' ? (
						<ArrowDownWideNarrow size={14} />
					) : (
						<ArrowUpWideNarrow size={14} />
					)}
				</Button>
				{field === 'dueDate' && <p className="text-xs">Due Date ({order === 'desc' ? 'Latest' : 'Earlier'} first)</p>}
				{field === 'creationDate' && (
					<p className="text-xs">Creation Date ({order === 'desc' ? 'Newest' : 'Oldest'} first)</p>
				)}
				{field === 'importance' && <p className="text-xs">Importance</p>}
				<Button ariaLabel="Remove Sort" onClick={handleRemoveSort}>
					<X size={12} />
				</Button>
			</div>
		</div>
	);
}
