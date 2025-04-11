import FilterDropDown from '@/components/ui-shared/FilterDropDown';
import SortDropDown from '@/components/ui-shared/SortDropDown';

export default function BehaviorSection() {
	const headerTextStyle = 'pl-2 text-lg';

	return (
		<div className="flex flex-col gap-2">
			<p className={headerTextStyle}>Sort</p>
			<SortDropDown />
			<p className={headerTextStyle}>Filter</p>
			<FilterDropDown />
			<p className={headerTextStyle}>Completed Tasks</p>
			<p className={headerTextStyle}>New Tasks Position</p>
			<p className={headerTextStyle}>Due Date Format</p>
		</div>
	);
}
