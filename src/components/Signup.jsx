import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Signup() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const [error, setError] = useState("");

	const create = async (data) => {
		setError("");
		try {
			const newUser = await authService.createAccount(data);
			if (newUser) {
				const currentUser = await authService.getcurrentUser();
				if (currentUser) {
					dispatch(login(currentUser));
					navigate("/");
				}
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
					Sign up to create an account
				</h2>
				<p className="mt-2 text-center text-sm text-slate-300">
					Already have an account?&nbsp;
					<Link
						to="/login"
						className="text-blue-400 hover:text-blue-300 transition underline font-medium">
						Sign In
					</Link>
				</p>

				{/* Error */}
				{error && (
					<p className="text-red-500 text-sm text-center mt-4">
						{error}
					</p>
				)}

				{/* Form */}
				<form
					onSubmit={handleSubmit(create)}
					className="mt-8 space-y-6">
					<div className="space-y-5">
						{/* Name */}
						<Input
							label="Full Name"
							placeholder="John Doe"
							{...register("name", {
								required: "Full name is required",
							})}
						/>
						{errors.name && (
							<p className="text-sm text-red-400">
								{errors.name.message}
							</p>
						)}

						{/* Email */}
						<Input
							label="Email"
							placeholder="you@example.com"
							type="email"
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
									message: "Invalid email format",
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
							placeholder="Minimum 6 characters"
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

						{/* Confirm Password */}
						<Input
							label="Confirm Password"
							type="password"
							placeholder="Re-enter password"
							{...register("confirmPassword", {
								required: "Please confirm your password",
								validate: (value) =>
									value === watch("password") ||
									"Passwords do not match",
							})}
						/>
						{errors.confirmPassword && (
							<p className="text-sm text-red-400">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>

					{/* Submit Button */}
					<Button
						type="submit"
						className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50">
						Create Account
					</Button>
				</form>
			</div>
		</div>
	);
}

export default Signup;
