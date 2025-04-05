import React, { useState, useEffect } from "react";
import appwriteService from "../../appwrite/config";
import Container from "../container/Container";
import PostCard from "../../components/PostCard";
import PostCardSkeleton from "../Loading";

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
		<div className="w-full py-12 bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-800 dark:to-slate-900 min-h-screen transition-colors duration-300">
			<Container>
				{/* <h1 className="text-3xl font-extrabold text-center mb-10 text-gray-900 dark:text-white">
					All Posts
				</h1> */}

				{loading ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{Array.from({ length: 8 }).map((_, i) => (
							<PostCardSkeleton key={i} />
						))}
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
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
