'use client';

import { ChevronDown, Filter, X } from 'lucide-react';
import { Category } from '@/types';
import { updateIsSelectedCategoryColorsAction } from '@/actions/category-action';
import { memo, useEffect, useState } from 'react';
import { Button } from '@/components/todo-details-panel/content/TodoTitle';

interface SelectedCategoriesProps {
	selectedCategories: Category[];
	todoListId: number;
}

function TodoFilter({ selectedCategories, todoListId }: SelectedCategoriesProps) {
	return (
		<>
			<div className="text-xs 2xl:text-sm flex items-center mt-3 py-2 gap-2 w-full">
				<Button ariaLabel="Filter">
					<Filter size={16} className="text-slate-600" />
				</Button>
				{/* <div className="flex items-center gap-4 flex-wrap">
					<CategoriesFilter categories={selectedCategories} todoListId={todoListId} />
					<div className="flex items-center cursor-pointer">
						<p className="border border-white hover:border-b-slate-900">Due Date</p>
						<Button ariaLabel="Reverse Date Order">
							<ChevronDown size={14} />
						</Button>
					</div>
					<div className="flex items-center cursor-pointer">
						<p className="border border-white hover:border-b-slate-900">Alphabetically</p>
						<Button ariaLabel="Reverse Alphabetical Order">
							<ChevronDown size={14} />
						</Button>
					</div>
					<div className="flex items-center cursor-pointer">
						<p className="border border-white hover:border-b-slate-900">Creation Date</p>
						<Button ariaLabel="Reverse Creation Date Order">
							<ChevronDown size={14} />
						</Button>
					</div>
					<div className="flex items-center cursor-pointer">
						<p className="border border-white hover:border-b-slate-900">Importance</p>
						<Button ariaLabel="Reverse Importance Order">
							<ChevronDown size={14} />
						</Button>
					</div>
				</div> */}
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
	const isCategoriesNotEmpty = categories.length > 0;
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (!isCategoriesNotEmpty) setIsOpen(false);
		setIsOpen(false);
	}, [todoListId, isCategoriesNotEmpty]);

	const handleCategoryClick = async (categoryTitle: string) => {
		await updateIsSelectedCategoryColorsAction(false, categoryTitle, todoListId);
	};

	return (
		<div className="flex items-center relative rounded-md">
			<div className="flex items-center cursor-pointer" onClick={() => setIsOpen(true)}>
				<p
					className={`border border-white hover:border-b-slate-900  ${
						isOpen && isCategoriesNotEmpty && 'border-b-slate-900'
					} `}
				>
					Categories
				</p>

				{isCategoriesNotEmpty && (
					<p className="px-2 scale-75 bg-sky-100 rounded-full text-sm outline-1 outline outline-sky-400">
						{categories.length}
					</p>
				)}
			</div>

			{isCategoriesNotEmpty && (
				<div className={`z-10 absolute top-9 -left-1 ${isOpen ? 'block' : 'hidden'}`}>
					<div className="w-[50vw] lg:w-[40vw] px-3 py-3 drop-shadow-md rounded-lg bg-white border border-slate-300 relative">
						<button
							className="absolute right-3 top-3 p-1 hover:bg-slate-200 rounded-md"
							onClick={() => setIsOpen(false)}
							aria-label="Close Selected Categories Filter"
						>
							<X size={18} />
						</button>
						<div className=" flex flex-wrap items-start gap-2 w-11/12 lg:w-11/12">
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
										<X size={14} />
									</button>
								</span>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
