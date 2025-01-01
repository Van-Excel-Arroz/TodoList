import { motion } from 'framer-motion';
import { Todo } from '@/types';
import TodoSection from './TodoSection';
import { compareAsc, compareDesc } from 'date-fns';

interface TodoListViewProps {
	todos: Todo[];
}

export default function TodoListView({ todos }: TodoListViewProps) {
	const selectedCategories = new Set(['coding', 'UI/UX', 'try']);

	const sortedTodos = [...todos].sort((a, b) => {
		// if there is an important todo, ranked it first
		if (a.is_important !== b.is_important) {
			return a.is_important ? -1 : 1;
		}

		// if both have categories, ranked them by how many categories matches in the selected categories
		const a_categories = (a.categories ?? []).filter(cat => selectedCategories.has(cat.category_title));
		const b_categories = (b.categories ?? []).filter(cat => selectedCategories.has(cat.category_title));

		if (a_categories.length < b_categories.length) return 1;
		if (a_categories.length > b_categories.length) return -1;

		// if both have due dates, compare them which has shorter due date
		if (a.due_datetime && b.due_datetime) {
			return compareAsc(new Date(a.due_datetime), new Date(b.due_datetime));
		}

		// if one of them have due date, ranked it above the other that doesnt have it
		if (a.due_datetime) return -1;
		if (b.due_datetime) return 1;

		// if it just a plain todo, ranked it by creation date
		if (a.creation_date && b.creation_date) {
			return compareDesc(new Date(a.creation_date), new Date(b.creation_date));
		}

		return 0;
	});

	const incompletedTodos = sortedTodos.filter(todo => !todo.is_completed);
	const completedTodos = sortedTodos.filter(todo => todo.is_completed);

	return (
		<div>
			<TodoSection title="Todos" todos={incompletedTodos} />
			<motion.div layout transition={{ duration: 0.15 }}>
				<TodoSection title="Completed Todos" todos={completedTodos} />
			</motion.div>
		</div>
	);
}
