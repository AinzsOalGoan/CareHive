import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



function PostForm({ post }) {
	const { register, handleSubmit, watch, setValue, control, getValues } =
		useForm({
			defaultValues: {
				title: "",
				slug: "",
				content: "",
				status: "active",
			},
		});

	const navigate = useNavigate();

	const userData = useSelector((state) => state.auth.userData);
	console.log("userData:", userData);

	const [previewImage, setPreviewImage] = useState(null);

	// ✅ Populate form fields when editing a post
	useEffect(() => {
		if (post) {
			console.log("Editing post:", post); // Debugging log
			setValue("title", post.title);
			setValue("slug", post.$id);
			setValue("content", post.content);
			setValue("status", post.status);

			if (post.images) {
				const imageUrl = appwriteService.getFilePreview(post.images);
				setPreviewImage(imageUrl);
			}
		}
		// Removed `setValue` from dependencies to prevent infinite loop
	}, [post]);

	// ✅ Handle image selection & preview
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setPreviewImage(imageUrl);
		}
	};

	// ✅ Cleanup image URL to prevent memory leaks
	useEffect(() => {
		return () => {
			if (previewImage) URL.revokeObjectURL(previewImage);
		};
	}, [previewImage]);

	// ✅ Slug transformation function
	const slugTransform = useCallback((value) => {
		if (!value || typeof value !== "string") return "";
		return value
			.trim()
			.toLowerCase()
			.replace(/[^a-zA-Z\d\s-]+/g, "") // Remove special chars except dashes
			.replace(/\s+/g, "-") // Convert spaces to dashes
			.replace(/-+/g, "-"); // Remove multiple dashes
	}, []);

	// ✅ Auto-generate slug when title changes
	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === "title") {
				const newSlug = slugTransform(value?.title || "");
				console.log("Generated Slug:", newSlug); // Debugging
				setValue("slug", newSlug, { shouldValidate: true });
			}
		});
		return () => subscription.unsubscribe();
	}, [watch, slugTransform, setValue]);

	// ✅ Handle form submission
	const submit = async (data) => {
		if (!data.slug) {
			data.slug = slugTransform(data.title);
			console.log("Slug was missing, generated:", data.slug);
		}

		console.log("Final Data before Submission:", data);

		let fileId = null;

		// Upload image if a new file is provided
		if (data.image?.[0]) {
			const file = await appwriteService.uploadFile(data.image[0]);
			if (file) {
				fileId = file.$id;
			}
		}

		// Prepare final post data
		const postData = {
			title: data.title,
			slug: data.slug,
			content: data.content,
			images: fileId || (post ? post.images : null),
			status: data.status,
			userid: userData.$id,
			like: "0",
			dislike: "0",
			tags : null,
		};

		console.log("Final Data Sent to Appwrite:", postData);

		if (!postData.slug) {
			console.error("Error: Slug is still missing!");
			return;
		}

		if (post) {
			// Delete old image if a new image is uploaded
			if (fileId && post.images) {
				await appwriteService.deleteFile(post.images);
			}

			// Update existing post
			const dbPost = await appwriteService.updatePost(post.$id, postData);
			if (dbPost) {
				navigate(`/post/${dbPost.$id}`);
			}
		} else {
			// Create new post
			const dbPost = await appwriteService.createPost(postData);
			if (dbPost) {
				navigate(`/post/${dbPost.$id}`);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
			<div className="w-2/3 px-2 text-white">
				{/* Title Input */}
				<Input
					label="Title :"
					placeholder="Title"
					className="mb-4"
					{...register("title", { required: "Title is required" })}
				/>
				{/* Slug Input */}
				<Input
					label="Slug :"
					placeholder="Slug"
					className="mb-4"
					{...register("slug", { required: "Slug is required" })}
					onInput={(e) => {
						setValue("slug", slugTransform(e.currentTarget.value), {
							shouldValidate: true,
						});
					}}
				/>
				{/* Content Editor */}
				<RTE
					label="Content :"
					name="content"
					control={control}
					defaultValue={getValues("content")}
				/>
			</div>
			<div className="w-1/3 px-2">
				{/* Image Upload */}
				<Input
					label="Featured Image :"
					type="file"
					className="mb-4"
					accept="image/png, image/jpg, image/jpeg"
					{...register("image", { required: !post })}
					onChange={handleImageChange}
				/>
				{/* Image Preview */}
				{previewImage && (
					<div className="w-full mb-4">
						<img
							src={previewImage}
							alt="Preview"
							className="rounded-lg max-h-40"
						/>
					</div>
				)}
				{/* Status Selector */}
				<Select
					options={["active", "inactive"]}
					label="Status"
					className="mb-4"
					{...register("status", { required: true })}
				/>
				{/* Submit Button */}
				<Button
					type="submit"
					bgColor={post ? "bg-green-500" : undefined}
					className="w-full">
					{post ? "Update" : "Submit"}
				</Button>
			</div>
		</form>
	);
}

export default PostForm;
