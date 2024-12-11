'use client';

import { Filter, X } from 'lucide-react';
import { Category } from '@/types';
import { updateIsSelectedCategoryColorsAction } from '@/actions/category-action';

interface SelectedCategoriesProps {
	selectedCategories: Category[];
	todoListId: number;
}

export default function SelectedCategories({ selectedCategories, todoListId }: SelectedCategoriesProps) {
	const isSelectedCategoriesEmpty = selectedCategories.length > 0;
	const handleCategoryClick = async (categoryTitle: string) => {
		await updateIsSelectedCategoryColorsAction(false, categoryTitle, todoListId);
	};

	return (
		<>
			<div className="flex items-center border-b-2 border-slate-200 gap-2 mt-3 py-2 px-2 w-full">
				<Filter size={16} className="text-slate-600" />
				<div className="flex items-center relative group">
					<p className="text-sm cursor-pointer">Categories</p>
					<p
						className={`px-2 border scale-75 border-sky-300 bg-sky-100 rounded-full opacity-0 ${
							isSelectedCategoriesEmpty && 'opacity-100'
						}`}
					>
						{selectedCategories.length}
					</p>

					{isSelectedCategoriesEmpty && (
						<div className="z-50 absolute top-6 -left-8 hidden group-hover:block hover:block">
							<div className="w-[50vw] lg:w-[30vw] flex flex-wrap items-start p-4 gap-2 shadow-md rounded-lg bg-white border border-slate-300">
								<SelectedCategoryTags categories={selectedCategories} handleCategoryClick={handleCategoryClick} />
							</div>
						</div>
					)}
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
					<p className="text-xs lg:text-sm">{category.category_title}</p>
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
