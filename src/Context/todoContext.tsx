import { Todo } from '@/types';
import { create } from 'zustand';

interface TodoContextState {
	selectedTodo: Todo | null;
	setSelectedTodo: (todo: Todo | null) => void;
}

const useTodoStore = create<TodoContextState>()((set: any) => ({
	selectedTodo: null,
	setSelectedTodo: (todo: Todo | null) => set({ selectedTodo: todo }),
}));

export default useTodoStore;
