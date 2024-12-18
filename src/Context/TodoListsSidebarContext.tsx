import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TodoListsSidebarState {
	isTodoListsSidebarOpen: boolean;
	toggleTodoListsSidebar: () => void;
}

const useTodoListsSidebarStore = create<TodoListsSidebarState>()(
	persist(
		set => ({
			isTodoListsSidebarOpen: false,
			toggleTodoListsSidebar: () =>
				set(state => ({
					isTodoListsSidebarOpen: !state.isTodoListsSidebarOpen,
				})),
		}),
		{
			name: 'todo-lists-sidebar-storage', // unique name for localStorage
			// Optional: specify which parts of the state to persist
			partialize: state => ({
				isTodoListsSidebarOpen: state.isTodoListsSidebarOpen,
			}),
		}
	)
);

export default useTodoListsSidebarStore;
