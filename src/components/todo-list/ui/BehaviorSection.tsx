import SortDropDown from '@/components/ui-shared/SortDropDown';

export default function BehaviorSection() {
	return (
		<div className="flex flex-col gap-2">
			<p className="pl-2">Sort tasks by:</p>
			<SortDropDown />

			<p className="pl-2">Filter tasks by:</p>
		</div>
	);
}
