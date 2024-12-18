import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TodoSectionState {
	openSections: Record<string, boolean>;
	toggleSection: (sectionTitle: string) => void;
	initializeSectionState: (sectionTitle: string) => void;
}

const createTodoSectionStore = (todoListId: string) =>
	create<TodoSectionState>()(
		persist(
			set => ({
				openSections: {},

				toggleSection: (sectionTitle: string) =>
					set(state => ({
						openSections: {
							...state.openSections,
							[sectionTitle]: !state.openSections[sectionTitle],
						},
					})),

				initializeSectionState: (sectionTitle: string) =>
					set(state => ({
						openSections: {
							...state.openSections,
							[sectionTitle]: state.openSections[sectionTitle] ?? true,
						},
					})),
			}),
			{
				name: `todo-section-storage-${todoListId}`, // Unique storage key per list
				partialize: state => ({ openSections: state.openSections }), // Persist only openSections
			}
		)
	);

const storeMap: Map<string, ReturnType<typeof createTodoSectionStore>> = new Map();

export const useTodoSectionStore = (todoListId: string) => {
	if (!storeMap.has(todoListId)) {
		storeMap.set(todoListId, createTodoSectionStore(todoListId));
	}
	return storeMap.get(todoListId)!;
};
