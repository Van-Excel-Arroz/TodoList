import { Category } from '@/types';

export default function CategoriesRender({ selectedCategories }: { selectedCategories: Category[] }) {
	return (
		<>
			<div className="flex flex-wrap">
				{selectedCategories.length > 0 ? (
					<div>
						{selectedCategories.map(selectedCategory => (
							<span
								key={selectedCategory.id}
								className={`text-xs border shadow-md ml-2 rounded py-1 px-2 hover:bg-slate-100 hover:shadow-none active:bg-slate-200`}
								style={{ color: selectedCategory.hex_color }}
							>
								{selectedCategory.category_title}
							</span>
						))}
					</div>
				) : null}
			</div>
		</>
	);
}
