'use client';

import { deleteTodoDueDateAction, updateTodoDueDateAction } from '@/actions/todo-action';
import Button from '@/components/ui-shared/Button';
import DueDateInput from '@/components/ui-shared/DueDateInput';
import DueTimeInput from '@/components/ui-shared/DueTimeInput';
import useSelectedTodoIdStore from '@/context/SelectedTodoIdContext';
import useTodosStore from '@/context/TodosContext';
import { CalendarDays, Save, Undo } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function TodoDueDate({ dueDate }: { dueDate: string }) {
	const { selectedTodoId } = useSelectedTodoIdStore();
	const { updateDueDate, deleteDueDate } = useTodosStore();
	const [isChanged, setIsChanged] = useState(false);
	const [selectedDueDate, updateSelectedTodoDueDate] = useState<string | undefined>(dueDate);

	const handleSave = async () => {
		if (!selectedDueDate) return;
		const result = await updateTodoDueDateAction(selectedTodoId, selectedDueDate);
		if (!result.success) {
			toast.error(result.message);
			return;
		}
		updateDueDate(selectedTodoId, selectedDueDate);
		setIsChanged(false);
	};

	const handleDeleteDueDate = async () => {
		const result = await deleteTodoDueDateAction(selectedTodoId);
		if (!result.success) {
			toast.error(result.message);
			return;
		}
		updateSelectedTodoDueDate(undefined);
		deleteDueDate(selectedTodoId);
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
		if (dueDate || selectedDueDate) {
			setIsChanged(dueDate !== selectedDueDate);
		} else {
			setIsChanged(false);
		}
	}, [dueDate, selectedDueDate]);

	useEffect(() => {
		updateSelectedTodoDueDate(dueDate);
	}, [selectedTodoId, dueDate]);

	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-between pb-1">
				<div className="flex items-center gap-2">
					<CalendarDays size={18} className="text-slate-600" />
					<p className="py-1">Due Date</p>
				</div>
				<div className="flex items-center gap-1">
					{isChanged && (
						<>
							<Button ariaLabel="Save Due Date" type="submit" onClick={() => handleSave()}>
								<Save size={18} />
							</Button>
							<Button ariaLabel="Reset Due Date" type="submit" onClick={() => handleUndoDueDate()}>
								<Undo size={18} />
							</Button>
						</>
					)}
					{selectedDueDate && !isChanged && (
						<Button ariaLabel="Delete Due Date" type="submit" onClick={() => handleDeleteDueDate()}>
							<p>Clear</p>
						</Button>
					)}
				</div>
			</div>
			<div className="flex items-center gap-2 w-full">
				<div className="w-1/2 flex justify-center rounded-md px-1 py-2 border bg-white border-slate-300 ring-offset-2 ring-slate-400 hover:ring-2 focus-within:ring-2">
					<DueDateInput dueDate={selectedDueDate} setDueDate={updateSelectedTodoDueDate} defaultEmptyText={true} />
				</div>
				<div className="w-1/2 flex justify-center rounded-md px-1 py-2 border bg-white border-slate-300 ring-offset-2 ring-slate-400 hover:ring-2 focus-within:ring-2">
					<DueTimeInput dueDate={selectedDueDate} setDueDate={updateSelectedTodoDueDate} defaultEmptyText={true} />
				</div>
			</div>
		</div>
	);
}
