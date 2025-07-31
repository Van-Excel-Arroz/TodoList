export default function LoginPage() {
	return (
		<div className="h-[100vh] flex flex-col items-center justify-center">
			<p>Login</p>
			<p>Username</p>
			<input type="text" placeholder="Username" />
			<p>Password</p>
			<input type="password" placeholder="Password" />
		</div>
	);
}
