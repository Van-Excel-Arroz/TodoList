'use client';

import { Button } from '@/components/ui-shared/Button';
import DatePicker from '@/components/ui-shared/DatePicker';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';
import { Save, Trash2, Undo } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TodoDueDateProps {
	dueDatetime: string;
	todoId: number;
}

export default function TodoDueDate({ dueDatetime, todoId }: TodoDueDateProps) {
	const { updateSelectedTodoDueDate, selectedTodo } = useSelectedTodoStore();
	const { updateDueDate, deleteDueDate, todos } = useTodosStore();
	const [isChanged, setIsChanged] = useState(false);
	const initialDate = dueDatetime ? new Date(dueDatetime) : undefined;

	const currentSavedDueDate = todos.filter(todo => todo.id === todoId)[0]?.due_datetime;

	const handleOnSubmit = () => {
		if (!initialDate) return;
		updateDueDate(todoId, initialDate.toISOString());
		setIsChanged(false);
	};

	const handleDeleteDueDate = () => {
		updateSelectedTodoDueDate(undefined);
		deleteDueDate(todoId);
	};

	const handleUndoDueDate = () => {
		if (currentSavedDueDate) {
			updateSelectedTodoDueDate(new Date(dueDatetime));
		} else {
			updateSelectedTodoDueDate(undefined);
		}
	};

	useEffect(() => {
		if (currentSavedDueDate) {
			const hasChanged = dueDatetime !== currentSavedDueDate;
			setIsChanged(hasChanged);
		}
	}, [selectedTodo?.due_datetime, dueDatetime]);

	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-between">
				<p className="pb-2 text-slate-600">Due Date</p>

				<div className="flex items-center gap-1">
					{isChanged && (
						<>
							<Button ariaLabel="Save Due Date" type="submit" onClick={() => handleOnSubmit()}>
								<Save size={18} />
							</Button>
							<Button ariaLabel="Reset Due Date" type="submit" onClick={() => handleUndoDueDate()}>
								<Undo size={18} />
							</Button>
						</>
					)}
					{selectedTodo?.due_datetime && !isChanged && (
						<Button ariaLabel="Delete Due Date" type="submit" onClick={() => handleDeleteDueDate()}>
							<Trash2 size={18} />
						</Button>
					)}
				</div>
			</div>
			<div className="flex items-center justify-between gap-4 rounded-md px-1 py-2 border bg-white border-slate-300 hover:border-slate-400">
				<DatePicker dueDate={initialDate} setDueDate={updateSelectedTodoDueDate} defaultEmptyText={true} />
			</div>
		</div>
	);
}
