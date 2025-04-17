import MenuItem from '@/components/ui-shared/MenuItem';
import useQueryParams from '@/hooks/useQueryParams';
import { CalendarDays, CalendarX2, CheckIcon } from 'lucide-react';

const DateFilters = ['Today', 'Tomorrow', 'This Week', 'This Month', 'No Due Date'];

export default function DateFilterMenu() {
	const { getQueryParam, updateSearchParams } = useQueryParams();
	const [filterField, filterValue] = getQueryParam('filter');
	const [todolistId] = getQueryParam('id');
	const [smart_list] = getQueryParam('smart-list');

	return (
		<>
			{DateFilters.map(label => (
				<MenuItem
					key={label}
					className="flex items-center justify-between"
					onClick={() => updateSearchParams('filter', `Due Date:${label}`, todolistId || smart_list)}
				>
					<div className="flex items-center gap-2">
						{label === 'No Due Date' ? (
							<CalendarX2 size={18} className="text-slate-600" />
						) : (
							<CalendarDays size={18} className="text-slate-600" />
						)}
						<p className="text-md text-left">{label}</p>
					</div>
					<div className="h-3 w-3 mr-2">
						<CheckIcon size={14} className={`${label === filterValue ? 'block' : 'hidden'}`} />
					</div>
				</MenuItem>
			))}
		</>
	);
}
