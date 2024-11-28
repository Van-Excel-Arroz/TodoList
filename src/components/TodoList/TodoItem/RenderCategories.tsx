import { Category } from '@/types';
import { memo } from 'react';

interface RenderCategoriesProps {
	categories: Category[];
	handleCategoryClick: (categoryTitle: string) => void;
}

function RenderCategories({ categories, handleCategoryClick }: RenderCategoriesProps) {
	return (
		<div className="flex">
			{categories?.map(category => (
				<span
					key={category.id}
					className={`text-xs border shadow-md ml-2 rounded py-1 px-2 hover:bg-slate-100 hover:shadow-none active:bg-slate-200`}
					style={{ color: category.hex_color }}
					onClick={() => handleCategoryClick(category.category_title)}
				>
					{category.category_title}
				</span>
			))}
		</div>
	);
}

export default memo(RenderCategories);
