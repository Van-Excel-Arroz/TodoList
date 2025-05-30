import Button from '@/components/ui-shared/Button';
import DropDown from '@/components/ui-shared/DropDown';
import MenuItem from '@/components/ui-shared/MenuItem';
import { ArrowBigDown, ArrowBigUp, CalendarDays, CalendarPlus, CaseSensitive, Check, Star, X } from 'lucide-react';

interface SortDropDownProps {
	selectedField: string | null;
	selectedOrder: 'asc' | 'desc';
	onFieldSelect: (field: string | null) => void;
	onOrderChange: (order: 'asc' | 'desc') => void;
}

export default function SortDropDown({
	selectedField,
	selectedOrder,
	onFieldSelect,
	onOrderChange,
}: SortDropDownProps) {
	const handleSortOrder = () => {
		const newOrder = selectedOrder === 'asc' ? 'desc' : 'asc';
		onOrderChange(newOrder);
	};

	const SortItems = [
		{ icon: CalendarDays, label: 'Due Date' },
		{ icon: CalendarPlus, label: 'Creation Date' },
		{ icon: Star, label: 'Importance' },
		{ icon: CaseSensitive, label: 'Alphabetical' },
	];

	return (
		<div className="flex flex-row items-center gap-2 mb-4">
			<DropDown selectedItem={selectedField}>
				{SortItems.map(item => (
					<MenuItem key={item.label} className="justify-between" onClick={() => onFieldSelect(item.label)}>
						<div className="flex gap-2">
							<item.icon className="text-slate-600" size={18} />
							<p>{item.label}</p>
						</div>
						{selectedField && (
							<Check size={18} className={`${item.label === selectedField ? 'block' : 'hidden'} text-slate-600`} />
						)}
					</MenuItem>
				))}
			</DropDown>
			<div className="flex items-center gap-2 border px-3 py-2 rounded-md cursor-pointer" onClick={handleSortOrder}>
				{selectedOrder === 'asc' ? <ArrowBigUp size={20} /> : <ArrowBigDown size={20} />}
				<p className="select-none text-sm">{selectedOrder}</p>
			</div>
			<Button ariaLabel="Clear Sorting" onClick={() => onFieldSelect(null)}>
				<X />
			</Button>
		</div>
	);
}
