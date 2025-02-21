'use client';

import ExpandableSection from '@/components/ui-shared/ExpandableSection';
import { TodoListWithImportantTodos } from '@/utils/types';

export default function PriorityContainer({ importantTodosWithTodoList }: TodoListWithImportantTodos[]) {
	return (
		<>
			{importantTodosWithTodoList.map(todoList => (
				<ExpandableSection isEmpty={false} title={todoList.title}>
					<p></p>
				</ExpandableSection>
			))}
		</>
	);
}
