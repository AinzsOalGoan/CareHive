import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeToggle from "../ToggleButton";

const Header = () => {
	const authStatus = useSelector((state) => state.auth.status);

	const navItems = [
		{ name: "Home", slug: "/", active: true },
		{ name: "Login", slug: "/login", active: !authStatus },
		{ name: "Signup", slug: "/signup", active: !authStatus },
		{ name: "All Posts", slug: "/all-posts", active: authStatus },
		{ name: "Add Post", slug: "/add-post", active: authStatus },
	];

	return (
		<header className="py-3 shadow bg-gray-200 dark:bg-gray-900 transition-colors duration-300">
			<Container>
				<nav className="flex items-center justify-center">
					{/* Logo */}
					<div className="mr-4">
						<Link to="/">
							<Logo width="70px" />
						</Link>
					</div>

					{/* Navigation Items */}
					<ul className="flex ml-auto justify-center space-x-4">
						{navItems.map(
							(item) =>
								item.active && (
									<li key={item.name}>
										<NavLink
											to={item.slug}
											className={({ isActive }) =>
												` px-6 py-2 rounded-xl transition duration-200 
												bg-transparent hover:bg-blue-100/50 dark:hover:bg-blue-700/10 
												${isActive ? "text-blue-500" : "text-gray-800 dark:text-gray-200"}`
											}>
											{item.name}
										</NavLink>
									</li>
								)
						)}
						{authStatus && (
							<li>
								<LogoutBtn />
							</li>
						)}
					</ul>

					{/* Theme Toggle */}
					<div className="ml-4">
						<ThemeToggle />
					</div>
				</nav>
			</Container>
		</header>
	);
};

export default Header;
