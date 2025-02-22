'use client';

import TodoItem from '@/components/ui-shared/TodoItem';
import ExpandableSection from '@/components/ui-shared/ExpandableSection';
import { TodoListWithImportantTodos } from '@/utils/types';

interface PrioritySectionProps {
	importantTodosWithTodoList: TodoListWithImportantTodos[];
}

export default function PrioritySection({ importantTodosWithTodoList }: PrioritySectionProps) {
	return (
		<>
			{importantTodosWithTodoList.map((todoList: TodoListWithImportantTodos) => (
				<ExpandableSection isEmpty={false} title={todoList.title}>
					{todoList.importantTodos.map((todo, index) => (
						<TodoItem todo={todo} key={index} />
					))}
				</ExpandableSection>
			))}
		</>
	);
}
