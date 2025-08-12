import { TodoListSettings } from '@/utils/types';
import { useEffect, useState } from 'react';
import useQueryParams from './useQueryParams';
import _, { isEqual, lowerFirst, upperFirst } from 'lodash';
import useTodoListsStore from '@/context/TodoListsContext';

export default function useTodoListSettings() {
	const { getQueryParam, updateSearchParams } = useQueryParams();
	const [filterField, filterValue] = getQueryParam('filter');
	const [sortField, sortOrder] = getQueryParam('sort');
	const [todolistId] = getQueryParam('id');
	const [view] = getQueryParam('view');
	const layoutValue = upperFirst(view);
	const { updateTodoListSettings } = useTodoListsStore();

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
			const parseSettings: TodoListSettings = JSON.parse(settingsFromStorage);
			if (parseSettings) {
				const newTodoListSettings: TodoListSettings = {
					behavior: {
						filterField: filterField ?? null,
						filterValue: filterValue ?? null,
						sortField: sortField ?? null,
						sortOrder: (sortOrder as 'asc' | 'desc') ?? 'asc',
						completedTasks: parseSettings.behavior.completedTasks,
						newTasksPosition: parseSettings.behavior.newTasksPosition,
						dueDateFormat: parseSettings.behavior.dueDateFormat,
					},
					appearance: {
						accent: parseSettings.appearance.accent,
						listIcon: parseSettings.appearance.listIcon,
						layout: layoutValue,
					},
				};

				setTodoListSettings(newTodoListSettings);
				setTodoListSettingsSnapShot(newTodoListSettings);
			}
		}
	}, [todolistId]);

	const handleSaveSettings = () => {
		const behaviorSettings = todoListSettings.behavior;
		const appearanceSettings = todoListSettings.appearance;

		localStorage.setItem(
			`todolistSettings-${todolistId}`,
			JSON.stringify({ behavior: behaviorSettings, appearance: appearanceSettings })
		);

		updateTodoListSettings(Number(todolistId), todoListSettings);

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
			updateSearchParams({ filter: newFilterValue, sort: newSortValue, view: lowerFirst(layoutValue) }, todolistId);
		}
	};

	const isDirty = !isEqual(todoListSettings, todoListSettingsSnapShot);

	return { todoListSettings, setTodoListSettings, handleSaveSettings, isDirty };
}
