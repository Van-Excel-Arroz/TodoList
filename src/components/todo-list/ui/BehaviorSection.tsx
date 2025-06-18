import FilterDropDown from '@/components/ui-shared/FilterDropDown';
import RadioButtonGroup from '@/components/ui-shared/RadioButtonGroup';
import SortDropDown from '@/components/ui-shared/SortDropDown';
import Typography from '@/components/ui-shared/Typography';
import { BehaviorSettings } from '@/utils/types';

interface BehaviorSectionProps {
	settings: BehaviorSettings;
	updateSetting: (key: keyof BehaviorSettings, value: string | null | 'asc' | 'desc') => void;
}

const completedTasksOptions = ['Move to "Completed" Section', 'Hide immediately'];
const newTasksPositionOptions = ['Add to Top', 'Add to Bottom'];
const dueDateFormatOptions = [
	'Relative (2 days left, yesterday)',
	'Short Date (mm/dd/yyyy)',
	'Long Date (Jan 1, 2025)',
];

export default function BehaviorSection({ settings, updateSetting }: BehaviorSectionProps) {
	return (
		<div className="overflow-y-auto px-2 h-[60vh]">
			<Typography>Filter</Typography>
			<FilterDropDown
				selectedField={settings.filterField}
				selectedValue={settings.filterValue}
				onFieldChange={newField => updateSetting('filterField', newField)}
				onValueSelect={newValue => updateSetting('filterValue', newValue)}
			/>
			<Typography>Sort</Typography>
			<SortDropDown
				selectedField={settings.sortField}
				selectedOrder={settings.sortOrder}
				onFieldSelect={newOption => updateSetting('sortField', newOption)}
				onOrderChange={newOrder => updateSetting('sortOrder', newOrder)}
			/>
			<Typography>Completed Tasks</Typography>
			<RadioButtonGroup
				options={completedTasksOptions}
				selectedOption={settings.completedTasks}
				onOptionSelect={newOption => updateSetting('completedTasks', newOption)}
			/>
			<Typography>New Tasks Position</Typography>
			<RadioButtonGroup
				options={newTasksPositionOptions}
				selectedOption={settings.newTasksPosition}
				onOptionSelect={newOption => updateSetting('newTasksPosition', newOption)}
			/>
			<Typography>Due Date Format</Typography>
			<RadioButtonGroup
				options={dueDateFormatOptions}
				selectedOption={settings.dueDateFormat}
				onOptionSelect={newOption => updateSetting('dueDateFormat', newOption)}
			/>
		</div>
	);
}
