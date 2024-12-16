import { TodoList } from '@/types';
import { create } from 'zustand';

interface TodoListContextState {
	todolists: TodoList[];
	setTodolists: (todolists: TodoList[]) => void;
}

const useTodoListsStore = create<TodoListContextState>()((set: any) => ({
	todolists: [],
	setTodolists: (todolists: TodoList[]) => set({ todolists: todolists }),
}));

export default useTodoListsStore;
