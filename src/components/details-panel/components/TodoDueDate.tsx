'use client';

import { deleteTodoDueDateAction, updateTodoDueDateAction } from '@/actions/todo-action';
import { Button } from '@/components/ui-shared/Button';
import DueDate from '@/components/ui-shared/DueDate';
import DueTime from '@/components/ui-shared/DueTime';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';
import { CalendarDays, Save, Undo } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TodoDueDate() {
	const { updateSelectedTodoDueDate, selectedTodo } = useSelectedTodoStore();
	const { updateDueDate, deleteDueDate, todos } = useTodosStore();
	const [isChanged, setIsChanged] = useState(false);
	const todoId = selectedTodo?.id ?? 0;
	const selectedDueDate = selectedTodo?.due_datetime ?? '';
	const currentSavedDueDate = todos.filter(todo => todo.id === todoId)[0]?.due_datetime;
	const initialDate = selectedDueDate ? new Date(selectedDueDate) : undefined;

	const handleOnSubmit = async () => {
		if (!initialDate) return;
		await updateTodoDueDateAction(todoId, initialDate.toISOString());
		updateDueDate(todoId, initialDate.toISOString());
		setIsChanged(false);
	};

	const handleDeleteDueDate = async () => {
		await deleteTodoDueDateAction(todoId);
		updateSelectedTodoDueDate(undefined);
		deleteDueDate(todoId);
	};

	const handleUndoDueDate = () => {
		if (currentSavedDueDate) {
			updateSelectedTodoDueDate(new Date(currentSavedDueDate));
		} else {
			updateSelectedTodoDueDate(undefined);
		}
		setIsChanged(false);
	};

	useEffect(() => {
		if (currentSavedDueDate) {
			const currentDate = currentSavedDueDate ? new Date(currentSavedDueDate).toISOString() : '';
			const selectedDate = selectedDueDate ? new Date(selectedDueDate).toISOString() : '';
			setIsChanged(currentDate !== selectedDate);
		} else if (selectedDueDate) {
			setIsChanged(true);
		} else {
			setIsChanged(false);
		}
	}, [currentSavedDueDate, selectedDueDate]);

	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-between pb-1">
				<div className="flex items-center text-slate-600 gap-2">
					<CalendarDays size={18} />
					<p className="text-slate-600 py-1">Due Date</p>
				</div>
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
							<p>Clear</p>
						</Button>
					)}
				</div>
			</div>
			<div className="flex items-center gap-2 w-full">
				<div className="w-1/2 flex justify-center rounded-md px-1 py-2 border bg-white border-slate-300 hover:border-slate-400">
					<DueDate dueDate={initialDate} setDueDate={updateSelectedTodoDueDate} defaultEmptyText={true} />
				</div>
				<div className="w-1/2 flex justify-center rounded-md px-1 py-2 border bg-white border-slate-300 hover:border-slate-400">
					<DueTime dueDate={initialDate} setDueDate={updateSelectedTodoDueDate} defaultEmptyText={true} right={true} />
				</div>
			</div>
		</div>
	);
}
