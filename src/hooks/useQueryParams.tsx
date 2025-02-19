import { useSearchParams, useRouter } from 'next/navigation';

export default function useQueryParams() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const getQueryParam = (field: string) => {
		const value = searchParams.get(field);
		return value?.split(':') || [];
	};
	const updateSearchParams = (field: string, value: string | null, todolistId: string) => {
		const params = new URLSearchParams(searchParams.toString());
		value ? params.set(`${field}`, value) : params.delete(`${field}`);
		router.push(`/tasks/?${params.toString()}`);
		localStorage.setItem(`searchParams-${todolistId}`, `/tasks/?${params.toString()}`);
	};

	return {
		getQueryParam,
		updateSearchParams,
	};
}
