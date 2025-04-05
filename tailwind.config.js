// tailwind.config.js
module.exports = {
	darkMode: "class",
	theme: {
		extend: {
			animation: {
				ripple: "rippleEffect 0.6s ease-out forwards",
			},
			keyframes: {
				rippleEffect: {
					"0%": { transform: "scale(0)", opacity: "0.4" },
					"100%": { transform: "scale(1)", opacity: "0" },
				},
			},
		},
	},
	plugins: [],
};
