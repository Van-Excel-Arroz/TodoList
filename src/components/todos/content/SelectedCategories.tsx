'use client';

import { ChevronDown, Filter } from 'lucide-react';
import { Category } from '@/types';
import { updateIsSelectedCategoryColorsAction } from '@/actions/category-action';
import { useState } from 'react';

interface SelectedCategoriesProps {
	selectedCategories: Category[];
	todoListId: number;
}

export default function SelectedCategories({ selectedCategories, todoListId }: SelectedCategoriesProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleCategoryClick = async (categoryTitle: string) => {
		await updateIsSelectedCategoryColorsAction(categoryTitle, false, todoListId);
	};

	return (
		<>
			<div className="flex items-center gap-2 my-6">
				<Filter />
				<div className="flex items-center gap-2 bg-white border border-slate-300 px-2 py-1 rounded-md">
					<p className="text-sm d">Categories</p>
					<ChevronDown size={14} />
				</div>
			</div>
		</>
	);
}
