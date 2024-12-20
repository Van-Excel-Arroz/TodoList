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
			className="pt-1 px-1 w-full focus:outline-none"
		/>
	);
}
