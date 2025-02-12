import { Category } from '@/types';
import { Tag } from 'lucide-react';

interface CategoryTagsProps {
	categories: Category[];
	handleCategoryClick: (categoryTitle: string) => void;
}

export default function CategoryTags({ categories, handleCategoryClick }: CategoryTagsProps) {
	return (
		<>
			<Tag size={12} className="text-slate-800" />
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
					<p className="text-xs">⦿</p>
					<p>{category.category_title}</p>
				</span>
			))}
		</>
	);
}
