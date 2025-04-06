import ChatMessage from "./ChatMessage";

export default function ChatWindow({ messages }) {
	return (
		<div className="p-4 overflow-y-auto h-[70vh] space-y-2 bg-slate-600 rounded-2xl mb-2">
			{messages.map((msg, idx) => (
				<div
					key={idx}
					className={`flex ${
						msg.isUser ? "justify-end" : "justify-start"
					}`}>
					<ChatMessage message={msg.text} isUser={msg.isUser} />
				</div>
			))}
		</div>
	);
}
