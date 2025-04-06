import { useState } from "react";

export default function ChatInput({ onSend }) {
	const [message, setMessage] = useState("");

	return (
		<div className="flex items-center p-4 border-t border-gray-700">
			<input
				className="flex-1 p-2 rounded bg-gray-800 text-white"
				placeholder="Type your message..."
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				onKeyDown={(e) => e.key === "Enter" && onSend(message)}
			/>
			<button
				className="ml-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
				onClick={() => onSend(message)}>
				Send
			</button>
		</div>
	);
}
