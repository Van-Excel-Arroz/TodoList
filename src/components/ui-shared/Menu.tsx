import { LegacyRef } from 'react';

interface MenuProps {
	open: boolean;
	ref: LegacyRef<HTMLDivElement> | undefined;
	children: React.ReactNode;
}

export default function Menu({ open, ref, children }: MenuProps) {
	const notch =
		"before:-top-2 before:left-5 before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:border-t before:border-l before:border-gray-300 before:rotate-45";
	return (
		<div
			ref={ref}
			className={`absolute top-10 -left-4 z-20 bg-white text-center text-black text-sm rounded-lg
                  flex flex-col w-44 border border-gray-300 shadow-lg ${notch}
                  ${open ? 'block' : 'hidden'}`}
		>
			{children}
		</div>
	);
}
