import { Category } from '@/utils/types';
import { Dot, Tag } from 'lucide-react';
import { memo } from 'react';

interface CategoryTagsProps {
	categories: Category[];
	handleCategoryClick: (categoryTitle: string) => void;
	showIcon?: boolean;
}

function CategoryTags({ categories, handleCategoryClick, showIcon = true }: CategoryTagsProps) {
	return (
		<>
			{showIcon ? <Tag size={14} className="text-slate-800" /> : null}
			{categories?.map(category => (
				<span
					key={category.id}
					className="text-xs rounded-md flex items-center gap-1 hover:outline hover:outline-1"
					style={{
						color: category.hex_color,
						backgroundColor: `${category.hex_color}20`,
						padding: '2px',
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

export default memo(CategoryTags);
