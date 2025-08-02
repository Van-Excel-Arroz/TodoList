export default function LoginPage() {
	return (
		<div className="h-[100vh] flex flex-col items-center justify-center">
			<div className="flex flex-col gap-6">
				<p className="text-2xl font-bold text-center">Login</p>
				<div className="flex flex-col gap-2">
					<p className="text-sm font-medium">Username</p>
					<input type="text" placeholder="Username" />
					<p className="text-sm font-medium">Password</p>
					<input type="password" placeholder="Password" />
				</div>
			</div>
		</div>
	);
}
