import React, { useState, useEffect } from "react";
import Container from "../container/Container";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import PostForm from "../post-form/PostForm";

function EditPost() {
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const { slug } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPost = async () => {
			if (!slug) {
				navigate("/");
				return;
			}
			try {
				const fetchedPost = await appwriteService.getPost(slug);
				if (fetchedPost) {
					setPost(fetchedPost);
				} else {
					setError("Post not found");
				}
			} catch (err) {
				setError("Error fetching post");
				console.error("Error:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchPost();
	}, [slug, navigate]);

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
				<PostForm post={post} />
			</Container>
		</div>
	);
}

export default EditPost;
