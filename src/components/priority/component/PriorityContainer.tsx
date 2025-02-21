'use client';

import ExpandableSection from '@/components/ui-shared/ExpandableSection';
import { TodoList } from '@/utils/types';

interface PriorityContainerProps extends TodoList {}

export default function PriorityContainer({ important_todos }) {
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
