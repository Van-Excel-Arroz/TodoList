import { Todo } from '@/types';
import { create } from 'zustand';

interface SelectedTodoContextState {
	selectedTodo: Todo | null;
	setSelectedTodo: (todo: Todo | null) => void;
}

const useSelectedTodoStore = create<SelectedTodoContextState>()((set: any) => ({
	selectedTodo: null,
	setSelectedTodo: (todo: Todo | null) => set({ selectedTodo: todo }),
}));

export default useSelectedTodoStore;
