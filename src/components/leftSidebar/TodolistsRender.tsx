import { TodoList } from '@/types';
import TodoListItem from './TodoListItem';

export default function TodolistsRender({ todolists }: { todolists: TodoList[] }) {
	return (
		<div className="h-[calc(100%-90px)] overflow-y-auto overflow-x-hidden">
			<ul className="container mx-auto flex flex-col gap-2 mb-4">
				{todolists.map(todolist => (
					<li key={todolist.id}>
						<TodoListItem key={todolist.id} todolist={todolist} />
					</li>
				))}
			</ul>
		</div>
	);
}
