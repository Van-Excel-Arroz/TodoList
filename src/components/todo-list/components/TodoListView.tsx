import { motion } from 'framer-motion';
import { Todo } from '@/types';
import TodoSection from './TodoSection';
import { compareAsc, compareDesc } from 'date-fns';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

interface TodoListViewProps {
	todos: Todo[];
}

export default function TodoListView({ todos }: TodoListViewProps) {
	const selectedCategories: Set<string> = new Set([]);
	const [field, order] = useSearchParams().get('sort')?.split(':') || [];

	const { incompleteTodos, completeTodos } = useMemo(() => {
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
				if (field === 'importance' && order === 'asc') {
					return a.is_important ? 1 : -1;
				} else {
					return a.is_important ? -1 : 1;
				}
			}

			if (field === 'alphabetical') {
				if (order === 'asc') {
					return b.task_text[0] > a.task_text[0] ? -1 : 1;
				} else {
					return a.task_text[0] - b.task_text[0] ? 1 : -1;
				}
			}

			// if both have categories, ranked them by how many categories matches in the selected categories
			if (a.matchingCategories !== b.matchingCategories) {
				return b.matchingCategories - a.matchingCategories;
			}

			// if both have due dates, compare them which has shorter due date
			if (a.due_datetime && b.due_datetime && field === 'dueDate') {
				if (order === 'desc') {
					return compareDesc(new Date(a.due_datetime), new Date(b.due_datetime));
				} else {
					return compareAsc(new Date(a.due_datetime), new Date(b.due_datetime));
				}
			}

			// if one of them have due date, ranked it above the other that doesnt have it
			// if (a.due_datetime) return -1;
			// if (b.due_datetime) return 1;

			// if it just a plain todo, ranked it by creation date
			if (a.creation_date && b.creation_date) {
				if (order === 'asc' && field === 'creationDate') {
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
	}, [todos, selectedCategories]);

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
