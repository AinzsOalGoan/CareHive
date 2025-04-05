import React, { useState, useEffect } from "react";
import appwriteService from "../../appwrite/config";
import Container from "../container/Container";
import PostCard from "../../components/PostCard";

function AllPosts() {
	const [allPosts, setAllPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const posts = await appwriteService.getPosts();
				if (posts) {
					setAllPosts(posts.documents);
				}
			} catch (err) {
				console.error("Error fetching posts:", err);
				setError("Failed to load posts. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	return (
		<div className="w-full py-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
			<Container>
				{loading ? (
					<div className="flex justify-center items-center min-h-[50vh]">
						<p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
							Loading posts...
						</p>
					</div>
				) : error ? (
					<div className="flex justify-center items-center min-h-[50vh]">
						<p className="text-lg font-semibold text-red-500">
							{error}
						</p>
					</div>
				) : allPosts.length === 0 ? (
					<div className="flex justify-center items-center min-h-[50vh]">
						<p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
							No posts available. Be the first to add one!
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{allPosts.map((post) => (
							<PostCard key={post.$id} {...post} />
						))}
					</div>
				)}
			</Container>
		</div>
	);
}

export default AllPosts;
