import TodoItem from './TodoItem';

interface Todo {
	id: number;
	task_text: string;
	category: string | null;
	due_datetime: string | null;
	creation_date: string;
	todo_list_id: number;
}

interface TodosRenderProps {
	todos: Todo[];
}

export default function TodosRender({ todos }: TodosRenderProps) {
	return (
		<>
			<div className="grid grid-cols-6 my-3 px-4 font-semibold">
				<p className="col-span-4">Todos</p>
				<p className="text-center">Due Date</p>
				<p className="text-center">Created In</p>
			</div>
			<div>
				{todos.map(todo => (
					<TodoItem key={todo.id} todo={todo} />
				))}
			</div>
		</>
	);
}
