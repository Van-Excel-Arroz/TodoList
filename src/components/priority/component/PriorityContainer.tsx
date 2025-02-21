'use client';

import ExpandableSection from '@/components/ui-shared/ExpandableSection';
import { TodoListWithImportantTodos } from '@/utils/types';

export default function PriorityContainer({ title, id, importantTodos }: TodoListWithImportantTodos) {
	return (
		<ExpandableSection isEmpty={false} title={title}>
			{importantTodos.map((todo, index) => (
				<p key={index}>{todo.task_text}</p>
			))}
		</ExpandableSection>
	);
}
