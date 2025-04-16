import FilterDropDown from '@/components/ui-shared/FilterDropDown';
import RadioButtonGroup from '@/components/ui-shared/RadioButtonGroup';
import SortDropDown from '@/components/ui-shared/SortDropDown';
import { BehaviorSettings } from '@/utils/types';

interface BehaviorSectionProps {
	headerTextStyle: string;
	settings: BehaviorSettings;
	updateSetting: (key: keyof BehaviorSettings, value: any) => void;
}

const completedTasksOptions = ['Move to "Completed" Section', 'Hide After', 'Hide immediately'];
const newTasksPositionOptions = ['Add to Top', 'Add to Bottom'];
const dueDateFormatOptions = ['Relative (2 days left)', 'Short Date (mm/dd/yyyy)', 'Long Date (Jan 1, 2025)'];

export default function BehaviorSection({ headerTextStyle, settings, updateSetting }: BehaviorSectionProps) {
	return (
		<div className="overflow-y-auto h-[60vh]">
			<p className={headerTextStyle}>Filter</p>
			<FilterDropDown
				selectedOption={settings.filter}
				onOptionSelect={newOption => updateSetting('filter', newOption)}
			/>
			<p className={headerTextStyle}>Sort</p>
			<SortDropDown
				selectedField={settings.sortField}
				selectedOrder={settings.sortOrder}
				onFieldSelect={newOption => updateSetting('sortField', newOption)}
				onOrderChange={newOrder => updateSetting('sortOrder', newOrder)}
			/>
			<p className={headerTextStyle}>Completed Tasks</p>
			<RadioButtonGroup
				options={completedTasksOptions}
				selectedOption={settings.completedTasks}
				onOptionSelect={newOption => updateSetting('completedTasks', newOption)}
			/>
			<p className={headerTextStyle}>New Tasks Position</p>
			<RadioButtonGroup
				options={newTasksPositionOptions}
				selectedOption={settings.newTasksPosition}
				onOptionSelect={newOption => updateSetting('newTasksPosition', newOption)}
			/>
			<p className={headerTextStyle}>Due Date Format</p>
			<RadioButtonGroup
				options={dueDateFormatOptions}
				selectedOption={settings.dueDateFormat}
				onOptionSelect={newOption => updateSetting('dueDateFormat', newOption)}
			/>
		</div>
	);
}
