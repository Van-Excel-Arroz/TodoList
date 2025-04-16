import { MenuOpenProps } from '@/utils/types';
import Menu from './Menu';
import { PREDEFINED_CATEGORY_COLORS } from '@/utils/constants';
import { useState } from 'react';
import { Check } from 'lucide-react';

interface ColorSelectionMenu extends MenuOpenProps {
	initialColor: string;
}

export default function ColorSelectionMenu({ isOpen, setIsOpen, initialColor }: ColorSelectionMenu) {
	const [selectedColor, setSelectedColor] = useState(initialColor);

	return (
		<Menu width="w-fit" open={isOpen} onClose={() => setIsOpen(false)}>
			{PREDEFINED_CATEGORY_COLORS.map(color => {
				const isSelected = selectedColor === color;
				return (
					<div
						key={color}
						className={`${
							isSelected && 'ring-2 ring-offset-2'
						} h-10 w-10 flex items-center justify-center rounded-full cursor-pointer hover:scale-110 transition-scale duration-75 ease-out`}
						style={{ backgroundColor: color }}
						onClick={() => setSelectedColor(color)}
					>
						{isSelected && <Check color="white" strokeWidth={4} />}
					</div>
				);
			})}
		</Menu>
	);
}
