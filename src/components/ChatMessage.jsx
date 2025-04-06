export default function ChatMessage({ message, isUser }) {
	return (
		<div
			className={`p-2 my-2 rounded ${
				isUser ? "bg-blue-700 text-white" : "bg-gray-700 text-white"
			} max-w-xl`}>
			<p>{message}</p>
		</div>
	);
}
