import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PostCard = ({ $id, title, content, images }) => {
	const imageUrl = images
		? appwriteService.getFilePreview(images)
		: "/placeholder.jpg";

	// Strip HTML tags and truncate to 20 words
	const parseAndTruncateContent = (html, limit = 20) => {
		if (typeof html !== "string") return "";

		// Create a temporary DOM element to strip tags
		const tempDiv = document.createElement("div");
		tempDiv.innerHTML = html;
		const text = tempDiv.textContent || tempDiv.innerText || "";

		const words = text.trim().split(/\s+/);
		return words.length > limit
			? words.slice(0, limit).join(" ") + "..."
			: text;
	};

	return (
		<Link to={`/post/${$id}`}>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className="w-full bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
				{/* Image */}
				<div className="h-48 w-full overflow-hidden">
					<img
						src="http://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
						alt={title || "Post image"}
						className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
						loading="lazy"
					/>
				</div>

				{/* Title & Content */}
				<div className="p-4">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate mb-1">
						{title}
					</h2>
					<p className="text-sm text-gray-600 dark:text-gray-300">
						{parseAndTruncateContent(content)}
					</p>
				</div>
			</motion.div>
		</Link>
	);
};

export default PostCard;
