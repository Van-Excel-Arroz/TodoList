import { Plus } from 'lucide-react';

export default function AddTodoListButton() {
	return (
		<button
			type="submit"
			className="rounded-lg rounded-l-none py-1 px-2 text-lg border border-slate-300 hover:border-slate-400 hover:bg-slate-100 active:bg-slate-200"
			aria-label="Add new list"
		>
			<Plus size={20} className="text-gray-600" />
		</button>
	);
}
