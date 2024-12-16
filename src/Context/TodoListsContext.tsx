import { TodoList } from '@/types';
import { create } from 'zustand';

interface TodoListContextState {
	todolists: TodoList[];
	setTodolists: (todolists: TodoList[]) => void;
	addTodolist: (newTodolist: TodoList) => void;
}

const useTodoListsStore = create<TodoListContextState>()((set: any) => ({
	todolists: [],
	setTodolists: (todolists: TodoList[]) => set({ todolists: todolists }),
	addTodolist: (newTodolist: TodoList) =>
		set((state: TodoListContextState) => ({
			todolists: [...state.todolists, newTodolist],
		})),
}));

export default useTodoListsStore;
