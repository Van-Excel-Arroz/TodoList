import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TodoDetailsPanelState {
	isTodoDetailsPanelOpen: boolean;
	openTodoDetailsPanel: () => void;
	closeTodoDetailsPanel: () => void;
}

const useTodoDetailsPanelStore = create<TodoDetailsPanelState>()(
	persist(
		set => ({
			isTodoDetailsPanelOpen: false,
			openTodoDetailsPanel: () => set(() => ({ isTodoDetailsPanelOpen: true })),
			closeTodoDetailsPanel: () => set(() => ({ isTodoDetailsPanelOpen: false })),
		}),
		{
			name: 'todo-details-panel-storage',
			partialize: state => ({
				isTodoDetailsPanelOpen: state.isTodoDetailsPanelOpen,
			}),
		}
	)
);

export default useTodoDetailsPanelStore;
