'use client';

import { TodoList } from '@/types';
import { useEffect } from 'react';
import useTodoListsStore from '@/context/TodoListsContext';
import { AnimatePresence, motion } from 'framer-motion';
import ExpandableSection from '../ui/ExpandableSection';
import ListLinkItem from '../ui/ListLinkItem';
import { List } from 'lucide-react';
import TodoListEmptyText from '../ui/TodoListEmptyText';

const itemVariants = {
	initial: {
		opacity: 0,
		x: -20,
		transition: { duration: 0.3, type: 'spring' },
	},
	exit: {
		opacity: 0,
		x: -20,
		transition: { duration: 0.2 },
	},
	animate: {
		opacity: 1,
		x: 0,
	},
};

export default function TodolistContainer({ initialTodoLists }: { initialTodoLists: TodoList[] }) {
	const { todolists, setTodolists } = useTodoListsStore();

	useEffect(() => {
		if (todolists.length === 0) {
			setTodolists(initialTodoLists);
		}
	}, [initialTodoLists, setTodolists, todolists]);
	const isTodolistsEmpty = todolists.length === 0;

	return (
		<div className="flex flex-col overflow-y-auto overflow-hidden">
			{isTodolistsEmpty ? (
				<TodoListEmptyText />
			) : (
				<>
					<ExpandableSection isEmpty={isTodolistsEmpty} title="Lists">
						<ul className="flex flex-col gap-2 w-full">
							<AnimatePresence>
								{todolists.map(todolist => (
									<motion.li
										key={todolist.id}
										layout
										variants={itemVariants}
										initial="initial"
										animate="animate"
										exit="exit"
									>
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
