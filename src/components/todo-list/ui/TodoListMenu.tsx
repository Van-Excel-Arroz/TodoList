import Button from '@/components/ui-shared/Button';
import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import { Ellipsis, SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function TodoListMenu({ setToEditing: setToEditing }: { setToEditing: () => void }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className="relative">
			<Button ariaLabel="Settings" onClick={() => setIsMenuOpen(prev => !prev)}>
				<Ellipsis />
			</Button>
			<Menu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} width="w-44" posX="left-0">
				<MenuItem
					onClick={() => {
						setToEditing();
						setIsMenuOpen(false);
					}}
				>
					<SquarePen size={18} className="text-slate-600" />
					<p>Rename</p>
				</MenuItem>
				<MenuItem>
					<Trash2 size={18} className="text-red-600" />
					<p>Delete</p>
				</MenuItem>
			</Menu>
		</div>
	);
}
