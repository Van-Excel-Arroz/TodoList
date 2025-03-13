import Button from '@/components/ui-shared/Button';
import { Search } from 'lucide-react';

export default function TodoSearch() {
	return (
		<div className="flex items-center gap-2 w-60 pt-2">
			<Button ariaLabel="Search">
				<Search size={20} />
			</Button>
			<input
				type="text"
				className="px-2 py-1 text-md border-b-2 focus:outline-none focus:border-slate-500 hover:border-slate-400 border-slate-300"
				placeholder="Search tasks..."
			/>
		</div>
	);
}
