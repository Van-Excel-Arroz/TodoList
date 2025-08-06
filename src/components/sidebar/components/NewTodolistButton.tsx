'use client';

import Button from '@/components/ui-shared/Button';
import { memo, useState } from 'react';
import TodolistForm from '../ui/TodolistForm';

function NewTodolistButton({ userId }: { userId: number }) {
	const [isAddingList, setIsAddingList] = useState(false);

	return (
		<div className="w-full flex justify-center py-6 border-t border-slate-300">
			{isAddingList ? (
				<TodolistForm handleIsAddingList={setIsAddingList} userId={userId} />
			) : (
				<Button
					ariaLabel="add new list"
					darkMode={true}
					onClick={() => setIsAddingList(prev => !prev)}
					className="w-[80%] py-2"
				>
					New List
				</Button>
			)}
		</div>
	);
}

export default memo(NewTodolistButton);
