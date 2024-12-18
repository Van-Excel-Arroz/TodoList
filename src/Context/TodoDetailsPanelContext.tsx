import { create } from 'zustand';

interface TodoDetailsPanelState {
	isTodoDetailsPanelOpen: boolean;
	openTodoDetailsPanel: () => void;
	closeTodoDetailsPanel: () => void;
}

const useTodoDetailsPanelStore = create<TodoDetailsPanelState>()((set: any) => ({
	isTodoDetailsPanelOpen: false,
	openTodoDetailsPanel: () => set(() => ({ isTodoDetailsPanelOpen: true })),
	closeTodoDetailsPanel: () => set(() => ({ isTodoDetailsPanelOpen: false })),
}));
export default useTodoDetailsPanelStore;
