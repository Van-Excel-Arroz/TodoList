import { Category, Todo } from '@/types';
import { create } from 'zustand';

interface TodoContextState {
	selectedTodo: Todo | null;
	setSelectedTodo: (todo: Todo | null) => void;
	updateSelectedTodoCategories: (newCategory: Category) => void;
}

const useTodoStore = create<TodoContextState>()((set: any) => ({
	selectedTodo: null,
	setSelectedTodo: (todo: Todo | null) => set({ selectedTodo: todo }),
	updateSelectedTodoCategories: (newCategory: Category) =>
		set((state: TodoContextState) => ({
			selectedTodo: state.selectedTodo
				? {
						...state.selectedTodo,
						categories: [...(state.selectedTodo.categories || []), newCategory],
				  }
				: null,
		})),
}));

export default useTodoStore;
