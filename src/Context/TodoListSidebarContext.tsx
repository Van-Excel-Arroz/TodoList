import { create } from 'zustand';

interface TodoListSidebarState {
	isTodoListSidebarOpen: boolean;
	toggleTodoListSidebar: () => void;
}

const useTodoListSidebarStore = create<TodoListSidebarState>()((set: any) => ({
	isTodoListSidebarOpen: false,
	toggleTodoListSidebar: () =>
		set((state: TodoListSidebarState) => ({ isTodoListSidebarOpen: !state.isTodoListSidebarOpen })),
}));

export default useTodoListSidebarStore;
