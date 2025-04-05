import React, { useState, useEffect } from "react";
import appwriteService from "../../appwrite/config";
import authService from "../../appwrite/auth";
import Container from "../container/Container";
import PostCard from "../../components/PostCard";

function Home() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = await authService.getcurrentUser();
				if (user) {
					setIsLoggedIn(true);
					const postsResponse = await appwriteService.getPosts();
					if (postsResponse) {
						setPosts(postsResponse.documents);
					}
				} else {
					setIsLoggedIn(false);
				}
			} catch (error) {
				console.error("Error fetching posts or user", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// ✅ Show loading screen always first
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

	// ✅ After loading, check login status
	if (!isLoggedIn) {
		return (
			<div className="w-full py-12 bg-gray-800 min-h-screen flex justify-center items-center transition-colors duration-300">
				<Container>
					<div className="text-center">
						<h1 className="text-3xl font-semibold text-white hover:text-gray-300 transition-colors duration-300">
							Login to read posts
						</h1>
					</div>
				</Container>
			</div>
		);
	}

	// ✅ If logged in, show posts
	return (
		<div className="w-full py-12 bg-gray-800 min-h-screen transition-colors duration-300">
			<Container>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{posts.map((post) => (
						<PostCard key={post.$id} {...post} />
					))}
				</div>
			</Container>
		</div>
	);
}

export default Home;
