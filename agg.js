let criteria = {};
let advancements = {};
let idToAdvancement = {};
let idToUnlock = {};

// https://github.com/ArchipelagoMW/Archipelago/blob/main/worlds/minecraft/Constants.py
const unlockOffset = 45000;
const advancementOffset = 42000;

async function loadContent(worldFileName) {
	const criteriaRes = await fetch('./static/criteria.json', {
		method: 'GET'
	});
	criteria = await criteriaRes.json();
	const advancementRes = await fetch('./static/advancements.json', {
		method: 'GET'
	});
	advancements = await advancementRes.json();
	const idToAdvancementRes = await fetch('./static/idToAdvancement.json', {
		method: 'GET'
	});
	idToAdvancement = await idToAdvancementRes.json();
	const idToUnlockRes = await fetch('./static/idToUnlock.json', {
		method: 'GET'
	});
	idToUnlock = await idToUnlockRes.json();
}

function getCriteria(nodeId) {
	if (nodeId.includes("archipelago")) {
		return criteria["aprandomizer:" + nodeId].criteria;
	}
	return criteria["minecraft:" + nodeId].criteria;
}

function connect() {
	if (!ANAME.value || !APORT.value || !AHOST.value) {
		return;
	}
	socket = new WebSocket("wss://" + AHOST.value + ":" + APORT.value);

	socket.addEventListener('open', function (event) {
		socket.send(`[{
			"cmd" : "Connect",
			"password" : "` + APASS.value + `",
			"game" : "Minecraft",
			"name" : "` + ANAME.value + `",
			"tags" : ["Tracker"],
			"version" : {
				"major": 0,
				"minor": 6,
				"build": 1,
				"class": "Version"
			},
			"items_handling" : 7,
			"uuid" : "a1c0aac5-01e5-4957-99fe-6ae9edeafa78"
		}]`);
	});

	let slot = -1;
	socket.addEventListener('message', function (event) {
		const message = JSON.parse(event.data);
		console.log(message);
		let commands = [];
		for (let command of message) {
			commands.push(command.cmd);
		}

		// seems to be an initial connect response
		if (commands.includes("Connected")) {
			for (let command of message) {
				if (command.cmd === "Connected") {
					// save slot for later
					slot = command.slot;
					// for each "checked_location"
					for (let location of command.checked_locations) {
						gotLocation(location);
					}
					settingsFromSlotData(command.slot_data);
				}
				else if (command.cmd === "ReceivedItems") {
					for (let item of command.items) {
						gotItem(item.item);
					}
				}
			}
			updateNodes();
		}
		// on the fly
		else if (commands.includes("PrintJSON")) {
			for (let command of message) {
				if (command.cmd === "PrintJSON" && command.type === "ItemSend") {
					//I checked the location
					if (command.item.player === slot) {
						gotLocation(command.item.location);
					}
					//I recieved the item
					if (command.receiving === slot) {
						gotItem(command.item.item);
					}
					updateNodes();
				}
			}
		}
	});
}

function gotItem(id) {
	let itemName = idToUnlock[id - unlockOffset];
	if (itemName) {
		let div = document.getElementById(itemName);
		const max = maxIter(div);
		const count = itemIterate(div, max);
		unlockUpdateImage(div, count, max);
	}
}

function gotLocation(id) {
	let locationName = idToAdvancement[id - advancementOffset];
	if (locationName) {
		let div = document.getElementById(locationName);
		div.classList.add("checked");
	}
}

function settingsFromSlotData(slotData) {
	advancement_goal.value = slotData["advancement_goal"];
	dragon_egg_shards.value = slotData["egg_shards_required"];
	required_bosses.value = slotData["required_bosses"];
	for (let relm in slotData["structures"]) {
		let biome = "overworld";
		if (relm.includes("Nether")) {
			biome = "nether";
		}
		else if (relm === "The End Structure") {
			biome = "end";
		}
		if (slotData["structures"][relm] === "Village") {
			village.value = biome;
		}
		else if (slotData["structures"][relm] === "Pillager Outpost") { 
			outpost.value = biome;
		}
		else if (slotData["structures"][relm] === "Nether Fortress") { 
			fortress.value = biome;
		}
		else if (slotData["structures"][relm] === "Bastion Remnant") { 
			bastion.value = biome;
		}
		else if (slotData["structures"][relm] === "End City") { 
			city.value = biome;
		}
	}
}
