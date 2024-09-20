import hostRequest from "hostrequest";
export default function initialize(uuid: string) {
	let move_data = {
		location: "",
	};
	if (
		document.querySelectorAll(
			".com-feature-area-FeatureListSection__title"
		)[0] === undefined
	) {
		return;
	}
	if (document.getElementById("text") !== undefined) {
		return;
	}

	let status = document.createElement("div");

	status.id = "status";
	status.style.color = "#fff";
	status.style.fontSize = "20px";
	status.style.userSelect = "none";

	let text = document.createElement("div");
	text.id = "text";
	status.append(text);

	let hostbtn = document.createElement("div");
	hostbtn.id = "hostbtn";
	hostbtn.innerText = "Hostになる";
	hostbtn.style.marginTop = "5px";
	hostbtn.style.cursor = "pointer";
	hostbtn.style.padding = "10px";
	hostbtn.style.fontSize = "15px";
	hostbtn.style.textAlign = "center";
	hostbtn.style.backgroundColor = "#202020";
	hostbtn.addEventListener("click", function (e) {
		hostRequest(uuid);
	});
	status.append(hostbtn);

	let movebtn = document.createElement("div");
	movebtn.id = "movebtn";
	movebtn.style.display = "none";
	movebtn.style.marginTop = "5px";
	movebtn.style.cursor = "pointer";
	movebtn.style.padding = "10px";
	movebtn.style.fontSize = "15px";
	movebtn.style.textAlign = "center";
	movebtn.style.backgroundColor = "#202020";
	movebtn.addEventListener("click", function (e) {
		movebtn.innerText = "移動許可済";
		location.href = move_data["location"];
	});
	status.append(movebtn);

	let move_label = document.createElement("p");
	move_label.setAttribute("id", "move_label");
	move_label.innerText = "Hostは別の動画を視聴しています。\n移動する。";
	movebtn.append(move_label);
	let move_title = document.createElement("p");
	move_title.setAttribute("id", "move_title");
	move_title.style.fontSize = "10px";
	movebtn.append(move_title);

	let clickButton = document.createElement("input");
	clickButton.setAttribute("type", "checkbox");
	clickButton.setAttribute("id", "clickButton");
	clickButton.style.display = "none";
	status.append(clickButton);

	let buttonLabel = document.createElement("label");
	buttonLabel.setAttribute("for", "clickButton");
	buttonLabel.setAttribute("id", "buttonLabel");
	buttonLabel.style.marginTop = "5px";
	buttonLabel.style.padding = "10px";
	buttonLabel.style.fontSize = "15px";
	buttonLabel.style.textAlign = "center";
	buttonLabel.style.backgroundColor = "#202020";
	buttonLabel.style.display = "block";
	status.append(buttonLabel);

	const clickLocal = localStorage["clickLocal"];
	if (clickLocal && Number(clickLocal) == 1) {
		clickButton.checked = true;
	}

	if (clickButton.checked == true) {
		buttonLabel.innerText = "スキップをキャンセルします";
	} else {
		buttonLabel.innerText = "次の動画へスキップします(デフォルト)";
	}

	clickButton.addEventListener("change", function (e) {
		const buttonLabel = document.getElementById("buttonLabel");
		if (buttonLabel) {
			if (this.checked == true) {
				buttonLabel.innerText = "スキップをキャンセルします";
				localStorage["clickLocal"] = 1;
			} else {
				buttonLabel.innerText = "次の動画へスキップします(デフォルト)";
				localStorage["clickLocal"] = 0;
			}
			console.log(localStorage.getItem("clickLocal"));
		}
	});

	let elem = document.querySelectorAll(
		".com-vod-VODRecommendedContentsContainerView__player"
	)[0];
	elem.addEventListener("mousedown", function (e) {
		hostRequest(uuid);
	});

	const elem_parent = document.querySelectorAll(
		".com-feature-area-FeatureListSection__title"
	)[0].parentElement;
	if (elem_parent) {
		elem = elem_parent.querySelectorAll("li")[0];
		elem.addEventListener("mousedown", function (e) {
			hostRequest(uuid);
		});
		elem_parent.prepend(status);
	}
}
