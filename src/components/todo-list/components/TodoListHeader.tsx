'use client';

import { memo, useEffect, useState } from 'react';
import { Category, TodoList } from '@/utils/types';
import useTodoListsStore from '@/context/TodoListsContext';
import useCategoriesStore from '@/context/CategoriesContext';
import TodoListTitle from '../ui/TodoListTitle';
import { Settings } from 'lucide-react';
import Button from '@/components/ui-shared/Button';
import dynamic from 'next/dynamic';
const TodoListSettingsModal = dynamic(() => import('../ui/TodoListSettingsModal'), { ssr: false });

interface TodoListHeaderProps {
	initialTodolist: TodoList;
	categories: Category[];
}

function TodoListHeader({ initialTodolist, categories }: TodoListHeaderProps) {
	const { getTodoListById } = useTodoListsStore();
	const { setCategories } = useCategoriesStore();
	const todolistFromStore = getTodoListById(initialTodolist.id);
	const currentTodolist = todolistFromStore || initialTodolist;
	const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

	useEffect(() => {
		setCategories(categories);
	}, [categories, setCategories]);

	return (
		<>
			<div className="z-50 px-6 bg-white border-b border-slate-300">
				<div className="flex justify-between py-4">
					<TodoListTitle currentTodoList={currentTodolist} />
					<Button ariaLabel="TodoList Setting" onClick={() => setIsSettingModalOpen(prev => !prev)}>
						<Settings size={22} />
					</Button>
				</div>
			</div>
			<TodoListSettingsModal
				isOpen={isSettingModalOpen}
				onClose={() => setIsSettingModalOpen(false)}
				todolistTitle={currentTodolist.title}
			/>
		</>
	);
}

export default memo(TodoListHeader);
