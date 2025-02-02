import Link from 'next/link';

export default function page() {
	return (
		<>
			<div className="container mx-auto w-5/6 h-screen flex flex-col gap-10 justify-center items-center">
				<p className="w-4/6 text-center text-7xl md:text-8xl font-bold mb-5 align-top">
					Organize{' '}
					<span
						style={{
							background: 'linear-gradient(90deg, #ff7e5f, #feb47b, #ff7e5f, #feb47b)',
							backgroundSize: '200% 200%',
							WebkitBackgroundClip: 'text',
							backgroundClip: 'text',
							color: 'transparent',
							animation: 'moveGradient 4s linear infinite',
						}}
					>
						Smarter
					</span>
					, Not Harder
				</p>
				<p className="w-5/6 text-center text-3xl text-slate-600">
					Effortlessly organize tasks, add categories with a simple #tag, and customize your workflow to fit your life.
					Stay productive, your way.
				</p>
				<Link
					href={'/tasks/'}
					className="block bg-black text-white text-center text-xl md:text-3xl px-7 py-4 mt-5 rounded-2xl"
				>
					Get Started for Free
				</Link>
			</div>
		</>
	);
}
