import { SendHorizontal, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface CategoryFormProps {
	onSubmit: (data: CategoryFormInputs) => void;
	onCancel: () => void;
}

interface CategoryFormInputs {
	category_title: string;
	hex_color: string;
}

export default function CategoryForm({ onSubmit, onCancel }: CategoryFormProps) {
	const { register, handleSubmit, reset } = useForm<CategoryFormInputs>();

	const handleFormSubmit = async (data: CategoryFormInputs) => {
		await onSubmit(data);
		reset();
	};

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="flex items-center gap-2 justify-end">
			<input type="color" className="w-5 h-5 cursor-pointer" defaultValue="#000000" {...register('hex_color')} />
			<input
				type="text"
				className="border rounded-md w-1/2 p-1 text-sm focus:outline-none focus:border-slate-400 hover:border-slate-400"
				placeholder="Category Title"
				autoComplete="off"
				{...register('category_title', { maxLength: 20 })}
			/>
			<button className="hover:bg-slate-200 rounded-md p-1" aria-label="Add Category" type="submit">
				<SendHorizontal size={20} />
			</button>
			<button onClick={onCancel} className="hover:bg-slate-200 rounded-md p-1" aria-label="Cancel Adding Category">
				<X size={20} />
			</button>
		</form>
	);
}
