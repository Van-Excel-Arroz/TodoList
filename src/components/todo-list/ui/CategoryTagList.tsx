import { Category } from '@/utils/types';
import { memo } from 'react';

interface CategoryTagListProps {
	categories: Category[];
	handleCategoryClick: (categoryTitle: string) => void;
	showIcon?: boolean;
}

function CategoryTagList({ categories, handleCategoryClick }: CategoryTagListProps) {
	return (
		<>
			{categories?.map(category => (
				<span
					key={category.id}
					className="text-xs rounded-full px-2 py-[1px] hover:outline hover:outline-1 border"
					style={{
						color: category.hex_color,
						borderColor: `${category.hex_color}60`,
						backgroundColor: `${category.hex_color}10`,
					}}
					onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
						event.stopPropagation();
						handleCategoryClick(category.category_title);
					}}
				>
					<p>{category.category_title}</p>
				</span>
			))}
		</>
	);
}

export default memo(CategoryTagList);
