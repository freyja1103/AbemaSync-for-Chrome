chrome.storage.local.get(["indexUrl"], function (data) {
	if (data.indexUrl == undefined) {
		return;
	}
	document.getElementById("indexUrl").value = data.indexUrl;
});

document.getElementById("indexUrl").addEventListener("input", function (e) {
	chrome.storage.local.set({
		indexUrl: document.getElementById("indexUrl").value,
	});
});
