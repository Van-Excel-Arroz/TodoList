import Button from '@/components/ui-shared/Button';
import useQueryParams from '@/hooks/useQueryParams';
import { Search } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function TodoSearch() {
	const { register, watch } = useForm();
	const { getQueryParam, updateSearchParams } = useQueryParams();
	const [id] = getQueryParam('id');
	const searchValue = watch('search');

	useEffect(() => {
		// updateSearchParams('search', searchValue, id);
	}, [updateSearchParams, searchValue, id]);

	return (
		<form className="flex items-center gap-2 w-60 pt-2">
			<Button ariaLabel="Search">
				<Search size={20} />
			</Button>
			<input
				{...register('search')}
				type="text"
				className="px-2 py-1 text-md border-b-2 focus:outline-none focus:border-slate-500 hover:border-slate-400 border-slate-300"
				placeholder="Search tasks..."
			/>
		</form>
	);
}
