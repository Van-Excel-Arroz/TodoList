import { Category, Todo } from '@/types';
import { create } from 'zustand';

interface SelectedTodoContextState {
	selectedTodo: Todo | null;
	setSelectedTodo: (todo: Todo | null) => void;
	updateSelectedTodoTitle: (newTitle: string) => void;
	updateSelectedTodoCategory: (newCategory: Category) => void;
	removeSelectedTodoCategory: (categoryId: number) => void;
	toggleSelectedTodoCompletion: (todoId: number) => void;
	updateSelectedTodoDueDate: (newDate: Date | undefined) => void;
	updateSelectedTodoDescription: (newDescription: Date | null) => void;
}

const useSelectedTodoStore = create<SelectedTodoContextState>()((set: any) => ({
	selectedTodo: null,
	setSelectedTodo: (todo: Todo | null) => set({ selectedTodo: todo }),
	updateSelectedTodoTitle: (newTitle: string) =>
		set((state: SelectedTodoContextState) => ({
			selectedTodo: { ...state.selectedTodo, task_text: newTitle },
		})),
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
	toggleSelectedTodoCompletion: (todoId: number) =>
		set((state: SelectedTodoContextState) => ({
			selectedTodo:
				state.selectedTodo && state.selectedTodo.id === todoId
					? { ...state.selectedTodo, is_completed: !state.selectedTodo.is_completed }
					: state.selectedTodo,
		})),
	updateSelectedTodoDueDate: (newDate: Date | undefined) =>
		set((state: SelectedTodoContextState) => ({
			selectedTodo: { ...state.selectedTodo, due_datetime: newDate },
		})),
	updateSelectedTodoDescription: (newDescription: Date | null) =>
		set((state: SelectedTodoContextState) => ({
			selectedTodo: { ...state.selectedTodo, description: newDescription },
		})),
}));

export default useSelectedTodoStore;
