import { motion } from 'framer-motion';
import { Todo } from '@/types';
import TodoSection from './TodoSection';
import { compareAsc, compareDesc, isThisMonth, isThisWeek, isToday, isTomorrow } from 'date-fns';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

type SortFn = (a: Todo, b: Todo) => number;
type FilterFn = (todo: Todo) => boolean;

interface TodoListViewProps {
	todos: Todo[];
}

export default function TodoListView({ todos }: TodoListViewProps) {
	const searchParams = useSearchParams();

	const [sortField, sortOrder] = searchParams.get('sort')?.split(':') || [];
	const [filterField, filterValue] = searchParams.get('filter')?.split(':') || [];

	const getSortFn = useMemo((): SortFn => {
		return (a: any, b: any) => {
			if (a.is_important !== b.is_important) {
				return sortField === 'importance' && sortOrder === 'asc' ? (a.is_important ? 1 : -1) : a.is_important ? -1 : 1;
			}

			if (sortField === 'alphabetical') {
				const aText = a.task_text[0].toLowerCase();
				const bText = b.task_text[0].toLowerCase();
				return sortOrder === 'asc' ? (bText > aText ? -1 : 1) : aText > bText ? -1 : 1;
			}

			if (sortField === 'dueDate') {
				if (a.due_datetime && b.due_datetime) {
					return sortOrder === 'desc'
						? compareDesc(new Date(a.due_datetime), new Date(b.due_datetime))
						: compareAsc(new Date(a.due_datetime), new Date(b.due_datetime));
				}
				if (a.due_datetime) return -1;
				if (b.due_datetime) return 1;
			}

			if (sortField === 'creationDate') {
				return sortOrder === 'asc'
					? compareAsc(new Date(a.creation_date), new Date(b.creation_date))
					: compareDesc(new Date(a.creation_date), new Date(b.creation_date));
			}

			return compareDesc(new Date(a.creation_date), new Date(b.creation_date));
		};
	}, [sortField, sortOrder]);

	const filterTodos = useMemo((): FilterFn => {
		return (todo: any) => {
			if (filterField === 'categories') {
				return todo.matchingCategories > 0;
			}

			if (filterField === 'dueDate') {
				if (filterValue === 'Today') {
					return isToday(todo.due_datetime);
				} else if (filterValue === 'Tomorrow') {
					return isTomorrow(todo.due_datetime);
				} else if (filterValue === 'This Week') {
					return isThisWeek(todo.due_datetime);
				} else if (filterValue === 'This Month') {
					return isThisMonth(todo.due_datetime);
				} else if (filterValue === 'No Due Date') {
					return todo.due_datetime === null;
				}
			}
			return true;
		};
	}, [filterField, filterValue]);

	const { incompleteTodos, completeTodos } = useMemo(() => {
		const selectedCategories: Set<string> = new Set(filterValue?.split(',') ?? []);
		let incomplete: any[] = [];
		let complete: any[] = [];

		for (const todo of todos) {
			(todo.is_completed ? complete : incomplete).push({
				...todo,
				matchingCategories:
					todo.categories?.filter(category => selectedCategories.has(category.category_title)).length ?? 0,
			});
		}

		const sortFn = getSortFn;

		if (filterField) {
			incomplete = incomplete.filter(filterTodos);
			complete = complete.filter(filterTodos);
		}

		incomplete.sort(sortFn);
		complete.sort();

		return {
			incompleteTodos: incomplete,
			completeTodos: complete,
		};
	}, [todos, sortField, sortOrder, filterField, filterValue]);

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
