import { TodoList } from '@/types';
import { create } from 'zustand';

interface TodoListContextState {
	todolists: TodoList[];
	setTodolists: (todolists: TodoList[]) => void;
	addTodolist: (newTodolist: TodoList) => void;
	updateTodolistTitle: (todolistId: number, newTitle: string) => void;
	deleteTodolist: (todolisId: number) => void;
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
			todolists: state.todolists.map(todolist =>
				todolist.id === todolistId ? { ...todolist, title: newTitle } : todolist
			),
		})),
	deleteTodolist()
}));

export default useTodoListsStore;
