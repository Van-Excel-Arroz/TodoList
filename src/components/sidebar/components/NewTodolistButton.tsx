'use client';

import { Button } from '@/components/ui-shared/Button';
import { useState } from 'react';
import TodolistForm from './TodolistForm';

export default function NewTodolistButton() {
	const [isAddingList, setIsAddingList] = useState(false);

	return (
		<>
			{isAddingList ? (
				<TodolistForm />
			) : (
				<Button
					ariaLabel="add new list"
					darkMode={true}
					onClick={() => setIsAddingList(prev => !prev)}
					className="w-full h-9 mx-auto"
				>
					New List
				</Button>
			)}
		</>
	);
}
