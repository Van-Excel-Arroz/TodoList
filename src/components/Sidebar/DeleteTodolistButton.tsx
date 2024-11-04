'use client';

import { MdDeleteOutline } from 'react-icons/md';
import { deleteTodolistAction } from '@/actions/todolist-action';
import { memo } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface DeleteTodolistButtonProps {
	todolistId: number;
}

function DeleteTodolistButton({ todolistId }: DeleteTodolistButtonProps) {
	const router = useRouter();
	const pathname = usePathname();

	const onSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		await deleteTodolistAction(todolistId, 1);
		if (pathname === `/tasks/${todolistId}`) {
			router.push('/tasks/home');
		}
	};

	return (
		<form onSubmit={onSubmit}>
			<button type="submit">
				<MdDeleteOutline size={16} className="cursor-pointer" />
			</button>
		</form>
	);
}

export default memo(DeleteTodolistButton);
