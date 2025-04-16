import Menu from './Menu';
import { PREDEFINED_CATEGORY_COLORS } from '@/utils/constants';
import { useState } from 'react';
import { Check } from 'lucide-react';
import MenuItem from './MenuItem';

interface ColorSelectionMenu {
	initialColor: string;
	children: React.ReactNode;
}

export default function ColorSelectionMenu({ initialColor, children }: ColorSelectionMenu) {
	const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
	const [selectedColor, setSelectedColor] = useState(initialColor);

	return (
		<div className="relative">
			<button onClick={() => setIsColorMenuOpen(prev => !prev)}>{children}</button>
			<Menu width="w-60" verticalPosition="top-12" open={isColorMenuOpen} onClose={() => setIsColorMenuOpen(false)}>
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
		</div>
	);
}
