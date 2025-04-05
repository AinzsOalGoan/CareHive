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
			<div className="min-h-screen flex items-center justify-center bg-slate-700">
				<div className="flex flex-col items-center space-y-4">
					<div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
					<p className="text-white text-lg">Please wait...</p>
				</div>
			</div>
		);
	}

	return (
		<ThemeProvider>
			<div className="min-h-screen flex flex-wrap content-between bg-slate-700">
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
