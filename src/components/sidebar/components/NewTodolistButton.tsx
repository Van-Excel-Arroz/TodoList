'use client';

import Button from '@/components/ui-shared/Button';
import { memo, useEffect, useState } from 'react';
import TodolistForm from '../ui/TodolistForm';
import useUserIdStore from '@/context/userIdContext';

function NewTodolistButton({ userId }: { userId: number }) {
	const [isAddingList, setIsAddingList] = useState(false);
	const { setUserId } = useUserIdStore();

	useEffect(() => setUserId(userId), [userId, setUserId]);

	return (
		<div className="w-full flex justify-center py-6">
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
