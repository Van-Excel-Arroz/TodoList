import { useSearchParams, useRouter } from 'next/navigation';

export default function useQueryParams() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const getQueryParam = (paramName: string) => {
		const value = searchParams.get(paramName);
		return value?.split(':') || [];
	};
	const updateSearchParams = (field: string, value: string | null) => {
		const params = new URLSearchParams(searchParams.toString());
		value ? params.set(`${field}`, value) : params.delete(`${field}`);
		router.push(`/tasks/?${params.toString()}`);
	};

	return {
		getQueryParam,
		updateSearchParams,
	};
}
