import { PREDEFINED_CATEGORY_COLORS } from '@/utils/constants';
import { useState } from 'react';
import { Check } from 'lucide-react';
import Menu from './Menu';
import MenuItem from './MenuItem';
import Button from './Button';

interface ColorSelectionMenuProps {
	initialColor: string;
	children: React.ReactNode;
	verticalPosition?: string;
	horizontalPosition?: string;
	onColorSelect: (color: string) => void;
}

export default function ColorSelectionMenu({
	initialColor,
	children,
	verticalPosition = 'top-7',
	horizontalPosition = 'left-0',
	onColorSelect,
}: ColorSelectionMenuProps) {
	const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
	const [selectedColor, setSelectedColor] = useState(initialColor);

	return (
		<div className="relative">
			<Button
				ariaLabel="Change Color of the Category"
				className="flex items-center"
				onClick={() => setIsColorMenuOpen(prev => !prev)}
			>
				{children}
			</Button>
			<Menu
				width="w-60"
				verticalPosition={verticalPosition}
				horizontalPosition={horizontalPosition}
				open={isColorMenuOpen}
				onClose={() => setIsColorMenuOpen(false)}
			>
				<MenuItem clickable={false} className="gap-4 grid grid-cols-5">
					{PREDEFINED_CATEGORY_COLORS.map(color => {
						const isSelected = selectedColor === color;
						return (
							<div
								key={color}
								className={`${
									isSelected && 'ring-2 ring-offset-2'
								} col-span-1 h-7 w-7 flex items-center justify-center rounded-full cursor-pointer hover:scale-105 transition-scale duration-75 ease-out`}
								style={{ backgroundColor: color }}
								onClick={() => {
									setSelectedColor(color);
									onColorSelect(color);
								}}
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
