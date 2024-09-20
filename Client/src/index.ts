import { v4 as uuidv4 } from "uuid";
import initialize from "initialize";
import hostRequest from "hostrequest";
const URLReg = /\d+-\d+_s\d_p\d+/;
const uuid = uuidv4();
interface SyncData {
	title: string;
	location: string;
	currentTime: number;
	paused: boolean;
	uuid: string;
}

let move_data;
const movebtn_func = (display: string, title: string) => {
	const moveBtn = document.getElementById("movebtn");
	const DestTitle = document.getElementById("move_title");
	if (moveBtn && DestTitle) {
		moveBtn.style.display = display;
		DestTitle.innerText = title;
	}
};

const syncVideoTiming = () => {
	const pathname = location.pathname;
	if (pathname === "/" || !URLReg.test(pathname)) return;
	initialize(uuid);
	let video = document.querySelectorAll<HTMLVideoElement>(
		".com-a-Video__video > video"
	)[0];

	chrome.storage.local.get(["indexUrl"], async (data) => {
		const res = await fetch(data.indexUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				uuid: uuid,
				location: location.href,
				title: document.title,
				paused: video.paused,
				currentTime: video.currentTime,
			} as SyncData),
		});
		if (!res.ok) {
			throw new Error(`Request failed: ${res.status}`);
		}
		const dict: SyncData = await res.json();
		if (location.href !== dict["location"]) {
			move_data = dict;
			movebtn_func("block", dict["title"]);
		} else {
			const lag = Math.abs(video.currentTime - dict["currentTime"]);
			// if network is offline, no sync
			if (!window.navigator.onLine && lag > 1.5) {
				video.currentTime = dict["currentTime"];
			}
			dict["paused"] ? video.pause() : video.play();
			movebtn_func("none", "");
		}

		const hostBtn = document.getElementById("hostbtn");
		const syncInfo = document.getElementById("text");
		if (hostBtn && syncInfo) {
			hostBtn.innerText =
				dict["uuid"] === uuid ? "Hostになりました" : "Hostになる";
			syncInfo.innerText =
				"Host_Time: " +
				dict["currentTime"] +
				"\n" +
				"Host_UDID: " +
				dict["uuid"] +
				"\n" +
				"Client_Time: " +
				video.currentTime +
				"\n" +
				"Client_UDID: " +
				uuid;
		}
	});

	if ((document.getElementById("clickButton") as HTMLInputElement).checked) {
		let clickCancel = document.querySelectorAll<HTMLButtonElement>(
			"button.com-vod-VODNextProgramInfo__cancel-button"
		)[0];
		clickCancel.click();
	}
	let currentEpisode = Number(location.pathname.slice(-1));
	let episodeList = document.querySelectorAll(
		".com-content-list-ContentListEpisodeItem__overview"
	);
	let nextEpisode = episodeList[currentEpisode]
		.querySelector("a")!
		.getAttribute("href")!;
	video.addEventListener("ended", (event) => {
		location.href = "https://abema.tv" + nextEpisode;
	});
};
/*
再生中　→　通信しない
再生停止　→　通信する
オフラインになった　→　オンになるまで再生　→　オンなら通信
*/
const main = async () => {
	hostRequest(uuid);
	syncVideoTiming();
};

main();
