'use client';

import { Todo } from '@/types';
import TodoItem from './TodoItem';
import { motion } from 'framer-motion';
import { memo } from 'react';

interface TodosRenderProps {
	todos: Todo[];
}

const itemVariants = {
	hidden: { opacity: 0, y: -20 }, // Start from above
	visible: { opacity: 1, y: 0 }, // End at normal position
};

function TodosRender({ todos }: TodosRenderProps) {
	return (
		<>
			<div className="bg-white px-8 py-4 border">
				<div className="grid grid-cols-6 font-semibold">
					<p className="col-span-4">Todos</p>
					<p className="text-center">Due Date</p>
					<p className="text-center">Created In</p>
				</div>
				<motion.div initial="hidden" animate="visible">
					{todos.map((todo, index) => (
						<motion.div
							key={todo.id}
							variants={itemVariants}
							transition={{ duration: 0.1, delay: index * 0.05, ease: 'easeOut' }} // Duration for each item
						>
							<TodoItem todo={todo} />
						</motion.div>
					))}
				</motion.div>
			</div>
		</>
	);
}
export default memo(TodosRender);
