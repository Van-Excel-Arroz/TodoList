import { Category } from '@/types';

export default function CategoriesRender({ selectedCategories }: { selectedCategories: Category[] }) {
	return (
		<>
			{selectedCategories.length > 0 ? (
				<div>
					{selectedCategories.map(selectedCategory => (
						<div
							key={selectedCategory.id}
							className="text-xs border shadow-md ml-2 rounded py-1 px-2 cursor-pointer inline-block  hover:bg-slate-100 hover:shadow-none active:bg-slate-200"
							style={{ color: selectedCategory.hex_color }}
						>
							<p>{selectedCategory.category_title}</p>
						</div>
					))}
				</div>
			) : null}
		</>
	);
}
