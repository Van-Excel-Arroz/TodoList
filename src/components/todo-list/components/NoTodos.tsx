'use client';

import useQueryParams from '@/hooks/useQueryParams';
import TodoForm from './TodoForm';

export default function NoTodos() {
	const { getQueryParam } = useQueryParams();
	const [todolistId] = getQueryParam('id');

	return (
		<div className="px-4">
			<TodoForm todolistId={Number(todolistId)} />
			<div className="text-center text-gray-600 mt-10">
				<p className="text-lg">No todos found</p>
				<p className="text-sm">Create a new todo to get started</p>
			</div>
		</div>
	);
}
