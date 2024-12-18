import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TodoSectionState {
	openSections: Record<string, Record<string, boolean>>;
	toggleSection: (todolistId: string, sectionTitle: string) => void;
	initializeSectionState: (todolistId: string, sectionTitle: string) => void;
}

const useTodoSectionStore = create<TodoSectionState>()(
	persist(
		set => ({
			openSections: {},
			toggleSection: (todoListId, sectionTitle) =>
				set(state => {
					const currentListSections = state.openSections[todoListId] || {};
					return {
						openSections: {
							...state.openSections,
							[todoListId]: {
								...currentListSections,
								[sectionTitle]: !(currentListSections[sectionTitle] || false),
							},
						},
					};
				}),
			initializeSectionState: (todolistId, sectionTitle) =>
				set(state => {
					if (!state.openSections[todolistId]?.[sectionTitle]) {
						return {
							openSections: {
								...state.openSections,
								[todolistId]: {
									...(state.openSections[todolistId] || {}),
									[sectionTitle]: true,
								},
							},
						};
					}
					return state;
				}),
		}),
		{
			name: 'todo-section-storage',
			partialize: state => ({ openSections: state.openSections }),
		}
	)
);

export default useTodoSectionStore;

// {
//   "project-vacation": {
//     "Todos": true,
//     "Completed Todos": false
//   },
//   "work-tasks": {
//     "Todos": true,
//     "Completed Todos": true
//   }
// }
