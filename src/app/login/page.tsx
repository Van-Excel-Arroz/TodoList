import Link from 'next/link';

export default function LoginPage() {
	return (
		<div className="h-[100vh] flex flex-col items-center justify-center">
			<div className="flex flex-col gap-8 w-[300px]">
				<p className="text-2xl font-bold text-center">Login</p>
				<div className="flex flex-col gap-4">
					<p className="text-sm font-medium">Username</p>
					<input type="text" placeholder="Username" className="border border-gray-300 rounded-md p-2" />
					<p className="text-sm font-medium">Password</p>
					<input type="password" placeholder="Password" className="border border-gray-300 rounded-md p-2" />
				</div>
				<button className="bg-black text-white rounded-md p-2">Login</button>
				<div className="text-sm text-center flex flex-row items-center justify-center gap-2">
					<p>Don&apos;t have an account?</p>
					<Link className="text-blue-500" href="/register">
						Register
					</Link>
				</div>
			</div>
		</div>
	);
}
