'use client';

import { X } from 'lucide-react';
import { Category } from '@/types';
import { updateIsSelectedCategoryColorsAction } from '@/actions/todolist-action';

interface CategoryListProps {
	selectedCategories: Category[];
	todoListId: number;
}

export default function CategoryList({ selectedCategories, todoListId }: CategoryListProps) {
	const handleCategoryClick = async (categoryTitle: string) => {
		await updateIsSelectedCategoryColorsAction(categoryTitle, false, todoListId);
	};

	return (
		<>
			{selectedCategories.length > 0 ? (
				<div>
					<div className="flex flex-row">
						{selectedCategories.map(selectedCategory => (
							<div
								key={selectedCategory.id}
								className="text-xs border shadow-md ml-2 rounded py-1 px-2 w-fit flex flex-row items-center justify-between gap-2 mt-6 bg-white"
							>
								<p style={{ color: selectedCategory.hex_color }}>{selectedCategory.category_title}</p>
								<X
									size={12}
									className="hover:text-white hover:bg-gray-700 rounded-full cursor-pointer"
									onClick={() => handleCategoryClick(selectedCategory.category_title)}
									aria-label={`Remove ${selectedCategory.category_title} category`}
								/>
							</div>
						))}
					</div>
				</div>
			) : null}
		</>
	);
}
