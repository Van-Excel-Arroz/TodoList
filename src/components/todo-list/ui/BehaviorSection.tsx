import FilterDropDown from '@/components/ui-shared/FilterDropDown';
import RadioButtonGroup from '@/components/ui-shared/RadioButtonGroup';
import SortDropDown from '@/components/ui-shared/SortDropDown';

const completedTasksOptions = ['Move to "Completed" Section', 'Hide After', 'Hide immediately'];
const newTasksPositionOptions = ['Add to Top', 'Add to Bottom'];
const dueDateFormatOptions = [
	'Relative (2 days left,  yesterday)',
	'Short Date (mm/dd/yyyy)',
	'Long Date (Jan 1, 2025)',
];

export default function BehaviorSection({ headerTextStyle }: { headerTextStyle: string }) {
	return (
		<>
			<p className={headerTextStyle}>Filter</p>
			<FilterDropDown />
			<p className={headerTextStyle}>Sort</p>
			<SortDropDown />
			<p className={headerTextStyle}>Completed Tasks</p>
			<RadioButtonGroup options={completedTasksOptions} />
			<p className={headerTextStyle}>New Tasks Position</p>
			<RadioButtonGroup options={newTasksPositionOptions} />
			<p className={headerTextStyle}>Due Date Format</p>
			<RadioButtonGroup options={dueDateFormatOptions} />
		</>
	);
}
