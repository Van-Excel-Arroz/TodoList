'use client';

import { createUserAction } from '@/actions/user-action';
import Button from '@/components/ui-shared/Button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface RegisterFormData {
	username: string;
	email: string;
	password: string;
}

export default function RegisterPage() {
	const { register, handleSubmit, reset } = useForm<RegisterFormData>();

	const onSubmit = async (data: RegisterFormData) => {
		if (!data.username?.trim() || !data.email?.trim() || !data.password?.trim()) return;

		console.log(data);
		const response = await createUserAction(data.email, data.username, data.password);

		if (response.data && response.success) {
			toast.success(response.message);
		} else {
			toast.error(response.message);
		}

		reset();
	};

	return (
		<div className="h-[100vh] flex flex-col items-center justify-center">
			<div className="flex flex-col gap-8 w-[300px]">
				<p className="text-2xl font-bold text-center">Register</p>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
					<p className="text-sm font-medium">Username</p>
					<input
						{...register('username', { required: true, maxLength: 200 })}
						type="text"
						placeholder="Username"
						className="border border-gray-300 rounded-md p-2"
						autoComplete="off"
					/>
					<p className="text-sm font-medium pt-4">Email</p>
					<input
						{...register('email', { required: true, maxLength: 200 })}
						type="email"
						placeholder="example@gmail.com"
						className="border border-gray-300 rounded-md p-2"
						autoComplete="off"
					/>
					<p className="text-sm font-medium pt-4">Password</p>
					<input
						{...register('password', { required: true, maxLength: 200 })}
						type="password"
						placeholder="Password"
						className="border border-gray-300 rounded-md p-2"
					/>

					<Button type="submit" ariaLabel="Register" darkMode={true} className="py-2 mt-6">
						Register
					</Button>
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
