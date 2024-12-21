import { Trash2 } from 'lucide-react';

export default function DeleteTodoButton({ handleDeleteClick }: { handleDeleteClick: () => void }) {
	return (
		<button
			className="absolute right-3 p-1 rounded-md hover:bg-slate-200 opacity-0 group-hover:opacity-100 text-slate-600"
			aria-label="Delete Todo"
			onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
				event.stopPropagation();
				handleDeleteClick();
			}}
		>
			<Trash2 size={18} />
		</button>
	);
}
