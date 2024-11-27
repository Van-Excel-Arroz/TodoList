import { Category } from '@/types';

export default function CategoriesRender({ selectedCategories }: { selectedCategories: Category[] }) {
	return (
		<>
			{selectedCategories.length > 0 ? (
				<div>
					{selectedCategories.map(selectedCategory => (
						<p key={selectedCategory.id}>{selectedCategory.category_title}</p>
					))}
				</div>
			) : null}
		</>
	);
}
