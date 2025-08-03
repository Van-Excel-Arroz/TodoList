import Link from 'next/link';

export default function RegisterPage() {
	return (
		<div className="h-[100vh] flex flex-col items-center justify-center">
			<div className="flex flex-col gap-8 w-[300px]">
				<p className="text-2xl font-bold text-center">Register</p>
				<div className="flex flex-col gap-4">
					<p className="text-sm font-medium">Email</p>
					<input type="email" placeholder="example@gmail.com" className="border border-gray-300 rounded-md p-2" />
					<p className="text-sm font-medium">Password</p>
					<input type="password" placeholder="Password" className="border border-gray-300 rounded-md p-2" />
					<p className="text-sm font-medium">Confirm Password</p>
					<input type="password" placeholder="Confirm Password" className="border border-gray-300 rounded-md p-2" />
				</div>
				<button className="bg-black text-white rounded-md p-2">Register</button>
				<div className="text-sm text-center flex flex-row items-center justify-center gap-2">
					<p>Already have an account?</p>
					<Link className="text-blue-500" href="/login">
						Login
					</Link>
				</div>
			</div>
		</div>
	);
}
