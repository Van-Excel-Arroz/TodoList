'use client';

import { TodoList } from '@/utils/types';
import { memo, useEffect } from 'react';
import useTodoListsStore from '@/context/TodoListsContext';
import { AnimatePresence, motion } from 'framer-motion';
import ExpandableSection from '../../ui-shared/ExpandableSection';
import ListLinkItem from '../ui/ListLinkItem';
import TodoListEmptyText from '../ui/TodoListEmptyText';
import { itemVariants } from '@/utils/framer-motion';
import { iconNameType } from '../ui/ListIcon';

function TodolistContainer({ initialTodoLists }: { initialTodoLists: TodoList[] }) {
	const { todolists, setTodolists } = useTodoListsStore();

	useEffect(() => {
		if (todolists.length === 0) {
			setTodolists(initialTodoLists);
		}
	}, [initialTodoLists, setTodolists, todolists]);

	const isTodolistsEmpty = todolists.length === 0;
	console.log(todolists);

	return (
		<div className="overflow-y-auto px-5 py-3 flex-1">
			{isTodolistsEmpty ? (
				<TodoListEmptyText />
			) : (
				<>
					<ExpandableSection isEmpty={isTodolistsEmpty} title="Lists" className="m-0">
						<ul className="space-y-2">
							<AnimatePresence>
								{todolists.map((todolist, index) => (
									<motion.li key={index} layout variants={itemVariants} initial="initial" animate="animate" exit="exit">
										<ListLinkItem
											queryParam="id"
											itemId={todolist.id.toString()}
											iconName={todolist.listIcon as iconNameType}
										>
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
