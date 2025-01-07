import { motion } from 'framer-motion';
import { Todo } from '@/types';
import TodoSection from './TodoSection';
import { compareAsc, compareDesc, isThisWeek, isToday, isTomorrow } from 'date-fns';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

interface TodoListViewProps {
	todos: Todo[];
}

export default function TodoListView({ todos }: TodoListViewProps) {
	const [sortField, sortOrder] = useSearchParams().get('sort')?.split(':') || [];
	const [filterValue] = useSearchParams().get('filter')?.split(':') || [];

	const { incompleteTodos, completeTodos } = useMemo(() => {
		const selectedCategories: Set<string> = new Set([]);
		const incomplete: any[] = [];
		const complete: any[] = [];

		for (const todo of todos) {
			(todo.is_completed ? complete : incomplete).push({
				...todo,
				matchingCategories:
					todo.categories?.filter(category => selectedCategories.has(category.category_title)).length ?? 0,
			});
		}

		const sortTodos = (a: any, b: any) => {
			// if there is an important todo, ranked it first
			if (a.is_important !== b.is_important) {
				if (sortField === 'importance' && sortOrder === 'asc') {
					return a.is_important ? 1 : -1;
				} else {
					return a.is_important ? -1 : 1;
				}
			}

			if (filterValue === 'Today') {
				return isToday(b.due_datetime) ? 1 : -1;
			} else if (filterValue === 'Tomorrow') {
				return isTomorrow(b.due_datetime) ? 1 : -1;
			} else if (filterValue === 'This Week') {
				return isThisWeek(b.due_datetime) ? 1 : -1;
			}

			if (sortField === 'alphabetical') {
				if (sortOrder === 'asc') {
					return b.task_text[0].toLowerCase() > a.task_text[0].toLowerCase() ? -1 : 1;
				} else {
					return a.task_text[0].toLowerCase() > b.task_text[0].toLowerCase() ? -1 : 1;
				}
			}

			// if both have categories, ranked them by how many categories matches in the selected categories
			if (a.matchingCategories !== b.matchingCategories) {
				return b.matchingCategories - a.matchingCategories;
			}

			// if both have due dates, compare them which has shorter due date
			if (a.due_datetime && b.due_datetime && sortField === 'dueDate') {
				if (sortOrder === 'desc') {
					return compareDesc(new Date(a.due_datetime), new Date(b.due_datetime));
				} else {
					return compareAsc(new Date(a.due_datetime), new Date(b.due_datetime));
				}
			}

			// if one of them have due date, ranked it above the other that doesnt have it
			if (sortField === 'dueDate') {
				if (a.due_datetime) return -1;
				if (b.due_datetime) return 1;
			}

			// if it just a plain todo, ranked it by creation date
			if (a.creation_date && b.creation_date) {
				if (sortOrder === 'asc' && sortField === 'creationDate') {
					return compareAsc(new Date(a.creation_date), new Date(b.creation_date));
				} else {
					return compareDesc(new Date(a.creation_date), new Date(b.creation_date));
				}
			}

			return 0;
		};

		incomplete.sort(sortTodos);
		complete.sort(sortTodos);

		return {
			incompleteTodos: incomplete,
			completeTodos: complete,
		};
	}, [todos, sortField, sortOrder]);

	return (
		<div>
			<motion.div>
				<TodoSection title="Todos" todos={incompleteTodos} />
			</motion.div>
			<motion.div layout transition={{ duration: 0.15 }}>
				<TodoSection title="Completed Todos" todos={completeTodos} />
			</motion.div>
		</div>
	);
}
