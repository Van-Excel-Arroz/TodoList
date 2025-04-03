import { Category } from '@/utils/types';
import { Tag } from 'lucide-react';
import { memo } from 'react';

interface CategoryTagListProps {
	categories: Category[];
	handleCategoryClick: (categoryTitle: string) => void;
	showIcon?: boolean;
}

function CategoryTagList({ categories, handleCategoryClick, showIcon = true }: CategoryTagListProps) {
	return (
		<>
			{showIcon ? <Tag size={14} className="text-slate-800" /> : null}
			{categories?.map(category => (
				<span
					key={category.id}
					className="text-xs rounded-full px-2 py-[1px] hover:outline hover:outline-1 border"
					style={{
						color: category.hex_color,
						borderColor: `${category.hex_color}60`,
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
