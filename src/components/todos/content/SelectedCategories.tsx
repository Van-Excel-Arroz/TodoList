'use client';

import { Filter, X } from 'lucide-react';
import { Category } from '@/types';
import { updateIsSelectedCategoryColorsAction } from '@/actions/category-action';

interface SelectedCategoriesProps {
	selectedCategories: Category[];
	todoListId: number;
}

export default function SelectedCategories({ selectedCategories, todoListId }: SelectedCategoriesProps) {
	const handleCategoryClick = async (categoryTitle: string) => {
		await updateIsSelectedCategoryColorsAction(false, categoryTitle, todoListId);
	};

	return (
		<>
			<div className="flex items-center gap-2 my-6 px-4 py-2 bg-white border border-slate-300 rounded-lg w-full">
				<Filter size={16} />
				<div className="flex items-center">
					<p className="text-sm">Categories</p>
					{selectedCategories.length > 0 && (
						<p className="text-xs px-4 py-1 border scale-75 border-sky-300 bg-sky-100 rounded-full">
							{selectedCategories.length}
						</p>
					)}
				</div>
				<div className="flex gap-2 overflow-hidden">
					<SelectedCategoryTags categories={selectedCategories} handleCategoryClick={handleCategoryClick} />
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
