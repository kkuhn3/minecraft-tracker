function tabUpdate(cat) {
	hideAllCategories();
	document.getElementById(cat).style.display = "block";
}

function hideAllCategories() {
	const cats = document.getElementsByClassName("category");
	for (let cat of cats) {
		cat.style.display = "none";
	}
}

function updateNodes() {
	const nodes = document.getElementsByClassName("node");
	for (let node of nodes) {
		let logic;
		if (locationLogic[node.id]) {
			logic = locationLogic[node.id]();
		}
		setColorClass(node, logic);
		
		let info = document.getElementById("info:"+node.id);
		const advancement = advancements[node.id];
		info.innerHTML = 
			"<span><b>" + advancement.name + "<b></span><br>" +
			"<span><I>" + advancement.description + "<I></span><br>" +
			"<br>";
		const color = logicToColor(logic);
		for (const [key, value] of Object.entries(getCriteria(node.id))) {
			info.innerHTML = info.innerHTML + '<span style="color: ' + color + ';">&nbsp;-&nbsp;' + key + "<span><br>";
		}
	}
	countChecks();
}

function setColorClass(node, logic) {
	node.classList.remove("logical", "possible", "excluded");
	if (logic) {
		node.classList.add(logic);
	}
}

function logicToColor(logic) {
	if (logic === "logical") {
		return "#80ff80";
	}
	if (logic === "possible") {
		return "#8080ff";
	}
	if (logic === "excluded") {
		return "#808080";
	}
	return "#ff8080";
}

function addOnClicks() {
	const nodes = document.getElementsByClassName("node");
	for (let node of nodes) {
		node.onclick = function() {
			node.classList.toggle("checked");
			updateNodes();
		};
	}

	const unlocks = document.getElementsByClassName("unlock");
	for (let unlock of unlocks) {
		let max = 1;
		if (unlock.id === "Progressive Resource Crafting") {
			max = 2;
		}
		else if (unlock.id === "Progressive Tools") {
			max = 3;
		}
		else if (unlock.id === "Progressive Weapons") {
			max = 3;
		}
		else if (unlock.id === "Progressive Armor") {
			max = 2;
		}
		else if (unlock.id === "3 Ender Pearls") {
			max = 4;
		}
		else if (unlock.id === "8 Netherite Scrap") {
			max = 2;
		}
		unlock.onclick = function() {
			const count = itemIterate(unlock, max);
			unlockUpdateImage(unlock, count, max);
			updateNodes();
		};
	}
}

function itemIterate(unlock, max) {
	let count = parseInt(unlock.classList[1][1]);
	unlock.classList.remove("_" + count);
	count = count + 1;
	if (count > max) {
		count = 0;
	}
	unlock.classList.add("_" + count);
	return count;
}
function unlockUpdateImage(unlock, count, max) {
	if (max > 1) {
		unlock.innerHTML = '<img src="./images/unlocks/' + unlock.id + '_' + count + '.png">';
	}
}

function countChecks() {
	let total = 0;
	let checked = 0;
	let logical = 0;
	const nodes = document.getElementsByClassName("node");
	for (let node of nodes) {
		if (!node.classList.contains("excluded")) {
			total = total + 1;
			if (node.classList.contains("checked")) {
				checked = checked + 1;
			}
			else if (node.classList.contains("logical")){
				logical = logical + 1;
			}
		}
	}
	counts.innerHTML = "" + checked + " / " + logical + " / " + total;
}