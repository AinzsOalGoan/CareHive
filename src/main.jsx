import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import { AiChat, AuthLayout, Login, Signup } from "./components/index.js";

import AllPosts from "./components/pages/AllPosts.jsx"; // Corrected import
import AddPost from "./components/pages/AddPost";
import EditPost from "./components/pages/EditPost";
import Post from "./components/pages/Post";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: (
					<AuthLayout authentication={false}>
						<Login />
					</AuthLayout>
				),
			},
			{
				path: "/signup",
				element: (
					<AuthLayout authentication={false}>
						<Signup />
					</AuthLayout>
				),
			},
			{
				path: "/all-posts",
				element: (
					<AuthLayout authentication={true}>
						<AllPosts />
					</AuthLayout>
				),
			},
			{
				path: "/add-post",
				element: (
					<AuthLayout authentication={true}>
						<AddPost />
					</AuthLayout>
				),
			},
			{
				path: "/edit-post/:slug",
				element: (
					<AuthLayout authentication={true}>
						<EditPost />
					</AuthLayout>
				),
			},
			{
				path: "/post/:slug",
				element: (
				<AuthLayout authentication={true}>
					
				<Post />
				</AuthLayout>
				)
			},
			{
				path: "/aichat",
				element: (
					<AuthLayout authentication={true}>
						<AiChat />
					</AuthLayout>
				),
			},
		],
	},
]);

createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
