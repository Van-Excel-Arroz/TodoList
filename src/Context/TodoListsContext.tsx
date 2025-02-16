import { TodoList } from '@/utils/types';
import { create } from 'zustand';

interface TodoListContextState {
	todolists: TodoList[];
	setTodolists: (todolists: TodoList[]) => void;
	addTodolist: (newTodolist: TodoList) => void;
	updateTodolistTitle: (todolistId: number, newTitle: string) => void;
	deleteTodolist: (todolistId: number) => void;
	getTodoListById: (todolistId: number) => TodoList;
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
	deleteTodolist: (todolistId: number) =>
		set((state: TodoListContextState) => ({
			todolists: state.todolists.filter(todolist => todolist.id !== todolistId),
		})),
	getTodoListById: (todolistId: number) => {
		return get().todolists.find((todolist: TodoList) => todolist.id === todolistId);
	},
}));

export default useTodoListsStore;
