'use client';

import ExpandableSection from '@/components/ui-shared/ExpandableSection';
import { TodoListWithImportantTodos } from '@/utils/types';

export default function PriorityContainer({ todoList }: TodoListWithImportantTodos) {
	return (
		<>
			<ExpandableSection isEmpty={false} title={todoList.title}>
				<p></p>
			</ExpandableSection>
		</>
	);
}
