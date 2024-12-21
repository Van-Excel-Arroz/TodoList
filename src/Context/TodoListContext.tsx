import { create } from 'zustand';
import { TodoList } from '@/types';

interface TodoListContextState {
	todolist: TodoList | null;
	setTodoList: (todolist: TodoList) => void;
}

const useTodoListStore = create<TodoListContextState>()((set: any) => ({
	todolist: null,
	setTodoList: (todolist: TodoList) => set({ todolist: todolist }),
}));

export default useTodoListStore;
