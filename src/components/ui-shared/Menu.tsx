import { useEffect, useRef } from 'react';

interface MenuProps {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
	posX: string;
	posXNotch: string;
	width: string;
	className?: string;
}

export default function Menu({ open, onClose, children, posX, posXNotch, width, className }: MenuProps) {
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
			className={`absolute top-10 z-20 bg-white text-center text-black text-sm rounded-lg flex flex-col border border-gray-300 shadow-lg 
									before:-top-2 before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:border-t before:border-l before:border-gray-300 before:rotate-45
                  ${width}
									${posX}
									${posXNotch}
									${open ? 'block' : 'hidden'}
									${className}
									`}
		>
			{children}
		</div>
	);
}
