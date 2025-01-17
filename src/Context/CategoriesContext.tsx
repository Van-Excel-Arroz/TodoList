import { Category } from '@/types';
import { create } from 'zustand';

interface CategoriesContextState {
	categories: Category[];
	setCategories: (categories: Category[]) => void;
	addCategory: (newCategory: Category) => void;
	toggleIsSelected: (categoryId: number) => void;
}

const useCategoriesStore = create<CategoriesContextState>()((set: any) => ({
	categories: [],
	setCategories: (categories: Category[]) => set({ categories: categories }),
	addCategory: (newCategory: Category) =>
		set((state: CategoriesContextState) => {
			const existingCategory = state.categories.find(cat => cat.category_title === newCategory.category_title);

			if (!existingCategory) {
				return { categories: [...state.categories, newCategory] };
			}
			return { categories: state.categories };
		}),
	toggleIsSelected: (categoryId: number) =>
		set((state: CategoriesContextState) => ({
			categories: state.categories.map(cat =>
				cat.id === categoryId ? { ...cat, is_selected: !cat.is_selected } : cat
			),
		})),
}));

export default useCategoriesStore;
