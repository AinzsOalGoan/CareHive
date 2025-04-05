import React from "react";
import Container from "../container/Container";
import PostForm from "../post-form/PostForm";

function AddPost() {
	return (
		<div className="min-h-screen py-8 bg-gray-100 dark:bg-gray-900 flex justify-center transition-all duration-300">
			<Container>
				<PostForm />
			</Container>
		</div>
	);
}

export default AddPost;
