export default function SummaryOutput({ summary }) {
	return (
		<div className="p-4 mt-4 bg-gray-800 text-white rounded-lg">
			<h2 className="text-xl font-semibold mb-2">Summary</h2>
			<p>{summary}</p>
		</div>
	);
}
