import { Todo } from '@/utils/types';
import { compareAsc, compareDesc, isThisMonth, isThisWeek, isToday, isTomorrow } from 'date-fns';
import { useMemo } from 'react';
import useQueryParams from './useQueryParams';

type SortFn = (a: Todo, b: Todo) => number;
type FilterFn = (todo: Todo) => boolean;

const DATE_FILTERS = {
	Today: isToday,
	Tomorrow: isTomorrow,
	'This Week': isThisWeek,
	'This Month': isThisMonth,
	'No Due Date': (date: string) => date === '',
} as const;

export function useTodoDataManagement(todos: Todo[]): {
	incompleteTodos: Todo[];
	completeTodos: Todo[];
} {
	const { getQueryParam } = useQueryParams();
	const [filterField, filterValue] = getQueryParam('filter');
	const [sortField, sortOrder] = getQueryParam('sort');
	const [searchValue] = getQueryParam('search');

	const getSortFn = useMemo((): SortFn => {
		return (a: Todo, b: Todo) => {
			if (sortField === undefined || sortField === 'Importance') {
				if (a.is_important !== b.is_important) {
					return sortOrder === 'asc' ? (a.is_important ? 1 : -1) : a.is_important ? -1 : 1;
				}
			}

			if (sortField === 'Alphabetical') {
				const aText = a.task_text[0].toLowerCase();
				const bText = b.task_text[0].toLowerCase();
				return sortOrder === 'asc' ? (bText > aText ? -1 : 1) : aText > bText ? -1 : 1;
			}

			if (sortField === 'Due Date') {
				if (a.due_datetime && b.due_datetime) {
					return sortOrder === 'desc'
						? compareDesc(new Date(a.due_datetime), new Date(b.due_datetime))
						: compareAsc(new Date(a.due_datetime), new Date(b.due_datetime));
				}
				if (a.due_datetime) return -1;
				if (b.due_datetime) return 1;
			}

			if (sortField === 'Creation Date') {
				return sortOrder === 'asc'
					? compareAsc(new Date(a.creation_date), new Date(b.creation_date))
					: compareDesc(new Date(a.creation_date), new Date(b.creation_date));
			}

			return compareDesc(new Date(a.creation_date), new Date(b.creation_date));
		};
	}, [sortField, sortOrder]);

	const getFilterFn = useMemo((): FilterFn => {
		if (searchValue) {
			return todo => {
				console.log('search');
				const taskTextLower = todo.task_text.toLowerCase();
				const searchLower = searchValue.toLowerCase();
				return taskTextLower.includes(searchLower);
			};
		}
		if (!filterField || !filterValue) return () => true;

		if (filterField === 'Categories') {
			const selectedCategories = new Set(filterValue?.split(',') ?? []);
			return todo => todo.categories?.some(cat => selectedCategories.has(cat.category_title)) ?? false;
		}

		if (filterField === 'Due Date' && filterValue in DATE_FILTERS) {
			const filterFn = DATE_FILTERS[filterValue as keyof typeof DATE_FILTERS];
			return todo => filterFn(todo.due_datetime ?? '');
		}

		return () => true;
	}, [filterField, filterValue, searchValue]);

	return useMemo(() => {
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
}
