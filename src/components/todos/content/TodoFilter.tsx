'use client';

import { Filter, X } from 'lucide-react';
import { Category } from '@/types';
import { updateIsSelectedCategoryColorsAction } from '@/actions/category-action';
import { memo, useState } from 'react';

interface SelectedCategoriesProps {
	selectedCategories: Category[];
	todoListId: number;
}

function TodoFilter({ selectedCategories, todoListId }: SelectedCategoriesProps) {
	return (
		<>
			<div className="flex items-center border-b-2 border-slate-200 gap-2 mt-3 py-2 px-2 w-full">
				<Filter size={16} className="text-slate-600" />
				<CategoriesFilter categories={selectedCategories} todoListId={todoListId} />
			</div>
		</>
	);
}

export default memo(TodoFilter);

// ------------------------------------------------------------------------------------------------ //
// COMPONENTS
// ------------------------------------------------------------------------------------------------ //

interface CategoriesFilterProps {
	categories: Category[];
	todoListId: number;
}

const CategoriesFilter = ({ categories, todoListId }: CategoriesFilterProps) => {
	const isCategoriesEmpty = categories.length > 0;
	const [isOpen, setIsOpen] = useState(false);

	const handleCategoryClick = async (categoryTitle: string) => {
		await updateIsSelectedCategoryColorsAction(false, categoryTitle, todoListId);
	};

	return (
		<div className="flex items-center relative rounded-md">
			<div
				className={`flex items-center cursor-pointer rounded-md p-1 hover:outline outline-1 outline-slate-400 ${
					isOpen && 'outline outline-1 outline-slate-300 rounded-md'
				}`}
				onClick={() => setIsOpen(true)}
			>
				<p className="text-sm">Categories</p>
				<p
					className={`px-2 border scale-75 border-sky-300 bg-sky-100 rounded-full opacity-0 ${
						isCategoriesEmpty && 'opacity-100'
					}`}
				>
					{categories.length}
				</p>
			</div>

			{isCategoriesEmpty && (
				<div className={`z-10 absolute top-9 -left-1 ${isOpen ? 'block' : 'hidden'}`}>
					<div className="w-[50vw] lg:w-[40vw] flex flex-wrap items-start px-4 py-7 gap-2 drop-shadow-md rounded-lg bg-white border border-slate-300 relative">
						<button
							className="absolute right-3 top-1 p-1 hover:bg-slate-200 rounded-md"
							onClick={() => setIsOpen(false)}
							aria-label="Close Selected Categories Filter"
						>
							<X size={14} />
						</button>
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
					</div>
				</div>
			)}
		</div>
	);
};
