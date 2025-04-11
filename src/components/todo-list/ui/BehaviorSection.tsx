import FilterDropDown from '@/components/ui-shared/FilterDropDown';
import RadioButtonGroup from '@/components/ui-shared/RadioButtonGroup';
import SortDropDown from '@/components/ui-shared/SortDropDown';

const headerTextStyle = 'text-lg font-semibold text-slate-700';
const completedTasksOptions = ['Move to "Completed" Section', 'Hide After', 'Hide immediately'];

export default function BehaviorSection() {
	return (
		<div className="flex flex-col gap-2 px-2 overflow-y-auto">
			<p className={headerTextStyle}>Sort</p>
			<SortDropDown />
			<p className={headerTextStyle}>Filter</p>
			<FilterDropDown />
			<p className={headerTextStyle}>Completed Tasks</p>
			<RadioButtonGroup options={completedTasksOptions} />
			<p className={headerTextStyle}>New Tasks Position</p>
			<p className={headerTextStyle}>Due Date Format</p>
		</div>
	);
}
