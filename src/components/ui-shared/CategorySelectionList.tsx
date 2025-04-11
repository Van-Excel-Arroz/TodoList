import useCategoriesStore from '@/context/CategoriesContext';
import MenuItem from './MenuItem';
import { Check } from 'lucide-react';
import { Category } from '@/utils/types';
import { Dispatch, SetStateAction } from 'react';

interface CategorySelectionListProps {
	selectedCategories: Category[];
	setSelectedCategories: Dispatch<SetStateAction<Category[]>>;
	height?: string;
}

export default function CategorySelectionList({
	selectedCategories,
	setSelectedCategories,
	height = 'max-h-[30vh]',
}: CategorySelectionListProps) {
	const { categories } = useCategoriesStore();

	const handleCategoryClick = (event: React.MouseEvent<HTMLDivElement>, category: Category) => {
		event.stopPropagation();
		const isSelected = selectedCategories.find(cat => cat.id === category.id);

		if (isSelected) {
			setSelectedCategories(cats => cats.filter(cat => cat.id !== category.id));
		} else {
			setSelectedCategories(cats => [...cats, category]);
		}
	};

	return (
		<div className={`${height} overflow-hidden overflow-y-auto`}>
			{categories.length > 0 ? (
				categories.map(category => (
					<MenuItem
						key={category.id}
						className="flex items-center justify-between"
						onClick={e => {
							if (e) handleCategoryClick(e, category);
						}}
					>
						<div className="flex items-center gap-2">
							<p style={{ color: category.hex_color }}>●</p>
							<p className="text-md">{category.category_title}</p>
						</div>
						{selectedCategories.includes(category) ? <Check size={18} className="text-slate-600" /> : null}
					</MenuItem>
				))
			) : (
				<p className="py-6 px-3 text-slate-600">No available categories.</p>
			)}
		</div>
	);
}
