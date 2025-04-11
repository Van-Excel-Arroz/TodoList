import FilterDropDown from '@/components/ui-shared/FilterDropDown';
import SortDropDown from '@/components/ui-shared/SortDropDown';

export default function BehaviorSection() {
	return (
		<div className="flex flex-col gap-2">
			<p className="pl-2">Sort tasks by:</p>
			<SortDropDown />
			<p className="pl-2">Filter tasks by:</p>
			<FilterDropDown />
			<p>Completed Tasks</p>
			<p>New Tasks Position</p>
			<p>Due Date Format</p>
		</div>
	);
}
