'use client';

import { Square, SquareCheckBig } from 'lucide-react';
import { memo } from 'react';

interface CheckBoxProps {
	isChecked: boolean;
	handleOnClick: () => void;
}

function CheckBox({ isChecked, handleOnClick }: CheckBoxProps) {
	return (
		<button
			className="flex items-center text-slate-600 active:text-slate-400 hover:text-slate-800"
			onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
				event.stopPropagation();
				handleOnClick();
			}}
			aria-label={isChecked ? 'Mark as incomplete' : 'Mark as complete'}
		>
			{isChecked ? (
				<SquareCheckBig />
			) : (
				<div className="flex items-center group">
					<Square className="group-hover:hidden" />
					<SquareCheckBig className="hidden group-hover:block" />
				</div>
			)}
		</button>
	);
}

export default memo(CheckBox);
