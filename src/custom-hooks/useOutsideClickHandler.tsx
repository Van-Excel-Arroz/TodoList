import { useEffect, useRef } from 'react';

interface useOutsideClickHandlerProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function useOutsideClickHandler({ isOpen, onClose }: useOutsideClickHandlerProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (isOpen && ref.current && !ref.current.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose]);

	return ref;
}
