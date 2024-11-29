import { ClipboardList } from 'lucide-react';

export default function EmptyTodolistMessage() {
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<ClipboardList size={48} className="text-gray-400" />
			<div className="text-center">
				<p className="mt-4 text-2xl font-semibold">No todolist selected</p>
				<p className="mt-2 text-gray-600">
					Create a new todolist or select an exisiting one from the sidebar to get started.
				</p>
			</div>
		</div>
	);
}
