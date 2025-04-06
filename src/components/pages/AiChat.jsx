import { useState } from "react";
import ChatInput from "../ChatInput";
import ChatWindow from "../ChatWindow";
import conf from "../../conf/conf";
import axios from "axios";

const API_BASE = conf.geminiApiKey;

export const summarizeBlog = async (content) => {
	const res = await axios.post(
		`$https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_BASE}/summarize`,
		{ content }
	);
	return res.data;
};

export const chatWithAI = async (message) => {
	const res = await axios.post(`${API_BASE}/chat`, { message });
	return res.data;
};

export default function ChatPage() {
	const [messages, setMessages] = useState([]);

	const handleSend = async (message) => {
		const userMessage = { text: message, isUser: true };
		setMessages((prev) => [...prev, userMessage]);

		const res = await chatWithAI(message);
		const aiMessage = { text: res.response, isUser: false };
		setMessages((prev) => [...prev, aiMessage]);
	};

	return (
		<div className="max-w-6xl mx-auto p-6 flex flex-col h-screen bg-gray-900 text-white mt-3 mb-3 rounded-3xl">
			<h1 className="text-2xl font-bold mb-4">Chat with AI</h1>
			<ChatWindow messages={messages} />
			<ChatInput onSend={handleSend} />
		</div>
	);
}
