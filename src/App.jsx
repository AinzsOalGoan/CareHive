import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import authService from "./appwrite/auth";
import "./App.css";

function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await authService.getcurrentUser();
				if (userData) {
					dispatch(login(userData));
				} else {
					dispatch(logout());
				}
			} catch (error) {
				console.error("Error fetching user:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchUser();
	}, [dispatch]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-400">
				<p className="text-lg font-semibold text-white">Loading...</p>
			</div>
		);
	}

	return (
		<ThemeProvider>
			<div className="min-h-screen flex flex-wrap content-between bg-gray-400">
				<div className="w-full block">
					<Header />
					<main>
						<Outlet />
					</main>
					<Footer />
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
