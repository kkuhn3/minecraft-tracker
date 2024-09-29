let criteria = {};
let advancements = {};

async function loadContent(worldFileName) {
	const criteriaRes = await fetch('./static/criteria.json', {
		method: 'GET'
	});
	criteria = await criteriaRes.json();
	const advancementRes = await fetch('./static/advancements.json', {
		method: 'GET'
	});
	advancements = await advancementRes.json();
}

function getCriteria(nodeId) {
	if (nodeId.includes("archipelago")) {
		return criteria["aprandomizer:" + nodeId].criteria;
	}
	return criteria["minecraft:" + nodeId].criteria;
}