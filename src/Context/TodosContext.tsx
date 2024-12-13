import { Todo } from '@/types';
import { create } from 'zustand';

interface TodosContextState {
	initialTodos: Todo[];
}

const useTodosStore = create<TodosContextState>()((set: any) => ({
	initialTodos: [],
}));
