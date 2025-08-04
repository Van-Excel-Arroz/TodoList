'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';

interface RegisterFormData {
	email: string;
	password: string;
	confirmPassword: string;
}

export default function RegisterPage() {
	const { register, handleSubmit, reset } = useForm<RegisterFormData>();

	const onSubmit = (data: RegisterFormData) => {
		console.log(data);
		reset;
	};

	return (
		<div className="h-[100vh] flex flex-col items-center justify-center">
			<div className="flex flex-col gap-8 w-[300px]">
				<p className="text-2xl font-bold text-center">Register</p>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
					<p className="text-sm font-medium">Confirm Password</p>
					<input
						{...register('confirmPassword', { required: true, maxLength: 200 })}
						type="password"
						placeholder="Confirm Password"
						className="border border-gray-300 rounded-md p-2"
					/>
					<button type="submit" className="bg-black text-white rounded-md p-2">
						Register
					</button>
				</form>
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
