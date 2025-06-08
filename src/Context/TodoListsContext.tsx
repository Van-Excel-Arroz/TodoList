import { TodoList, TodoListSettings } from '@/utils/types';
import { create } from 'zustand';

interface TodoListContextState {
	todolists: TodoList[];
	setTodolists: (todolists: TodoList[]) => void;
	addTodolist: (newTodolist: TodoList) => void;
	updateTodolistTitle: (todolistId: number, newTitle: string) => void;
	updateTodoListSettings: (todolistId: number, settings: TodoListSettings) => void;
	deleteTodolist: (todolistId: number) => void;
	getTodoListById: (todolistId: number) => TodoList | undefined;
	getTodoListSettingValue: <
		SettingCategory extends keyof TodoListSettings,
		SettingKey extends keyof TodoListSettings[SettingCategory]
	>(
		settingCategory: SettingCategory,
		settingKey: SettingKey,
		todolistId: number
	) => TodoListSettings[SettingCategory][SettingKey] | null;
}

const useTodoListsStore = create<TodoListContextState>()((set: any, get: any) => ({
	todolists: [],
	setTodolists: (todolists: TodoList[]) => set({ todolists: todolists }),
	addTodolist: (newTodolist: TodoList) =>
		set((state: TodoListContextState) => ({
			todolists: [...state.todolists, newTodolist],
		})),
	updateTodolistTitle: (todolistId: number, newTitle: string) =>
		set((state: TodoListContextState) => ({
			todolists: state.todolists.map(todolist =>
				todolist.id === todolistId ? { ...todolist, title: newTitle } : todolist
			),
		})),
	updateTodoListSettings: (todolisId: number, settings: TodoListSettings) =>
		set((state: TodoListContextState) => ({
			todolists: state.todolists.map(todolist =>
				todolist.id === todolisId ? { ...todolist, settings: settings } : todolist
			),
		})),
	deleteTodolist: (todolistId: number) =>
		set((state: TodoListContextState) => ({
			todolists: state.todolists.filter(todolist => todolist.id !== todolistId),
		})),
	getTodoListById: (todolistId: number) => {
		return get().todolists.find((todolist: TodoList) => todolist.id === todolistId);
	},
	getTodoListSettingValue: <
		SettingCategory extends keyof TodoListSettings,
		SettingKey extends keyof TodoListSettings[SettingCategory]
	>(
		settingCategory: SettingCategory,
		settingKey: SettingKey,
		todolistId: number
	) => {
		const todolist = get().todolists.find((todolist: TodoList) => todolist.id === todolistId);
		if (todolist && todolist.settings) {
			const categorySettings = todolist.settings[settingCategory];
			if (categorySettings && typeof categorySettings === 'object' && settingKey in categorySettings) {
				return categorySettings[
					settingKey as keyof typeof categorySettings
				] as TodoListSettings[SettingCategory][SettingKey];
			}
		}
		return null;
	},
}));

export default useTodoListsStore;
