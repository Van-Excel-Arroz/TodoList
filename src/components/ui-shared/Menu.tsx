import { LegacyRef } from 'react';

interface MenuProps {
	open: boolean;
	ref: LegacyRef<HTMLDivElement> | undefined;
	children: React.ReactNode;
	leftNotch?: string | number;
	right?: string | number;
}

export default function Menu({ open, ref, children, leftNotch, right }: MenuProps) {
	return (
		<div
			ref={ref}
			className={`absolute top-10 -left-14 z-20 bg-white text-center text-black text-sm rounded-lg
                  flex flex-col w-44 border border-gray-300 shadow-lg before:-top-2 ${
										leftNotch && `before:left-${leftNotch}`
									}
                  before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:border-t before:border-l before:border-gray-300 before:rotate-45
                  ${open ? 'block' : 'hidden'}`}
		>
			{children}
		</div>
	);
}
