import { Category, Todo } from '@/types';
import { create } from 'zustand';

interface SelectedTodoContextState {
	selectedTodo: Todo | null;
	setSelectedTodo: (todo: Todo | null) => void;
	updateSelectedTodoCategory: (newCategory: Category) => void;
	removeSelectedTodoCategory: (categoryId: number) => void;
	updateSelectedTodoTitle: (newTitle: string) => void;
	toggleSelectedTodoCompletion: (todoId: number) => void;
	updateSelectedTodoDueDate: (newDate: string) => void;
}

const useSelectedTodoStore = create<SelectedTodoContextState>()((set: any) => ({
	selectedTodo: null,
	setSelectedTodo: (todo: Todo | null) => set({ selectedTodo: todo }),
	updateSelectedTodoCategory: (newCategory: Category) =>
		set((state: SelectedTodoContextState) => ({
			selectedTodo: {
				...state.selectedTodo,
				categories: [...(state.selectedTodo!.categories || []), newCategory],
			},
		})),
	removeSelectedTodoCategory: (categoryId: number) =>
		set((state: SelectedTodoContextState) => ({
			selectedTodo: {
				...state.selectedTodo,
				categories: state.selectedTodo!.categories?.filter(category => category.id !== categoryId),
			},
		})),
	updateSelectedTodoTitle: (newTitle: string) =>
		set((state: SelectedTodoContextState) => ({
			selectedTodo: { ...state.selectedTodo, task_text: newTitle },
		})),
	toggleSelectedTodoCompletion: (todoId: number) =>
		set((state: SelectedTodoContextState) => ({
			selectedTodo:
				state.selectedTodo && state.selectedTodo.id === todoId
					? { ...state.selectedTodo, is_completed: !state.selectedTodo.is_completed }
					: state.selectedTodo,
		})),
	updateSelectedTodoDueDate: (newDate: string) =>
		set((state: SelectedTodoContextState) => ({
			selectedTodo: { ...state.selectedTodo, due_datetime: newDate },
		})),
}));

export default useSelectedTodoStore;
