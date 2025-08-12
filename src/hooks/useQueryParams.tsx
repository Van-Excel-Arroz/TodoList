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
		(paramsToUpdate: { [paramKey: string]: string | null }, storageKey: string) => {
			console.log(paramsToUpdate);
			const searchParamsCopy = new URLSearchParams(searchParams.toString());
			for (const [paramKey, paramValue] of Object.entries(paramsToUpdate)) {
				if (paramValue) {
					searchParamsCopy.set(paramKey, paramValue);
				} else {
					searchParamsCopy.delete(paramKey);
				}
			}

			const newQueryString = searchParamsCopy.toString();
			const targetPath = `/tasks/?${newQueryString}`;

			router.push(targetPath);

			if (storageKey !== undefined && storageKey !== null) {
				localStorage.setItem(`searchParams-${storageKey}`, newQueryString);
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
