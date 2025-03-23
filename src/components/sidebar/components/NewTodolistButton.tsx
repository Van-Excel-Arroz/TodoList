'use client';

import Button from '@/components/ui-shared/Button';
import { useState } from 'react';
import TodolistForm from '../ui/TodolistForm';

export default function NewTodolistButton() {
	const [isAddingList, setIsAddingList] = useState(false);

	return (
		<>
			{isAddingList ? (
				<TodolistForm handleIsAddingList={setIsAddingList} />
			) : (
				<Button
					ariaLabel="add new list"
					darkMode={true}
					onClick={() => setIsAddingList(prev => !prev)}
					className="w-[80%] h-9 mx-auto px-6"
				>
					New List
				</Button>
			)}
		</>
	);
}
