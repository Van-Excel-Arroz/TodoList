import { Category } from '@/types';
import { create } from 'zustand';

interface CategoriesContextState {
	categories: Category[];
	setCategories: (categories: Category[]) => void;
	addCategory: (newCategory: Category) => void;
}

const useCategoriesStore = create<CategoriesContextState>()((set: any) => ({
	categories: [],
	setCategories: (categories: Category[]) => set({ categories: categories }),
	addCategory: (newCategory: Category) =>
		set((state: CategoriesContextState) => ({
			categories: [...state.categories, newCategory],
		})),
	toggleIsSelected: (categoryId: number) =>
		set((state: CategoriesContextState) => ({
			categories: state.categories.map(cat => (cat.id === categoryId ? !cat.is_selected : cat)),
		})),
}));

export default useCategoriesStore;
