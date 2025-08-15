import Button from '@/components/ui-shared/Button';
import useQueryParams from '@/hooks/useQueryParams';
import { Search, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

type SearchFormData = { search: string };

export default function TodoSearch() {
	const { register, handleSubmit, reset } = useForm<SearchFormData>();
	const { getQueryParam, updateSearchParams } = useQueryParams();
	const [id] = getQueryParam('id');
	const [search] = getQueryParam('search');

	const onSubmit = (data: SearchFormData) => {
		updateSearchParams({ search: data.search }, id);
	};

	const clearSearch = () => {
		updateSearchParams({ search: null }, id);
		reset();
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex items-center justify-between flex-1 w-0 gap-2 px-2 py-1 outline outline-1 outline-slate-300 rounded-md ring-offset-2 ring-slate-400 hover:ring-2 focus-within:ring-2"
		>
			<Button ariaLabel="Search Todo" type="submit">
				<Search size={18} className="text-slate-600" />
			</Button>
			<input
				{...register('search')}
				type="text"
				autoComplete="off"
				className="px-2 text-sm flex-1 focus:outline-none bg-transparent"
				placeholder={search || 'Search tasks...'}
				defaultValue={search || ''}
			/>
			<Button ariaLabel="Clear Search" onClick={() => clearSearch()} disabled={!search}>
				<X size={18} />
			</Button>
		</form>
	);
}
