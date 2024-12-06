import { create } from 'zustand';

interface TodoListsSidebarState {
	isTodoListsSidebarOpen: boolean;
	toggleTodoListsSidebar: () => void;
}

const useTodoListsSidebarStore = create<TodoListsSidebarState>()((set: any) => ({
	isTodoListsSidebarOpen: false,
	toggleTodoListsSidebar: () =>
		set((state: TodoListsSidebarState) => ({ isTodoListsSidebarOpen: !state.isTodoListsSidebarOpen })),
}));

export default useTodoListsSidebarStore;
