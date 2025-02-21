'use client';

import ExpandableSection from '@/components/ui-shared/ExpandableSection';
import { TodoListWithImportantTodos } from '@/utils/types';

export default function PriorityContainer({ important_todos }: TodoListWithImportantTodos[]) {
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
