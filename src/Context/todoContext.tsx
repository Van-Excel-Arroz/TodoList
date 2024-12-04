import { Todo } from '@/types';
import { create } from 'zustand';

interface TodoContextState {
	selectedTodo: Todo | null;
	setSelectedTodo: (todo: Todo | null) => void;
	isSelectedTodo: (todoId: number) => boolean;
}

const useTodoStore = create<TodoContextState>()((set: any) => ({
	selectedTodo: null,
	setSelectedTodo: (todo: Todo | null) => set({ selectedTodo: todo }),
	isSelectedTodo: (todoId: number) => {
		return state.selectedTodo?.id === todoId;
	},
}));

export default useTodoStore;
