import { Todo } from '@/types';
import { create } from 'zustand';

interface TodosContextState {
	initialTodos: Todo[];
	setTodos: (todos: Todo[]) => void;
}

const useTodosStore = create<TodosContextState>()((set: any) => ({
	initialTodos: [],
	setTodos: (todos: Todo[]) => set({ initialTodos: todos }),
	addTodo: (newTodo: Todo) =>
		set((state: TodosContextState) => ({
			initialTodos: [...state.initialTodos, newTodo],
		})),
}));

export default useTodosStore;
