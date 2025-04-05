import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../../appwrite/config";
import Container from "../container/Container";
import Button from "../Button";
import parse from "html-react-parser";
import conf from "../../conf/conf";

export default function Post() {
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const { slug } = useParams();
	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);

	const isAuthor = post && userData ? post.userid === userData.$id : false;

	useEffect(() => {
		const fetchPost = async () => {
			try {
				console.log("Fetching post with slug:", slug);
				if (!slug) return navigate("/");

				const postData = await appwriteService.getPost(slug);
				console.log("Post data received:", postData);

				if (postData) {
					setPost(postData);
				} else {
					setError("Post not found.");
				}
			} catch (err) {
				console.error("Error fetching post:", err);
				setError("Error fetching post.");
			} finally {
				setLoading(false);
			}
		};

		fetchPost();
	}, [slug, navigate]);

	const deletePost = async () => {
		try {
			if (!post) return;

			console.log("Deleting post with ID:", post.$id);
			const status = await appwriteService.deletePost(post.$id);
			console.log("Delete status:", status);

			if (status) {
				console.log("Deleting associated image:", post.images);
				await appwriteService.deleteFile(post.images);
				navigate("/");
			}
		} catch (error) {
			console.error("Error deleting post:", error);
		}
	};

	const getFilePreview = (fileId) => {
		if (!fileId) return "/default-placeholder.jpg"; // Show default placeholder
		const url = `http://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg`;
		console.log("Generated image preview URL:", url);
		return url;
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-all duration-300">
				<p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
					Loading post...
				</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-all duration-300">
				<p className="text-lg font-semibold text-red-500">{error}</p>
			</div>
		);
	}

	return (
		<div className="py-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-all duration-300">
			<Container>
				<div className="w-full flex justify-center mb-4 relative border rounded-xl p-2 bg-white dark:bg-gray-800 transition-all duration-300">
					<img
						src={getFilePreview(post.images)}
						alt={post.title}
						className="rounded-xl max-h-96 object-cover"
					/>

					{isAuthor && (
						<div className="absolute right-6 top-6 flex gap-2">
							<Link to={`/edit-post/${post.$id}`}>
								<Button bgColor="bg-green-500">Edit</Button>
							</Link>
							<Button bgColor="bg-red-500" onClick={deletePost}>
								Delete
							</Button>
						</div>
					)}
				</div>
				<div className="w-full mb-6">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
						{post.title}
					</h1>
				</div>
				<div className="browser-css text-gray-800 dark:text-gray-200">
					{parse(post.content)}
				</div>
			</Container>
		</div>
	);
}
