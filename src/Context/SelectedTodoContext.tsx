import { Todo } from '@/types';
import { create } from 'zustand';

interface SelectedTodoContextState {
	selectedTodo: Todo | null;
	setSelectedTodo: (todo: Todo | null) => void;
	updateSelectedTodoDueDate: (newDate: Date | undefined) => void;
}

const useSelectedTodoStore = create<SelectedTodoContextState>()((set: any) => ({
	selectedTodo: null,
	setSelectedTodo: (todo: Todo | null) => set({ selectedTodo: todo }),
	updateSelectedTodoDueDate: (newDate: Date | undefined) =>
		set((state: SelectedTodoContextState) => ({
			selectedTodo: { ...state.selectedTodo, due_datetime: newDate },
		})),
}));

export default useSelectedTodoStore;
