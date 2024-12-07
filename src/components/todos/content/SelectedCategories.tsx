'use client';

import { X } from 'lucide-react';
import { Category } from '@/types';
import { updateIsSelectedCategoryColorsAction } from '@/actions/todolist-action';

interface SelectedCategoriesProps {
	selectedCategories: Category[];
	todoListId: number;
}

export default function SelectedCategories({ selectedCategories, todoListId }: SelectedCategoriesProps) {
	const handleCategoryClick = async (categoryTitle: string) => {
		await updateIsSelectedCategoryColorsAction(categoryTitle, false, todoListId);
	};

	return (
		<>
			{selectedCategories.length > 0 ? (
				<div className="flex flex-row gap-2 pt-6">
					{selectedCategories.map(selectedCategory => (
						<span
							key={selectedCategory.id}
							className="rounded-md flex items-center gap-2 px-2 py-1"
							style={{
								color: selectedCategory.hex_color,
								backgroundColor: `${selectedCategory.hex_color}20`,
								border: `1px solid ${selectedCategory.hex_color}`,
							}}
						>
							<p>{selectedCategory.category_title}</p>
							<button
								className={`hover:bg-white active:bg-white rounded-md p-1`}
								onClick={() => handleCategoryClick(selectedCategory.category_title)}
								aria-label={`Remove ${selectedCategory.category_title} category`}
							>
								<X size={16} />
							</button>
						</span>
					))}
				</div>
			) : null}
		</>
	);
}
