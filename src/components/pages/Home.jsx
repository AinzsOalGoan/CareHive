import React, { useState, useEffect } from "react";
import appwriteService from "../../appwrite/config";
import Container from "../container/Container";
import PostCard from "../../components/PostCard";

function Home() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		appwriteService.getPosts().then((posts) => {
			if (posts) {
				setPosts(posts.documents);
			}
		});
	}, []);

	if (posts.length === 0) {
		return (
			<div className="w-full py-12 bg-gray-100 dark:bg-gray-900 min-h-screen flex justify-center items-center transition-colors duration-300">
				<Container>
					<div className="text-center">
						<h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-300">
							Login to read posts
						</h1>
					</div>
				</Container>
			</div>
		);
	}

	return (
		<div className="w-full py-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
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
