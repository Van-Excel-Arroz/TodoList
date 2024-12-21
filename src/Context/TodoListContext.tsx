import { create } from 'zustand';
import { TodoList } from '@/types';

interface TodoListContextState {
	todolist: TodoList | null;
	setTodoList: (todolist: TodoList) => void;
}

const useTodoListStore = create<TodoListContextState>()((set: any) => ({
	todolist: null,
	setTodoList: (todolist: TodoList) => set({ todolist: todolist }),
	updateTitle: (todolistId: number, newTitle: string) =>
		set((state: TodoListContextState) => ({
			todolist: state.todolist?.id === todolistId ? { ...state.todolist, title: newTitle } : state.todolist,
		})),
}));

export default useTodoListStore;
