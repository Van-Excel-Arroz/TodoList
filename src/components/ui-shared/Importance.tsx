import { Star } from 'lucide-react';

interface ImportanceProps {
	isImportant: boolean;
	handleOnClick: () => void;
}

export default function Importance({ isImportant, handleOnClick }: ImportanceProps) {
	return (
		<button
			className="flex items-center"
			onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
				event.stopPropagation();
				handleOnClick();
			}}
		>
			<Star
				strokeWidth={1}
				className="absolute right-5 text-slate-500 hover:text-black"
				fill={`${isImportant ? 'black' : 'white'}`}
			/>
		</button>
	);
}
