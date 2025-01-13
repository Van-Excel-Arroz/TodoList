import { Button } from '@/components/ui-shared/Button';
import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import useUpdateSearchParams from '@/hooks/useUpdateSearchParams';
import { Category, MenuOpenProps } from '@/types';
import { CheckIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface CategoryFilterMenuProps extends MenuOpenProps {
	initialCategories: Category[];
}

export default function CategoryFilterMenu({ initialCategories, isOpen, setIsOpen }: CategoryFilterMenuProps) {
	const updateSearchParams = useUpdateSearchParams();
	const [categories, setCategories] = useState<Category[]>(initialCategories);
	const searchParams = useSearchParams();
	const [filterField] = searchParams.get('filter')?.split(':') || [];

	const applyCategoriesFilter = () => {
		let url = '';
		categories.map(cat => {
			if (cat.is_selected) {
				url = url + `${cat.category_title},`;
			}
		});
		updateSearchParams('filter', `categories:${url}`);
	};

	const updateSelect = (id: number) => {
		setCategories(categories.map(cat => (cat.id === id ? { ...cat, is_selected: !cat.is_selected } : cat)));
	};

	return (
		<Menu
			open={isOpen}
			onClose={() => setIsOpen(false)}
			posX={`${filterField ? 'right-6' : '-right-5'}`}
			posXNotch="before:right-6"
			width="w-fit"
		>
			<MenuItem className="border-b border-gray-200 font-bold" clickable={false}>
				<p>Filter by Category</p>
				<Button
					ariaLabel="Apply Filter"
					className="text-xs border border-slate-300"
					onClick={() => applyCategoriesFilter()}
				>
					<p>Apply</p>
				</Button>
			</MenuItem>
			<div className="max-h-[70vh] overflow-hidden overflow-y-auto">
				{categories.map(category => (
					<MenuItem
						key={category.id}
						className="flex items-center justify-between"
						onClick={() => updateSelect(category.id)}
					>
						<div className="flex items-center gap-2">
							<p style={{ color: category.hex_color }}>●</p>
							<p className="text-base">{category.category_title}</p>
						</div>

						<Button ariaLabel="Unselect category" className="hover:bg-slate-300 w-5 h-5">
							<CheckIcon size={16} strokeWidth={2} className={`${category.is_selected ? 'block' : 'hidden'} `} />
						</Button>
					</MenuItem>
				))}
			</div>
		</Menu>
	);
}
