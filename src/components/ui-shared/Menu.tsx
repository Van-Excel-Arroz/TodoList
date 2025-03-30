import { useEffect, useRef } from 'react';

interface MenuProps {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
	width: string;
	className?: string;
	top?: string;
}

export default function Menu({ open, onClose, children, width, className, top = 'top-10' }: MenuProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (open && ref.current && !ref.current.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [open, onClose]);

	return (
		<div
			ref={ref}
			className={`absolute bg-white text-center text-black text-sm rounded-lg flex flex-col border border-gray-300 shadow-lg left-1/2 -translate-x-1/2
									${top}
                  ${width}
									${open ? 'block' : 'hidden'}
									${className}
									`}
		>
			{children}
		</div>
	);
}
