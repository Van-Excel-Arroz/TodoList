import { AnimatePresence, motion } from 'framer-motion';
import { Todo } from '@/types';
import TodoSection from './TodoSection';
import { useTodoDataManagement } from '@/hooks/useTodoDataManagement';

export default function TodoListView({ todos }: { todos: Todo[] }) {
	const { incompleteTodos, completeTodos } = useTodoDataManagement(todos);

	return (
		<div>
			<AnimatePresence>
				<motion.div
					layout
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.15 }}
				>
					<TodoSection title="Todos" todos={incompleteTodos} />
				</motion.div>
				<motion.div
					layout
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.15 }}
				>
					<TodoSection title="Completed Todos" todos={completeTodos} />
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
