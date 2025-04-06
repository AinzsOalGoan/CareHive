import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutHandler = async () => {
		try {
			await authService.logout();
			dispatch(logout());
			navigate("/login"); // Redirect to login page after logout
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<button
			onClick={logoutHandler}
			className="px-5 py-2 rounded-xl font-medium text-sm 
                       bg-gradient-to-r from-red-500 to-red-700 
                       text-white hover:from-red-600 hover:to-red-800 
                       dark:from-red-600 dark:to-red-800 
                       dark:hover:from-red-700 dark:hover:to-red-900 
                       transition-all duration-300 shadow-md hover:shadow-lg">
			Logout
		</button>
	);
};

export default LogoutBtn;
