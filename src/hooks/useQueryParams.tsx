import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function useQueryParams() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const getQueryParam = useCallback(
		(field: string) => {
			const value = searchParams.get(field);
			return value?.split(':') || [];
		},
		[searchParams]
	);

	const updateSearchParams = useCallback(
		(
			field: string,
			value: string | null,
			key: string,
			field2?: string,
			value2?: string | null,
			field3?: string,
			value3?: string
		) => {
			const params = new URLSearchParams(searchParams.toString());
			value3 ? params.set(`${field3}`, value3) : params.delete(`${field3}`);
			value2 ? params.set(`${field2}`, value2) : params.delete(`${field2}`);
			value ? params.set(`${field}`, value) : params.delete(`${field}`);
			const newQueryString = params.toString();
			const targetPath = `/tasks/?${newQueryString}`;

			router.push(targetPath);

			if (key !== undefined && key !== null) {
				localStorage.setItem(`searchParams-${key}`, newQueryString);
				console.log(localStorage);
			} else {
				console.warn('Attempted to store search params with undefined/null key.');
			}
		},
		[searchParams, router]
	);

	return {
		getQueryParam,
		updateSearchParams,
	};
}
