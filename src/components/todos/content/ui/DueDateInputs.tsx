export default function DuedDateInputs({ register }: { register: any }) {
	return (
		<div className="flex flex-wrap gap-2 justify-between px-4 pb-2 w-full text-sm">
			<div className="flex gap-10">
				<input
					{...register('date')}
					type="date"
					className="focus:outline-slate-400 cursor-pointer hover:outline hover:outline-1 hover:outline-slate-400 rounded-lg"
					id="date"
					aria-label="Due Date"
				/>

				<input
					{...register('time')}
					type="time"
					step="1"
					className="focus:outline-slate-400 cursor-pointer hover:outline hover:outline-1 hover:outline-slate-400 rounded-lg"
					id="time"
					aria-label="Due Time"
				/>
			</div>
		</div>
	);
}
