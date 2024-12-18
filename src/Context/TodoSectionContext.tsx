import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TodoSectionState {
	openSections: Record<string, boolean>;
	toggleSection: (sectionTitle: string) => void;
	initializeSectionState: (sectionTitle: string) => void;
}

const useTodoSectionStore = (todoListId: string) =>
	create<TodoSectionState>()(
		persist(
			set => ({
				openSections: {},

				toggleSection: (sectionTitle: string) =>
					set(state => {
						return {
							openSections: {
								...state.openSections,
								[sectionTitle]: !state.openSections[sectionTitle],
							},
						};
					}),

				initializeSectionState: (sectionTitle: string) =>
					set(state => {
						return {
							openSections: {
								...state.openSections,
								[sectionTitle]: state.openSections[sectionTitle] ?? true,
							},
						};
					}),
			}),
			{
				name: `todo-section-storage-${todoListId}`,
				partialize: state => ({ openSections: state.openSections }),
			}
		)
	);

export default useTodoSectionStore;
