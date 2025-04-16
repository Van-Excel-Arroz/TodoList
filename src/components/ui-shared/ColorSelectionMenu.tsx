import { MenuOpenProps } from '@/utils/types';
import Menu from './Menu';
import { PREDEFINED_CATEGORY_COLORS } from '@/utils/constants';

interface ColorSelectionMenu extends MenuOpenProps {}

export default function ColorSelectionMenu({ isOpen, setIsOpen }: MenuOpenProps) {
	return (
		<Menu width="w-fit" open={isOpen} onClose={() => setIsOpen(false)}>
			{PREDEFINED_CATEGORY_COLORS.map(color => color)}
		</Menu>
	);
}
