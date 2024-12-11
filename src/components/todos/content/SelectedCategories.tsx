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
			<div className="flex items-center border-b-2 border-slate-200 gap-2 mt-3 py-2 px-2 w-full">
				<Filter size={16} className="text-slate-600" />
				<div className="flex items-center relative group cursor-pointer">
					<p className="text-sm">Categories</p>
					{selectedCategories.length > 0 && (
						<p className="px-2 border scale-75 border-sky-300 bg-sky-100 rounded-full">{selectedCategories.length}</p>
					)}

					<div className="z-50 absolute top-10 -left-8  hidden group-hover:block">
						<div className="flex flex-col items-start px-4 py-2 gap-2 rounded-lg bg-white border border-slate-300">
							<SelectedCategoryTags categories={selectedCategories} handleCategoryClick={handleCategoryClick} />
						</div>
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
