import { LegacyRef } from 'react';

interface MenuProps {
	open: boolean;
	ref: LegacyRef<HTMLDivElement> | undefined;
	children: React.ReactNode;
	posX: string;
	posXNotch: string;
	width: string;
}

export default function Menu({ open, ref, children, posX, posXNotch, width }: MenuProps) {
	return (
		<div
			ref={ref}
			className={`absolute top-10 z-20 bg-white text-center text-black text-sm rounded-lg flex flex-col border border-gray-300 shadow-lg 
									before:-top-2 before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:border-t before:border-l before:border-gray-300 before:rotate-45
                  ${width}
									${posX}
									${posXNotch}
									${open ? 'block' : 'hidden'}
									`}
		>
			{children}
		</div>
	);
}

// ${width ? `w-${width}` : 'w-fit'}
// ${leftNotch && `before:left-${leftNotch}`}
// ${rightNotch && `before:right-${rightNotch}`}
// ${posLeft && `-left-${posLeft}`}
// ${posRight && `-right-${posRight}`}
// ${open ? 'block' : 'hidden'}`}
