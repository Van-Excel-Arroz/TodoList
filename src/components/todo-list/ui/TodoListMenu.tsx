'use client';

import { deleteTodolistAction } from '@/actions/todolist-action';
import Button from '@/components/ui-shared/Button';
import Menu from '@/components/ui-shared/Menu';
import MenuItem from '@/components/ui-shared/MenuItem';
import useTodoListsStore from '@/context/TodoListsContext';
import { Ellipsis, SquarePen, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface TodoListMenu {
	setToEditing: () => void;
	todolistId: number;
}

export default function TodoListMenu({ setToEditing, todolistId }: TodoListMenu) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const router = useRouter();
	const { deleteTodolist } = useTodoListsStore();

	const handleTodoListDelete = async () => {
		const toastId = toast.loading('Deleting todo list...');
		const result = await deleteTodolistAction(todolistId);

		if (result.success) {
			deleteTodolist(todolistId);
			router.push('/tasks');
			toast.success(result.message, { id: toastId });
		} else {
			console.error(result.message);
			toast.error(result.message, { id: toastId });
		}
	};

	return (
		<div className="relative">
			<Button ariaLabel="Settings" onClick={() => setIsMenuOpen(prev => !prev)}>
				<Ellipsis size={22} />
			</Button>
			<Menu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} width="w-44">
				<MenuItem clickable={false} className="font-bold border-b justify-center">
					<p>TodoList Option</p>
				</MenuItem>
				<MenuItem
					onClick={() => {
						setToEditing();
						setIsMenuOpen(false);
					}}
				>
					<SquarePen size={18} className="text-slate-600" />
					<p>Rename</p>
				</MenuItem>
				<MenuItem onClick={() => handleTodoListDelete()}>
					<Trash2 size={18} className="text-red-600" />
					<p>Delete</p>
				</MenuItem>
			</Menu>
		</div>
	);
}
