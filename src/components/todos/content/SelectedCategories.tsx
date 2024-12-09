'use client';

import { ChevronDown, ChevronRight, Filter, X } from 'lucide-react';
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
					<div className="flex gap-2">
						{selectedCategories.map(selectedCategory => (
							<span
								key={selectedCategory.id}
								className="rounded-md flex items-center gap-1 pl-1"
								style={{
									color: selectedCategory.hex_color,
									backgroundColor: `${selectedCategory.hex_color}20`,
									border: `1px solid ${selectedCategory.hex_color}70`,
								}}
							>
								<p className="text-sm">{selectedCategory.category_title}</p>
								<button
									className=" active:bg-white rounded-md p-1 hover:bg-white hover:outline hover:outline-1"
									onClick={() => handleCategoryClick(selectedCategory.category_title)}
									aria-label={`Remove ${selectedCategory.category_title} category`}
								>
									<X size={12} />
								</button>
							</span>
						))}
					</div>
					<Button ariaLabel="Open Categories Dropdown Filter" onClick={() => setIsOpen(prev => !prev)}>
						<ChevronRight size={14} />
					</Button>
				</div>
			</div>
		</>
	);
}
