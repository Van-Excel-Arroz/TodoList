'use client';

import TodoItem from '@/components/todo-list/components/TodoItem';
import ExpandableSection from '@/components/ui-shared/ExpandableSection';
import { TodoListWithImportantTodos } from '@/utils/types';

interface PriorityContainerProps {
	todoList: TodoListWithImportantTodos;
}

export default function PriorityContainer({ todoList }: PriorityContainerProps) {
	return (
		<ExpandableSection isEmpty={false} title={todoList.title}>
			{todoList.importantTodos.map((todo, index) => (
				<TodoItem todo={todo} key={index} />
			))}
		</ExpandableSection>
	);
}
