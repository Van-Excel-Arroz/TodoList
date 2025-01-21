export default function TodoListTitleInput({ register }: { register: any }) {
	return (
		<input
			{...register('title', {
				required: true,
			})}
			type="text"
			placeholder="New list"
			className=" rounded-lg p-2 w-full border border-slate-300 hover:border-slate-500 focus:border-slate-500 focus:outline-none"
		/>
	);
}
