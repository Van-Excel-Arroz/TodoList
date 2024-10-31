import { create } from 'zustand';

interface TodoListIdState {
	currentSelectedTodoListId: number;
	setTodoListId: (id: number) => void;
}

const useTodoListIdStore = create<TodoListIdState>((set: any) => ({
	currentSelectedTodoListId: -1,
	setTodoListId: (id: number) => set({ currentSelectedTodoListId: id }),
}));

export default useTodoListIdStore;
