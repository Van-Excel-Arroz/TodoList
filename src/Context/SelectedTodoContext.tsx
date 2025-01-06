import { create } from 'zustand';

interface SelectedTodoIdContextState {
	selectedTodo: number;
	setSelectedTodo: (todoId: number) => void;
}

const useSelectedTodoIdStore = create<SelectedTodoIdContextState>()((set: any) => ({
	selectedTodo: 0,
	setSelectedTodo: (todoId: number) => set({ selectedTodo: todoId }),
}));

export default useSelectedTodoIdStore;
