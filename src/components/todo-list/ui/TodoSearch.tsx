import Button from '@/components/ui-shared/Button';
import useQueryParams from '@/hooks/useQueryParams';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function TodoSearch() {
	const { register, handleSubmit } = useForm();
	const { getQueryParam, updateSearchParams } = useQueryParams();
	const [id] = getQueryParam('id');

	const onSubmit = (data: any) => {
		updateSearchParams('search', data.search, id);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 w-60 pt-2 bg-slate-200 rounded-md">
			<Button ariaLabel="Search">
				<Search size={20} />
			</Button>
			<input
				{...register('search')}
				type="text"
				className="px-2 py-1 text-md focus:outline-none bg-transparent"
				placeholder="Search tasks..."
			/>
		</form>
	);
}
