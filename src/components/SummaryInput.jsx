import { useState } from "react";

export default function SummaryInput({ onSummarize }) {
	const [content, setContent] = useState("");

	return (
		<div className="p-4">
			<textarea
				className="w-full p-2 rounded-lg border bg-gray-900 text-white"
				placeholder="Paste blog content here..."
				value={content}
				onChange={(e) => setContent(e.target.value)}
				rows={6}
			/>
			<button
				className="mt-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white"
				onClick={() => onSummarize(content)}>
				Summarize
			</button>
		</div>
	);
}
