'use client';

import Button from '@/components/ui-shared/Button';
import { useState } from 'react';
import TodolistForm from '../ui/TodolistForm';

export default function NewTodolistButton() {
	const [isAddingList, setIsAddingList] = useState(false);

	return (
		<div className="fixed w-full flex justify-center py-6 border-t border-slate-300">
			{isAddingList ? (
				<TodolistForm handleIsAddingList={setIsAddingList} />
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
