'use client';
import { useEffect, useRef } from 'react';

export function RenderCounter() {
	const renderCount = useRef(0);

	useEffect(() => {
		renderCount.current += 1;
	});

	return <div>Client Side Render count: {renderCount.current}</div>;
}
