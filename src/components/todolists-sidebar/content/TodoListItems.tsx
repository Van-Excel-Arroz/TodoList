import { TodoList } from '@/types';
import TodoListItem from './TodoListItem';

export default function TodolistItems({ todolists }: { todolists: TodoList[] }) {
	const isEmpty = todolists.length === 0;

	return (
		<div className="h-[calc(100%-90px)] overflow-y-auto overflow-x-hidden">
			{isEmpty ? (
				<div className="text-center mt-4">
					<p className="text-xl font-semibold mb-2">No Tasks Available</p>
					<p className="text-gray-600">Start by adding a new todolist!</p>
				</div>
			) : (
				<ul className=" flex flex-col gap-2 mb-4">
					{todolists.map(todolist => (
						<li key={todolist.id}>
							<TodoListItem key={todolist.id} todolist={todolist} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
