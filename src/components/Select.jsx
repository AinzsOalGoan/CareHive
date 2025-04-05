import React, { useId, forwardRef } from "react";

const Select = forwardRef(
	({ options, label, className = "", ...props }, ref) => {
		const id = useId();

		return (
			<div className="w-full">
				{/* Label */}
				{label && (
					<label htmlFor={id} className="block mb-1 text-gray-700">
						{label}
					</label>
				)}

				{/* Select Dropdown */}
				<select
					{...props}
					ref={ref}
					id={id}
					className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
					aria-label={label || "Select an option"}>
					{/* Default Placeholder */}
					<option value="" disabled>
						Select an option
					</option>

					{/* Map Over Options */}
					{options?.map((option, index) =>
						typeof option === "string" ? (
							<option key={index} value={option}>
								{option}
							</option>
						) : (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						)
					)}
				</select>
			</div>
		);
	}
);

export default Select;
