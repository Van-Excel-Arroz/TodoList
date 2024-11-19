import { Todo } from '@/types';
import TodoItem from './TodoItem';
import { motion } from 'framer-motion';

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
			{todos.map(todo => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</>
	);
}
