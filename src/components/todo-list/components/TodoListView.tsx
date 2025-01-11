import { motion } from 'framer-motion';
import { Todo } from '@/types';
import TodoSection from './TodoSection';
import { compareAsc, compareDesc, isThisMonth, isThisWeek, isToday, isTomorrow } from 'date-fns';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { todo } from 'node:test';

type SortFn = (a: Todo, b: Todo) => number;
type FilterFn = (todo: Todo) => boolean;

interface TodoListViewProps {
	todos: Todo[];
}

const DATE_FILTERS = {
	Today: isToday,
	Tomorrow: isTomorrow,
	'This Week': isThisWeek,
	'This Month': isThisMonth,
	'No Due Date': (date: string | null) => date === null,
} as const;

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

	const getFilterFn = useMemo((): FilterFn => {
		if (!filterField || !filterValue) return () => true;

		if (filterField === 'categories') {
			const selectedCategories = new Set(filterValue?.split(',') ?? []);
			return todo => todo.categories?.some(cat => selectedCategories.has(cat.category_title)) ?? false;
		}

		if (filterField === 'dueDate' && filterValue in DATE_FILTERS) {
			const filterFn = DATE_FILTERS[filterValue as keyof typeof DATE_FILTERS];
			return todo => filterFn(todo.due_datetime!);
		}

		return () => true;
	}, [filterField, filterValue]);

	const { incompleteTodos, completeTodos } = useMemo(() => {
		const filterFn = getFilterFn;
		const sortFn = getSortFn;

		const filtered = todos.reduce(
			(acc, todo) => {
				if (!filterFn(todo)) return acc;

				const list = todo.is_completed ? acc.complete : acc.incomplete;
				list.push(todo);
				return acc;
			},
			{ incomplete: [] as Todo[], complete: [] as Todo[] }
		);

		return {
			incompleteTodos: filtered.incomplete.sort(sortFn),
			completeTodos: filtered.complete.sort(sortFn),
		};
	}, [todos, getFilterFn, getSortFn]);

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
