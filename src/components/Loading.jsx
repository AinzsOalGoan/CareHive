
import React from "react";

const PostCardSkeleton = () => {
	return (
		<div className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse">
			{/* Image Skeleton */}
			<div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-xl" />

			{/* Text Skeleton */}
			<div className="p-4 space-y-2">
				<div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded" />
				<div className="h-3 w-full bg-gray-300 dark:bg-gray-600 rounded" />
				<div className="h-3 w-5/6 bg-gray-300 dark:bg-gray-600 rounded" />
			</div>
		</div>
	);
};

export default PostCardSkeleton;
