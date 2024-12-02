import { Todo } from '@/types';
import { create } from 'zustand';

interface TodoContextState {
	selectedTodo: Todo | null;
	setSelectedTodo: (todo: Todo) => void;
}

const useTodoStore = create<TodoContextState>()((set: any) => ({
	selectedTodo: null,
	setSelectedTodo: todo => set({ selectedTodo: todo }),
}));

export default useTodoStore;
