import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, images }) => {
	const imageUrl = images
		? appwriteService.getFilePreview(images)
		: "/placeholder.jpg"; // Fallback image

	return (
		<Link to={`/post/${$id}`}>
			<div className="w-full bg-gray-100 rounded-xl p-4 hover:shadow-lg transition-shadow">
				{/* Image Container */}
				<div className="w-full flex justify-center mb-4">
					<img
						src={imageUrl}
						alt={title || "Post image"}
						className="rounded-xl object-cover h-48 w-full"
					/>
				</div>

				{/* Title */}
				<h2 className="text-xl font-bold truncate">
					{title || "Untitled Post"}
				</h2>
			</div>
		</Link>
	);
};

export default PostCard;
