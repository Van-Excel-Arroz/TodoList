import { motion } from 'framer-motion';
import { Todo } from '@/types';
import TodoSection from './TodoSection';
import { compareAsc, compareDesc } from 'date-fns';

interface TodoListViewProps {
	todos: Todo[];
}

export default function TodoListView({ todos }: TodoListViewProps) {
	const sortedById = [...todos].sort((a, b) => b.id - a.id);

	const sortByImportance = [...sortedById].sort((a, b) => (b.is_important ? 1 : a.is_important ? -1 : 0));

	const sortByDueDate = [...sortedById].sort((a, b) =>
		compareAsc(new Date(a.due_datetime!), new Date(b.due_datetime!))
	);

	const selectedCategories = new Set(['coding', 'UI/UX', 'try']);

	const sortedByCategories = [...sortedById].sort((a, b) => {
		const a_categories = a.categories?.filter(cat => selectedCategories.has(cat.category_title));
		const b_categories = b.categories?.filter(cat => selectedCategories.has(cat.category_title));

		if (a_categories.length < b_categories.length) return 1;
		if (a_categories.length > b_categories.length) return -1;
		return 0;
	});

	const incompletedTodos = sortedByCategories.filter(todo => !todo.is_completed);
	const completedTodos = sortedByCategories.filter(todo => todo.is_completed);

	return (
		<div>
			<TodoSection title="Todos" todos={incompletedTodos} />
			<motion.div layout transition={{ duration: 0.15 }}>
				<TodoSection title="Completed Todos" todos={completedTodos} />
			</motion.div>
		</div>
	);
}
