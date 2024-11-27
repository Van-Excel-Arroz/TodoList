import { Category } from '@/types';
import { X } from 'lucide-react';

export default function CategoriesRender({ selectedCategories }: { selectedCategories: Category[] }) {
	return (
		<>
			{selectedCategories.length > 0 ? (
				<div className="flex flex-row">
					{selectedCategories.map(selectedCategory => (
						<div
							key={selectedCategory.id}
							className="text-xs border shadow-md ml-2 rounded py-1 px-2 w-fit flex flex-row items-center justify-between gap-2"
						>
							<p style={{ color: selectedCategory.hex_color }}>{selectedCategory.category_title}</p>
							<X size={12} className="hover:text-white hover:bg-gray-700 rounded-full cursor-pointer" />
						</div>
					))}
				</div>
			) : null}
		</>
	);
}
