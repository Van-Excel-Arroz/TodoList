'use client';

import { authenticateUserAction } from '@/actions/user-action';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface LoginFormData {
	email: string;
	password: string;
}

export default function LoginPage() {
	const { register, handleSubmit, reset } = useForm<LoginFormData>();
	const router = useRouter();

	const onSubmit = async (data: LoginFormData) => {
		if (!data.email?.trim() || !data.password?.trim()) return;
		const response = await authenticateUserAction(data.email, data.password);

		if (response.success) {
			router.push('/tasks');
			toast.success(response.message);
		} else {
			toast.error(response.message);
		}
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
						autoComplete="off"
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
