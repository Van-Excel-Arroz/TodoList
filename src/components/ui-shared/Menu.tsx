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

		if (open) document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [open, onClose]);

	return (
		<div
			ref={ref}
			className={`absolute z-20 bg-white text-center text-black  rounded-lg flex flex-col border border-gray-300 shadow-lg left-1/2 -translate-x-1/2 transition-all  ease-out
                ${
									open
										? 'opacity-100 scale-100 translate-y-0 duration-100'
										: 'opacity-0 scale-95 -translate-y-1 pointer-events-none duration-200'
								}
									${top}
                  ${width}
									${className}
									`}
		>
			{children}
		</div>
	);
}
