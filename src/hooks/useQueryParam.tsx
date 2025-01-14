import { useSearchParams } from 'next/navigation';

export function useQueryParam() {
	const searchParams = useSearchParams();

	const useQueryParam = (paramName: string) => {
		const value = searchParams.get(paramName);
		return value?.split(':') || [];
	};

	return useQueryParam;
}
