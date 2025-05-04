import { PREDEFINED_CATEGORY_COLORS } from '@/utils/constants';
import { Category } from '@/utils/types';
import { create } from 'zustand';

interface CategoriesContextState {
	categories: Category[];
	setCategories: (categories: Category[]) => void;
	addCategory: (newCategory: Category) => void;
	updateColor: (id: number, newColor: string) => void;
	deleteCategory: (categoryId: number) => void;
	getCategoryColor: (category: string, categoriesLenght: number) => string;
	isCategoryTitleUnique: (title: string) => boolean;
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
	updateColor: (id: number, newColor: string) =>
		set((state: CategoriesContextState) => ({
			categories: state.categories.map(cat => (cat.id === id ? { ...cat, hex_color: newColor } : cat)),
		})),
	deleteCategory: (categoryId: number) =>
		set((state: CategoriesContextState) => ({ categories: state.categories.filter(cat => cat.id !== categoryId) })),
	getCategoryColor: (category: string, categoriesLenght: number) => {
		const categories = get().categories;
		const existingCategory = categories.find((cat: Category) => cat.category_title === category.trim());
		if (existingCategory) {
			return existingCategory.hex_color;
		} else {
			return PREDEFINED_CATEGORY_COLORS[(categories.length + categoriesLenght) % 10];
		}
	},
	isCategoryTitleUnique: (title: string) => {
		const categoryTitles = get().categories.map((cat: Category) => cat.category_title);
		return !categoryTitles.some((catTitle: string) => catTitle === title);
	},
}));

export default useCategoriesStore;
