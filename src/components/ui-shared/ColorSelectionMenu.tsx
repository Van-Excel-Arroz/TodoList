import { MenuOpenProps } from '@/utils/types';
import Menu from './Menu';
import { PREDEFINED_CATEGORY_COLORS } from '@/utils/constants';
import { useState } from 'react';
import { Check } from 'lucide-react';
import MenuItem from './MenuItem';

interface ColorSelectionMenu extends MenuOpenProps {
	initialColor: string;
}

export default function ColorSelectionMenu({ isOpen, setIsOpen, initialColor }: ColorSelectionMenu) {
	const [selectedColor, setSelectedColor] = useState(initialColor);

	return (
		<Menu width="w-60" verticalPosition="top-12" open={isOpen} onClose={() => setIsOpen(false)}>
			<MenuItem clickable={false} className="gap-4 grid grid-cols-5">
				{PREDEFINED_CATEGORY_COLORS.map(color => {
					const isSelected = selectedColor === color;
					return (
						<div
							key={color}
							className={`${
								isSelected && 'ring-2 ring-offset-2'
							} col-span-1 h-7 w-7 flex items-center justify-center rounded-full cursor-pointer hover:scale-110 transition-scale duration-75 ease-out`}
							style={{ backgroundColor: color }}
							onClick={() => setSelectedColor(color)}
						>
							{isSelected && <Check color="white" size={20} strokeWidth={2} />}
						</div>
					);
				})}
			</MenuItem>
		</Menu>
	);
}
