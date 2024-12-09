'use client';

import { ChevronRight, Filter, X } from 'lucide-react';
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
				<div
					className={`flex items-center justify-between bg-white border border-slate-300 p-2 rounded-lg transition-all duration-300 ease-in-out   ${
						isOpen ? 'w-full' : 'w-28'
					}`}
				>
					<p className="text-sm">Categories:</p>
					<div
						className={`flex gap-2 transition-all duration-200 ease-in-out ml-2 overflow-hidden ${
							isOpen ? 'w-full' : 'w-0'
						}`}
					>
						<SelectedCategoryTags categories={selectedCategories} handleCategoryClick={handleCategoryClick} />
					</div>

					<div className={`${isOpen && 'rotate-180'} transition-all duration-500`}>
						<Button ariaLabel="Open Categories Dropdown Filter" onClick={() => setIsOpen(prev => !prev)}>
							<ChevronRight size={14} />
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}

// ------------------------------------------------------------------------------------------------ //
// COMPONENTS
// ------------------------------------------------------------------------------------------------ //

interface SelectedCategoryTagsProps {
	categories: Category[];
	handleCategoryClick: (categoryTitle: string) => Promise<void>;
}

const SelectedCategoryTags = ({ categories, handleCategoryClick }: SelectedCategoryTagsProps) => {
	return (
		<>
			{categories.map(category => (
				<span
					key={category.id}
					className="rounded-md flex items-center gap-1 pl-1"
					style={{
						color: category.hex_color,
						backgroundColor: `${category.hex_color}20`,
						border: `1px solid ${category.hex_color}70`,
					}}
				>
					<p className="text-sm">{category.category_title}</p>
					<button
						className=" active:bg-white rounded-md p-1 hover:bg-white hover:outline hover:outline-1"
						onClick={() => handleCategoryClick(category.category_title)}
						aria-label={`Remove ${category.category_title} category`}
					>
						<X size={12} />
					</button>
				</span>
			))}
		</>
	);
};
