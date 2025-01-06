'use client';

import { deleteTodoDueDateAction, updateTodoDueDateAction } from '@/actions/todo-action';
import { Button } from '@/components/ui-shared/Button';
import DueDate from '@/components/ui-shared/DueDate';
import DueTime from '@/components/ui-shared/DueTime';
import useSelectedTodoStore from '@/context/SelectedTodoContext';
import useTodosStore from '@/context/TodosContext';
import { CalendarDays, Save, Undo } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TodoDueDate({ dueDate }: { dueDate: string }) {
	const { selectedTodo } = useSelectedTodoStore();
	const { updateDueDate, deleteDueDate } = useTodosStore();
	const [isChanged, setIsChanged] = useState(false);
	const [selectedDueDate, updateSelectedTodoDueDate] = useState<string | undefined>(dueDate);
	const todoId = selectedTodo?.id ?? 0;

	const handleOnSubmit = async () => {
		if (!selectedDueDate) return;
		await updateTodoDueDateAction(todoId, selectedDueDate);
		updateDueDate(todoId, selectedDueDate);
		setIsChanged(false);
	};

	const handleDeleteDueDate = async () => {
		await deleteTodoDueDateAction(todoId);
		updateSelectedTodoDueDate(undefined);
		deleteDueDate(todoId);
	};

	const handleUndoDueDate = () => {
		if (dueDate) {
			updateSelectedTodoDueDate(dueDate);
		} else {
			updateSelectedTodoDueDate(undefined);
		}
		setIsChanged(false);
	};

	useEffect(() => {
		if (dueDate) {
			setIsChanged(dueDate !== selectedDueDate);
		} else {
			setIsChanged(false);
		}
	}, [dueDate, selectedDueDate]);

	useEffect(() => {
		updateSelectedTodoDueDate(dueDate);
	}, [todoId]);

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
					<DueDate dueDate={selectedDueDate} setDueDate={updateSelectedTodoDueDate} defaultEmptyText={true} />
				</div>
				<div className="w-1/2 flex justify-center rounded-md px-1 py-2 border bg-white border-slate-300 hover:border-slate-400">
					<DueTime
						dueDate={selectedDueDate}
						setDueDate={updateSelectedTodoDueDate}
						defaultEmptyText={true}
						right={true}
					/>
				</div>
			</div>
		</div>
	);
}
