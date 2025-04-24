import { SettingsToSave, TodoListSettings } from '@/utils/types';
import { useEffect, useState } from 'react';
import useQueryParams from './useQueryParams';
import _, { isEqual, lowerFirst, upperFirst } from 'lodash';
import useTodoListsStore from '@/context/TodoListsContext';
import { iconNameType } from '@/components/sidebar/ui/ListIcon';

export default function useTodoListSettings() {
	const { getQueryParam, updateSearchParams } = useQueryParams();
	const [filterField, filterValue] = getQueryParam('filter');
	const [sortField, sortOrder] = getQueryParam('sort');
	const [todolistId] = getQueryParam('id');
	const [view] = getQueryParam('view');
	const layoutValue = upperFirst(view);
	const { updateTodoListIcon } = useTodoListsStore();

	const defaultTodoListSettings: TodoListSettings = {
		behavior: {
			filterField: filterField ?? null,
			filterValue: filterValue ?? null,
			sortField: sortField ?? null,
			sortOrder: (sortOrder as 'asc' | 'desc') ?? 'asc',
			completedTasks: 'Move to "Completed" Section',
			newTasksPosition: 'Add to Top',
			dueDateFormat: 'Relative (2 days left, yesterday)',
		},
		appearance: {
			accent: '#6b7280',
			listIcon: 'List',
			layout: layoutValue,
		},
	};

	const [todoListSettings, setTodoListSettings] = useState<TodoListSettings>(defaultTodoListSettings);
	const [todoListSettingsSnapShot, setTodoListSettingsSnapShot] = useState<TodoListSettings>(defaultTodoListSettings);

	useEffect(() => {
		const settingsFromStorage = localStorage.getItem(`todolistSettings-${todolistId}`);
		if (settingsFromStorage) {
			const parseSettings: SettingsToSave = JSON.parse(settingsFromStorage);
			const newTodoListSettings: TodoListSettings = {
				behavior: {
					filterField: filterField ?? null,
					filterValue: filterValue ?? null,
					sortField: sortField ?? null,
					sortOrder: (sortOrder as 'asc' | 'desc') ?? 'asc',
					completedTasks: parseSettings.completedTasks,
					newTasksPosition: parseSettings.newTasksPosition,
					dueDateFormat: parseSettings.dueDateFormat,
				},
				appearance: {
					accent: parseSettings.accent,
					listIcon: parseSettings.listIcon,
					layout: layoutValue,
				},
			};

			setTodoListSettings(newTodoListSettings);
			setTodoListSettingsSnapShot(newTodoListSettings);
		}
	}, [todolistId]);

	const handleSaveSettings = () => {
		const behaviorSettings = todoListSettings.behavior;
		const appearanceSettings = todoListSettings.appearance;

		const settingsToSave: SettingsToSave = {
			completedTasks: behaviorSettings.completedTasks,
			newTasksPosition: behaviorSettings.newTasksPosition,
			dueDateFormat: behaviorSettings.dueDateFormat,
			accent: appearanceSettings.accent,
			listIcon: appearanceSettings.listIcon,
		};
		localStorage.setItem(`todolistSettings-${todolistId}`, JSON.stringify(settingsToSave));

		const newIcon = appearanceSettings.listIcon as iconNameType;
		updateTodoListIcon(Number(todolistId), newIcon);

		const filterField = behaviorSettings.filterField;
		const filterValue = behaviorSettings.filterValue;
		const sortField = behaviorSettings.sortField;
		const sortOrder = behaviorSettings.sortOrder;
		const newLayoutValue = appearanceSettings.layout;
		const oldLayoutValue = todoListSettingsSnapShot.appearance.layout;

		const newFilterValue = filterValue !== null ? `${filterField}:${filterValue}` : null;
		const newSortValue = sortField !== null ? `${sortField}:${sortOrder}` : null;
		const layoutValue = newLayoutValue !== oldLayoutValue ? newLayoutValue : oldLayoutValue;

		if (newFilterValue || newSortValue || newLayoutValue) {
			updateSearchParams('filter', newFilterValue, todolistId, 'sort', newSortValue, 'view', lowerFirst(layoutValue));
		}
	};

	const isDirty = !isEqual(todoListSettings, todoListSettingsSnapShot);

	return { todoListSettings, setTodoListSettings, handleSaveSettings, isDirty };
}
