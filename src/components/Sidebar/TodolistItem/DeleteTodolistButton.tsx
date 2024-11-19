'use client';

import { deleteTodolistAction } from '@/actions/todolist-action';
import { memo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

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
		<form onSubmit={onSubmit} className="flex items-center">
			<button type="submit" aria-label="Delete Todolist">
				<Trash2 size={15} />
			</button>
		</form>
	);
}

export default memo(DeleteTodolistButton);
