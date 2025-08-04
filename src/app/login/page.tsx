'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';

interface LoginFormData {
	email: string;
	password: string;
}

export default function LoginPage() {
	const { register, handleSubmit, reset } = useForm<LoginFormData>();

	const onSubmit = (data: LoginFormData) => {
		console.log(data);
		reset();
	};

	return (
		<div className="h-[100vh] flex flex-col items-center justify-center">
			<div className="flex flex-col gap-8 w-[300px]">
				<p className="text-2xl font-bold text-center">Login</p>
				<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
					<p className="text-sm font-medium">Email</p>
					<input
						{...register('email', { required: true, maxLength: 200 })}
						type="email"
						placeholder="example@gmail.com"
						className="border border-gray-300 rounded-md p-2"
					/>

					<p className="text-sm font-medium">Password</p>
					<input
						{...register('password', { required: true, maxLength: 200 })}
						type="password"
						placeholder="Password"
						className="border border-gray-300 rounded-md p-2"
					/>

					<button type="submit" className="bg-black text-white rounded-md p-2">
						Login
					</button>
				</form>
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
