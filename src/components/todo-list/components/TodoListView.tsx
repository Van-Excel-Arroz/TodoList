import { motion } from 'framer-motion';
import { Todo } from '@/types';
import TodoSection from './TodoSection';
import { compareAsc, compareDesc } from 'date-fns';

interface TodoListViewProps {
	todos: Todo[];
}

export default function TodoListView({ todos }: TodoListViewProps) {
	const sortedById = [...todos].sort((a, b) => b.id - a.id);

	const sortByImportance = [...todos].sort((a, b) => (b.is_important ? 1 : a.is_important ? -1 : 0));

	const sortByDueDate = [...sortedById].sort((a, b) =>
		compareAsc(new Date(a.due_datetime!), new Date(b.due_datetime!))
	);

	const incompletedTodos = sortByImportance.filter(todo => !todo.is_completed);
	const completedTodos = sortByImportance.filter(todo => todo.is_completed);
	return (
		<div>
			<TodoSection title="Todos" todos={incompletedTodos} />

			<motion.div layout transition={{ duration: 0.15 }}>
				<TodoSection title="Completed Todos" todos={completedTodos} />
			</motion.div>
		</div>
	);
}
