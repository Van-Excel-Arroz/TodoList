import { create } from 'zustand';

interface SelectedTodoIdContextState {
	selectedTodoId: number;
	setSelectedTodoId: (todoId: number) => void;
}

const useSelectedTodoIdStore = create<SelectedTodoIdContextState>()((set: any) => ({
	selectedTodoId: 0,
	setSelectedTodoId: (todoId: number) => set({ selectedTodoId: todoId }),
}));

export default useSelectedTodoIdStore;
