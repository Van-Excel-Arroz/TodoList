import { Star } from 'lucide-react';

interface ImportanceProps {
	isImportant: boolean;
	handleOnClick: () => void;
}

export default function Importance({ isImportant, handleOnClick }: ImportanceProps) {
	return (
		<button
			className="flex items-center"
			aria-label="Toggle todo importance"
			onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
				event.stopPropagation();
				handleOnClick();
			}}
		>
			<Star
				strokeWidth={1}
				className={`${
					isImportant && 'hover:opacity-80 active:opacity-60'
				} text-slate-600 hover:text-black active:text-slate-400`}
				fill={`${isImportant ? 'black' : 'white'}`}
			/>
		</button>
	);
}
