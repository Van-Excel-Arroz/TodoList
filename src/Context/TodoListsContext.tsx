import { TodoList } from '@/types';
import { create } from 'zustand';

interface TodoListContextState {
	todolists: TodoList[];
	setTodolists: (todolists: TodoList[]) => void;
	addTodolist: (newTodolist: TodoList) => void;
	updateTodolistTitle: (todolistId: number, newTitle: string) => void;
}

const useTodoListsStore = create<TodoListContextState>()((set: any) => ({
	todolists: [],
	setTodolists: (todolists: TodoList[]) => set({ todolists: todolists }),
	addTodolist: (newTodolist: TodoList) =>
		set((state: TodoListContextState) => ({
			todolists: [...state.todolists, newTodolist],
		})),
	updateTodolistTitle: (todolistId: number, newTitle: string) =>
		set((state: TodoListContextState) => ({
			todolits: state.todolists.map(todolist =>
				todolist.id === todolistId ? { ...todolist, title: newTitle } : todolist
			),
		})),
}));

export default useTodoListsStore;
