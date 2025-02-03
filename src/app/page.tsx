import Link from 'next/link';

export default function page() {
	return (
		<>
			<div className="container mx-auto w-5/6 h-screen flex flex-col gap-10 justify-center items-center">
				<p className="w-4/6 text-center text-5xl lg:text-6xl xl:text-8xl font-bold mb-5 align-top">
					Organize{' '}
					<span
						style={{
							background: 'linear-gradient(90deg, #D16BA5, #86A8E7, #feb47b)',
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
				<p className="w-5/6 text-center sm:text-base md:text-lg lg:text-xl xl:text-2xl text-slate-600">
					Effortlessly organize tasks, add categories with a simple #tag, and customize your workflow to fit your life.
					Stay productive, your way.
				</p>
				<Link
					href={'/tasks/'}
					className="block bg-black text-white text-center text-base md:text-lg lg:text-xl xl:text-3xl px-10 py-4 mt-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-opacity-80 active:bg-opacity-60"
				>
					Get Started for Free
				</Link>
			</div>
		</>
	);
}
