import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm();
	const [error, setError] = useState("");

	const login = async (data) => {
		setError("");

		try {
			const session = await authService.login(data);
			if (session) {
				const userData = await authService.getcurrentUser();
				if (userData) {
					dispatch(authLogin(userData));
				}
				navigate("/");
			}
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 px-4">
			<div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl p-8 sm:p-10">
				{/* Logo */}
				<div className="flex justify-center mb-6">
					<span className="inline-block w-24">
						<Logo width="100%" />
					</span>
				</div>

				{/* Title */}
				<h2 className="text-center text-3xl font-extrabold text-white">
					Sign in to your account
				</h2>
				<p className="mt-2 text-center text-sm text-slate-300">
					Don&apos;t have an account?&nbsp;
					<Link
						to="/signup"
						className="text-blue-400 hover:text-blue-300 transition underline font-medium">
						Sign Up
					</Link>
				</p>

				{/* Error */}
				{error && (
					<p className="text-red-500 text-sm text-center mt-4">
						{error}
					</p>
				)}

				{/* Form */}
				<form onSubmit={handleSubmit(login)} className="mt-8 space-y-6">
					<div className="space-y-5">
						{/* Email */}
						<Input
							label="Email"
							placeholder="e.g. example@domain.com"
							type="email"
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
									message: "Enter a valid email address",
								},
							})}
						/>
						{errors.email && (
							<p className="text-sm text-red-400">
								{errors.email.message}
							</p>
						)}

						{/* Password */}
						<Input
							label="Password"
							placeholder="Your secure password"
							type="password"
							{...register("password", {
								required: "Password is required",
								minLength: {
									value: 6,
									message:
										"Password must be at least 6 characters",
								},
							})}
						/>
						{errors.password && (
							<p className="text-sm text-red-400">
								{errors.password.message}
							</p>
						)}
					</div>

					{/* Submit Button */}
					<Button
						type="submit"
						className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
						disabled={isSubmitting}>
						{isSubmitting ? "Signing in..." : "Sign in"}
					</Button>
				</form>
			</div>
		</div>
	);
}

export default Login;
