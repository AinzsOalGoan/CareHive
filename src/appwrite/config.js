import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
	client = new Client();
	databases;
	bucket;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);
		this.databases = new Databases(this.client);
		this.bucket = new Storage(this.client);
	}

	async createPost({ title, slug, content, images, status, userid, like, dislike, tags }) {
		try {
			// Ensure slug is always present
			if (!slug) {
				console.warn("Slug is missing, generating one...");
				slug = title
					? title
							.trim()
							.toLowerCase()
							.replace(/[^a-zA-Z0-9\s]/g, "")
							.replace(/\s+/g, "-")
					: `post-${Date.now()}`; // Fallback if title is also missing
			}

			// Debugging: Log final data before sending
			console.log("Creating post with data:", {
				title,
				slug,
				content,
				images,
				status,
				userid,
				like,
				dislike,
				tags,
			});

			return await this.databases.createDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{ title, slug, content, images, status, userid, like, dislike, tags }
			);
		} catch (error) {
			console.error("Appwrite service :: createPost :: error", error);
			return null; // Return null to indicate failure
		}
	}

	async updatePost(slug, { title, content, images, status }) {
		try {
			return await this.databases.updateDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{ title, content, images, status }
			);
		} catch (error) {
			console.error("Appwrite Service :: updatePost :: error", error);
			throw error;
		}
	}

	async deletePost(slug) {
		try {
			await this.databases.deleteDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);
			return true;
		} catch (error) {
			console.error("Appwrite Service :: deletePost :: error", error);
			return false;
		}
	}

	async getPost(slug) {
		try {
			return await this.databases.getDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);
		} catch (error) {
			console.error("Appwrite Service :: getPost :: error", error);
			return null;
		}
	}

	async getPosts(queries = [Query.equal("status", "active")]) {
		try {
			return await this.databases.listDocuments(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				queries
			);
		} catch (error) {
			console.error("Appwrite Service :: getPosts :: error", error);
			return null;
		}
	}

	// File uploading
	async uploadFile(file) {
		try {
			return await this.bucket.createFile(
				conf.appwriteBucketId,
				ID.unique(),
				file
			);
		} catch (error) {
			console.error("Appwrite Service :: uploadFile :: error", error);
			return false;
		}
	}

	async deleteFile(fileId) {
		try {
			await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
			return true;
		} catch (error) {
			console.error("Appwrite Service :: deleteFile :: error", error);
			return false;
		}
	}

	getFilePreview(fileId) {
		try {
			return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
		} catch (error) {
			console.error("Appwrite Service :: getFilePreview :: error", error);
			return null;
		}
	}
}

const service = new Service();
export default service;
