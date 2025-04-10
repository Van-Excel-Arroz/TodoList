import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Menu from './Menu';

interface DropDownProps {
	children: React.ReactNode;
	selectedItem: string[];
}

export default function DropDown({ children, selectedItem }: DropDownProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const isSelected = selectedItem.length > 0;

	return (
		<div
			className="flex items-center justify-between gap-2 cursor-pointer text-sm border rounded-md px-4 py-2 relative w-full"
			onClick={() => setIsMenuOpen(prev => !prev)}
		>
			<p className={`${isSelected ? 'text-black' : 'text-slate-600'}`}>
				{isSelected ? selectedItem.join(',') : 'Select'}
			</p>
			<ChevronDown size={20} className="text-slate-600" />
			<Menu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} width="w-full" verticalPosition="top-12">
				{children}
			</Menu>
		</div>
	);
}
