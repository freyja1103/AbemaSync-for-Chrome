export default function hostRequest(uuid: string) {
	chrome.storage.local.get(["indexUrl"], async (data) => {
		const res = await fetch(data.indexUrl + "?set=true", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				uuid,
			}),
		});
		if (!res.ok) {
			throw new Error(`Request failed: ${res.status}`);
		}
		return;
	});
	return;
}
