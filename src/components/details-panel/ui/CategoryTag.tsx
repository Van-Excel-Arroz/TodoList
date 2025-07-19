import { Category } from '@/utils/types';
import { X } from 'lucide-react';

interface CategoryTagProps {
	category: Category;
	onRemove: (categoryColorId: number, todoId: number, category: Category) => void;
	todoId: number;
}

export default function CategoryTag({ category, onRemove, todoId }: CategoryTagProps) {
	return (
		<span
			key={category.id}
			className="rounded-full text-xs flex items-center gap-1 px-2 py-1 border"
			style={{
				color: category.hex_color,
				borderColor: `${category.hex_color}60`,
				backgroundColor: `${category.hex_color}10`,
			}}
		>
			<p>{category.category_title}</p>
			<button
				className="rounded-full hover:outline hover:outline-1 active:bg-white"
				aria-label="Remove Category"
				onClick={() => onRemove(category.id, todoId, category)}
				style={{
					padding: 2,
				}}
			>
				<X size={12} />
			</button>
		</span>
	);
}
