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
			name: 'todo-lists-sidebar-storage',
			partialize: state => ({
				isTodoListsSidebarOpen: state.isTodoListsSidebarOpen,
			}),
		}
	)
);

export default useTodoListsSidebarStore;
