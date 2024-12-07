import { Category, Todo } from '@/types';
import { create } from 'zustand';

interface TodoContextState {
	selectedTodo: Todo | null;
	setSelectedTodo: (todo: Todo | null) => void;
	updateSelectedTodoCategory: (newCategory: Category) => void;
	removeSelectedTodoCategory: (categoryId: number) => void;
	updateSelectedTodoTitle: (newTitle: string) => void;
}

const useTodoStore = create<TodoContextState>()((set: any) => ({
	selectedTodo: null,
	setSelectedTodo: (todo: Todo | null) => set({ selectedTodo: todo }),
	updateSelectedTodoCategory: (newCategory: Category) =>
		set((state: TodoContextState) => ({
			selectedTodo: state.selectedTodo
				? {
						...state.selectedTodo,
						categories: [...(state.selectedTodo.categories || []), newCategory],
				  }
				: null,
		})),
	removeSelectedTodoCategory: (categoryId: number) =>
		set((state: TodoContextState) => ({
			selectedTodo: state.selectedTodo
				? {
						...state.selectedTodo,
						categories: state.selectedTodo.categories?.filter(category => category.id !== categoryId),
				  }
				: null,
		})),
	updateSelectedTodoTitle: (newTitle: string) =>
		set((state: TodoContextState) => ({
			selectedTodo: state.selectedTodo ? { ...state.selectedTodo, task_text: newTitle } : null,
		})),
}));

export default useTodoStore;
