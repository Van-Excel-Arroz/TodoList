import { motion } from 'framer-motion';
import { Todo } from '@/types';
import TodoSection from './TodoSection';
import { compareAsc, compareDesc } from 'date-fns';

interface TodoListViewProps {
	todos: Todo[];
}

export default function TodoListView({ todos }: TodoListViewProps) {
	const sortByImportance = [...todos].sort((a, b) => {
		if (a.is_important && !b.is_important) {
			return -1;
		} else if (!a.is_important && b.is_important) {
			return 1;
		} else {
			return 0;
		}
	});

	const sortByDueDate = [...todos].sort((a, b) => {
		return compareAsc(new Date(a.due_datetime!), new Date(b.due_datetime!));
	});

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
