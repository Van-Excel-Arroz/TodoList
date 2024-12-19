import { motion } from 'framer-motion';
import { Todo } from '@/types';
import TodoSection from './TodoSection';

interface TodoListViewProps {
	todos: Todo[];
}

export default function TodoListView({ todos }: TodoListViewProps) {
	const incompletedTodos = todos.filter(todo => !todo.is_completed);
	const completedTodos = todos.filter(todo => todo.is_completed);

	return (
		<div>
			<TodoSection title="Todos" todos={incompletedTodos} />
			<motion.div layout transition={{ duration: 0.15 }}>
				<TodoSection title="Completed Todos" todos={completedTodos} />
			</motion.div>
		</div>
	);
}
