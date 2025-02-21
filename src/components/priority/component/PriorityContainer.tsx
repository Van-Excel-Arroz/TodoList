'use client';

import ExpandableSection from '@/components/ui-shared/ExpandableSection';
import { Todo, TodoList } from '@/utils/types';

interface PriorityContainerProps {
	important_todos: Todo[];
}

export default function PriorityContainer({ important_todos }: PriorityContainerProps) {
	return (
		<>
			{important_todos.map(important_todo => (
				<ExpandableSection isEmpty={false} title={important_todo.title}>
					<p></p>
				</ExpandableSection>
			))}
		</>
	);
}
