import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Menu from './Menu';

interface DropDownProps {
	children: React.ReactNode;
	selectedItem: string | null;
}

export default function DropDown({ children, selectedItem }: DropDownProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const isMultipleSelected = selectedItem?.split(',').length ?? 0 > 0;
	const displaySelectedItem = isMultipleSelected ? selectedItem?.split(',').join(', ') : selectedItem;

	return (
		<div
			className="flex-1 min-w-0 flex items-center justify-between gap-2 cursor-pointer text-sm border rounded-md px-4 py-2 relative"
			onClick={() => setIsMenuOpen(prev => !prev)}
		>
			<p className={`${selectedItem ? 'text-black' : 'text-slate-600'} flex-1 min-w-0 text-wrap`}>
				{selectedItem ? displaySelectedItem : 'Select'}
			</p>
			<ChevronDown size={20} className="text-slate-600" />
			<Menu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} width="w-full" verticalPosition="top-12">
				{children}
			</Menu>
		</div>
	);
}
