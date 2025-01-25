export default function TodoInput({ register }: { register: any }) {
	return (
		<input
			{...register('todo', {
				required: true,
				maxLength: { value: 100, message: 'Exceeded maximum length of 100' },
			})}
			type="text"
			placeholder="Add a task... #Category"
			autoComplete="off"
			autoFocus
			className="bg-white w-full rounded-lg outline-2 outline-dashed outline-slate-300  hover:outline-slate-500 focus:outline-slate-500 px-4 py-2"
		/>
	);
}
