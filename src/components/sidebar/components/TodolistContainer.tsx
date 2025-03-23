'use client';

import { TodoList } from '@/utils/types';
import { memo, useEffect } from 'react';
import useTodoListsStore from '@/context/TodoListsContext';
import { AnimatePresence, motion } from 'framer-motion';
import ExpandableSection from '../../ui-shared/ExpandableSection';
import ListLinkItem from '../ui/ListLinkItem';
import { List } from 'lucide-react';
import TodoListEmptyText from '../ui/TodoListEmptyText';
import { itemVariants } from '@/utils/framer-motion';

function TodolistContainer({ initialTodoLists }: { initialTodoLists: TodoList[] }) {
	const { todolists, setTodolists } = useTodoListsStore();

	useEffect(() => {
		if (todolists.length === 0) {
			setTodolists(initialTodoLists);
		}
	}, [initialTodoLists, setTodolists, todolists]);
	const isTodolistsEmpty = todolists.length === 0;

	return (
		<div className="flex flex-col overflow-y-auto overflow-hidden px-5 py-3">
			{isTodolistsEmpty ? (
				<TodoListEmptyText />
			) : (
				<>
					<ExpandableSection isEmpty={isTodolistsEmpty} title="Lists" className="m-0">
						<ul className="flex flex-col gap-2 w-full">
							<AnimatePresence>
								{todolists.map((todolist, index) => (
									<motion.li key={index} layout variants={itemVariants} initial="initial" animate="animate" exit="exit">
										<ListLinkItem queryParam="id" value={todolist.id.toString()} Icon={List}>
											{todolist.title}
										</ListLinkItem>
									</motion.li>
								))}
							</AnimatePresence>
						</ul>
					</ExpandableSection>
				</>
			)}
		</div>
	);
}

export default memo(TodolistContainer);
