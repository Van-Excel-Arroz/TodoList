import Link from 'next/link';

export default function page() {
	return (
		<>
			<div className="container mx-auto w-5/6 h-screen flex flex-col justify-center items-center">
				<p className="text-7xl md:text-9xl mb-5 align-top">Welcome</p>
				<Link
					href={'/tasks/home'}
					className="block bg-black text-white text-center text-xl md:text-3xl px-7 py-4 mt-5 rounded-2xl"
				>
					Create Your Tasks!
				</Link>
			</div>
		</>
	);
}
