import { motion } from 'framer-motion';
import { Todo } from '@/types';
import TodoSection from './TodoSection';
import { useTodoDataManagement } from '@/hooks/useTodoDataManagement';

export default function TodoListView({ todos }: { todos: Todo[] }) {
	const { incompleteTodos, completeTodos } = useTodoDataManagement(todos);

	return (
		<div>
			<motion.div>
				<TodoSection title="Todos" todos={incompleteTodos} />
			</motion.div>
			<motion.div layout transition={{ duration: 0.15 }}>
				<TodoSection title="Completed Todos" todos={completeTodos} />
			</motion.div>
		</div>
	);
}
