export default function TodoListTitleInput({ register }: { register: any }) {
	return (
		<input
			{...register('title', {
				required: true,
			})}
			type="text"
			placeholder="New list"
			className=" rounded-lg p-2 w-full border border-slate-300 hover:border-slate-400 focus:border-slate-400 focus:outline-none"
		/>
	);
}
