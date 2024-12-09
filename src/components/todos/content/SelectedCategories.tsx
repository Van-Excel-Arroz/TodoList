'use client';

import { ChevronDown, Filter, X } from 'lucide-react';
import { Category } from '@/types';
import { updateIsSelectedCategoryColorsAction } from '@/actions/category-action';
import { useState } from 'react';
import { Button } from '@/components/todo-details-panel/content/TodoTitle';

interface SelectedCategoriesProps {
	selectedCategories: Category[];
	todoListId: number;
}

export default function SelectedCategories({ selectedCategories, todoListId }: SelectedCategoriesProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleCategoryClick = async (categoryTitle: string) => {
		await updateIsSelectedCategoryColorsAction(false, categoryTitle, todoListId);
	};

	return (
		<>
			<div className="flex items-center gap-2 my-6">
				<Filter />
				<div className="flex items-center gap-2 bg-white border border-slate-300 px-2 py-1 rounded-md">
					<p className="text-sm d">Categories</p>
					<Button ariaLabel="Open Categories Dropdown Filter" onClick={() => setIsOpen(prev => !prev)}>
						<ChevronDown size={14} />
					</Button>
				</div>
				{isOpen && (
					<div className="flex flex-row gap-2">
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
				)}
			</div>
		</>
	);
}
