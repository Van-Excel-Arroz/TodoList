import { Todo } from '@/types';
import { create } from 'zustand';

interface TodosContextState {
	todos: Todo[];
	setTodos: (todos: Todo[]) => void;
}

const useTodosStore = create<TodosContextState>()((set: any) => ({
	todos: [],
	setTodos: (todos: Todo[]) => set({ todos }),
}));

export default useTodosStore;
