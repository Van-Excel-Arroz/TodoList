import { Star } from 'lucide-react';

interface ImportanceProps {
	isImportant: boolean;
	handleOnClick: () => void;
	size?: number;
}

export default function Importance({ isImportant, handleOnClick, size = 24 }: ImportanceProps) {
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
				strokeWidth={2}
				size={size}
				className={`hover:opacity-80 active:opacity-60 ${isImportant ? 'text-yellow-400' : 'text-slate-600'}`}
				fill={`${isImportant ? 'yellow' : 'white'}`}
			/>
		</button>
	);
}
