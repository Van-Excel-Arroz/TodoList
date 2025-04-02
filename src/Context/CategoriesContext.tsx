import { Category } from '@/utils/types';
import { create } from 'zustand';

interface CategoriesContextState {
	categories: Category[];
	setCategories: (categories: Category[]) => void;
	addCategory: (newCategory: Category) => void;
	toggleIsSelected: (categoryId: number) => void;
	getCategoryColor: (category: string) => string;
}

const useCategoriesStore = create<CategoriesContextState>()((set: any, get: any) => ({
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
	getCategoryColor: (category: string) => {
		const existingCategory = get().categories.find((cat: Category) => cat.category_title === category.trim());
		if (existingCategory) {
			return existingCategory.hex_color;
		} else {
			return null;
		}
	},
}));

export default useCategoriesStore;
