'use client';

import { updateIsSelectedCategoryColorsAction } from '@/actions/todolist-action';
import { Category } from '@/types';
import { X } from 'lucide-react';

interface CategoriesRenderProps {
	selectedCategories: Category[];
	todoListId: number;
}

export default function CategoriesRender({ selectedCategories, todoListId }: CategoriesRenderProps) {
	const handleCategoryClick = async (categoryId: number) => {
		await updateIsSelectedCategoryColorsAction(categoryId, false, todoListId);
	};

	return (
		<>
			{selectedCategories.length > 0 ? (
				<div>
					<div className="flex flex-row">
						{selectedCategories.map(selectedCategory => (
							<div
								key={selectedCategory.id}
								className="text-xs border shadow-md ml-2 rounded py-1 px-2 w-fit flex flex-row items-center justify-between gap-2"
							>
								<p style={{ color: selectedCategory.hex_color }}>{selectedCategory.category_title}</p>
								<X
									size={12}
									className="hover:text-white hover:bg-gray-700 rounded-full cursor-pointer"
									onClick={() => handleCategoryClick(selectedCategory.id)}
								/>
							</div>
						))}
					</div>
				</div>
			) : null}
		</>
	);
}
