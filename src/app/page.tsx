import Link from 'next/link';

export default function page() {
	return (
		<>
			<h1>Welcome</h1>
			<Link href={'/tasks/home'}>Create Your Tasks!</Link>
		</>
	);
}
