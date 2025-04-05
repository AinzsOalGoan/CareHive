import { useContext, useRef, useState } from "react";
import { ThemeContext } from "./ThemeProvider";


const RippleThemeToggle = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);
	const rippleRef = useRef(null);
	const [rippleStyle, setRippleStyle] = useState({});

	const handleClick = (e) => {
		const x = e.clientX;
		const y = e.clientY;
		const size = Math.max(window.innerWidth, window.innerHeight) * 2;

		setRippleStyle({
			left: x - size / 2 + "px",
			top: y - size / 2 + "px",
			width: size + "px",
			height: size + "px",
		});

		rippleRef.current?.classList.remove("animate-ripple");
		void rippleRef.current?.offsetWidth; // force reflow
		rippleRef.current?.classList.add("animate-ripple");

		setTimeout(() => {
			toggleTheme();
		}, 300); // theme switches after ripple starts
	};

	return (
		<>
			<button
				onClick={handleClick}
				className="p-2 rounded-xl text-gray-800 dark:text-white relative overflow-hidden z-10 w-10 h-10 flex items-center justify-center"
				aria-label="Toggle Theme">
				<span className="relative w-5 h-5">
					<span
						className={`absolute inset-0 transition-opacity duration-300 ${
							theme === "light" ? "opacity-100" : "opacity-0"
						}`}>
						🌙
					</span>
					<span
						className={`absolute inset-0 transition-opacity duration-300 ${
							theme === "dark" ? "opacity-100" : "opacity-0"
						}`}>
						☀️
					</span>
				</span>
			</button>

			<div
				ref={rippleRef}
				style={rippleStyle}
				className="fixed z-50 bg-gray-300 dark:bg-gray-700 pointer-events-none rounded-full scale-0 opacity-40"
			/>
		</>
	);
};

export default RippleThemeToggle;
