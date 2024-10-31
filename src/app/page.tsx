import Link from 'next/link';

export default function page() {
	return (
		<>
			<div className="container mx-auto h-screen flex flex-col justify-center items-center">
				<p className="text-9xl mb-5 align-top">Welcome</p>
				<Link
					href={'/tasks/home'}
					className="block bg-black text-white text-center text-3xl px-14 py-7 mt-5 rounded-2xl"
				>
					Create Your Tasks!
				</Link>
			</div>
		</>
	);
}
