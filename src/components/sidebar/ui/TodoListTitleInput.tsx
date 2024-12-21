export default function TodoListTitleInput({ register }: { register: any }) {
	return (
		<input
			{...register('title', {
				required: true,
				maxLength: { value: 100, message: 'Exceeded maximum length of 100' },
			})}
			type="text"
			placeholder="New list"
			className=" rounded-lg rounded-r-none py-2 px-2 w-full border border-slate-300 hover:border-slate-400 focus:border-slate-400 focus:outline-none"
		/>
	);
}
