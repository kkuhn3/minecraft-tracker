let size = 0;
let fullWidth = 0;

function setScaleSize() {
	fullWidth = document.getElementById("selectors").clientWidth;
	// the biggest advancement horizontally has 9 elements. with 1 between and .5 margins
	const maxNodewidth = fullWidth / 18;
	document.documentElement.style.setProperty('--size', maxNodewidth);
	size = maxNodewidth;
	placeMinecraft();
	placeNether();
	placeEnd();
	placeAdventure();
	placeHusbandry();
	placeArchipelago();
	placeUnlocks();
}

function addResizer() {
	window.addEventListener('resize', function(event){
		setScaleSize();
		positionInfo();
	});
}

//setTopLeft("category/id", from the top in squares, from the left in squares);
function placeMinecraft() {
	setTopLeft("story/root", 2.5, 1);
	setTopLeft("story/mine_stone", 2.5, 2);
	setTopLeft("story/upgrade_tools", 2.5, 3);
	setTopLeft("story/smelt_iron", 2.5, 4);
	setTopLeft("story/lava_bucket", 1.5, 5);
	setTopLeft("story/iron_tools", 3, 5);
	setTopLeft("story/obtain_armor", 4, 5);
	setTopLeft("story/form_obsidian", 1.5, 6);
	setTopLeft("story/mine_diamond", 3, 6);
	setTopLeft("story/deflect_arrow", 4, 6);
	setTopLeft("story/enter_the_nether", 1.5, 7);
	setTopLeft("story/enchant_item", 2.5, 7);
	setTopLeft("story/shiny_gear", 3.5, 7);
	setTopLeft("story/follow_ender_eye", 1, 8);
	setTopLeft("story/cure_zombie_villager", 2, 8);
	setTopLeft("story/enter_the_end", 1, 9);
}

function placeNether() {
	setTopLeft("nether/root", 5.75, 1);
	setTopLeft("nether/find_bastion", 1, 2);
	setTopLeft("nether/ride_strider", 2.5, 2);
	setTopLeft("nether/distract_piglin", 3.5, 2);
	setTopLeft("nether/fast_travel", 4.5, 2);
	setTopLeft("nether/obtain_crying_obsidian", 5.5, 2);
	setTopLeft("nether/obtain_ancient_debris", 7, 2);
	setTopLeft("nether/find_fortress", 9, 2);
	setTopLeft("nether/return_to_sender", 10.5, 2);
	setTopLeft("nether/loot_bastion", 1, 3);
	setTopLeft("nether/ride_strider_in_overworld_lava", 2, 3);
	setTopLeft("nether/explore_nether", 3, 3);
	setTopLeft("nether/charge_respawn_anchor", 5.5, 3);
	setTopLeft("nether/use_lodestone", 6.5, 3);
	setTopLeft("nether/netherite_armor", 7.5, 3);
	setTopLeft("nether/obtain_blaze_rod", 8.5, 3);
	setTopLeft("nether/get_wither_skull", 9.5, 3);
	setTopLeft("nether/uneasy_alliance", 10.5, 3);
	setTopLeft("nether/brew_potion", 8.5, 4);
	setTopLeft("nether/summon_wither", 9.5, 4);
	setTopLeft("nether/all_potions", 8.5, 5);
	setTopLeft("nether/create_beacon", 9.5, 5);
	setTopLeft("nether/all_effects", 8.5, 6);
	setTopLeft("nether/create_full_beacon", 9.5, 6);
}

function placeEnd() {
	setTopLeft("end/root", 2.5, 1);
	setTopLeft("end/kill_dragon", 2.5, 2);
	setTopLeft("end/dragon_breath", 1, 3);
	setTopLeft("end/respawn_dragon", 2, 3);
	setTopLeft("end/dragon_egg", 3, 3);
	setTopLeft("end/enter_end_gateway", 4, 3);
	setTopLeft("end/find_end_city", 4, 4);
	setTopLeft("end/elytra", 3.5, 5);
	setTopLeft("end/levitate", 4.5, 5);
}

function placeAdventure() {
	setTopLeft("adventure/root", 12, 1);
	setTopLeft("adventure/ol_betsy", 2, 2);
	setTopLeft("adventure/lightning_rod_with_villager_no_fire", 4, 2);
	setTopLeft("adventure/minecraft_trials_edition", 6, 2);
	setTopLeft("adventure/trade", 9.5, 2);
	setTopLeft("adventure/kill_a_mob", 13, 2);
	setTopLeft("adventure/voluntary_exile", 16.5, 2);
	setTopLeft("adventure/read_power_of_chiseled_bookshelf", 17.5, 2);
	setTopLeft("adventure/sleep_in_bed", 18.5, 2);
	setTopLeft("adventure/avoid_vibration", 19.5, 2);
	setTopLeft("adventure/honey_block_slide", 20.5, 2);
	setTopLeft("adventure/crafters_crafting_crafters", 21.5, 2);
	setTopLeft("adventure/trim_with_any_armor_pattern", 22.5, 2);
	setTopLeft("adventure/brush_armadillo", 23.5, 2);
	setTopLeft("adventure/salvage_sherd", 24.5, 2);
	setTopLeft("adventure/fall_from_world_height", 25.5, 2);
	setTopLeft("adventure/spyglass_at_parrot", 26.5, 2);
	setTopLeft("adventure/two_birds_one_arrow", 1, 3);
	setTopLeft("adventure/arbalistic", 2, 3);
	setTopLeft("adventure/whos_the_pillager_now", 3, 3);
	setTopLeft("adventure/blowback", 4, 3);
	setTopLeft("adventure/under_lock_and_key", 5, 3);
	setTopLeft("adventure/who_needs_rockets", 6, 3);
	setTopLeft("adventure/lighten_up", 7, 3);
	setTopLeft("adventure/overoverkill", 8, 3);
	setTopLeft("adventure/summon_iron_golem", 9, 3);
	setTopLeft("adventure/trade_at_world_height", 10, 3);
	setTopLeft("adventure/totem_of_undying", 11, 3);
	setTopLeft("adventure/kill_mob_near_sculk_catalyst", 12, 3);
	setTopLeft("adventure/throw_trident", 13, 3);
	setTopLeft("adventure/shoot_arrow", 14.5, 3);
	setTopLeft("adventure/kill_all_mobs", 15.5, 3);
	setTopLeft("adventure/hero_of_the_village", 16.5, 3);
	setTopLeft("adventure/walk_on_powder_snow_with_leather_boots", 17.5, 3);
	setTopLeft("adventure/play_jukebox_in_meadows", 18.5, 3);
	setTopLeft("adventure/adventuring_time", 19.5, 3);
	setTopLeft("adventure/trim_with_all_exclusive_armor_patterns", 22.5, 3);
	setTopLeft("adventure/craft_decorated_pot_using_only_sherds", 24.5, 3);
	setTopLeft("adventure/spyglass_at_ghast", 26.5, 3);
	setTopLeft("adventure/revaulting", 5, 4);
	setTopLeft("adventure/very_very_frightening", 13, 4);
	setTopLeft("adventure/bullseye", 14, 4);
	setTopLeft("adventure/sniper_duel", 15, 4);
	setTopLeft("adventure/spyglass_at_dragon", 26.5, 4);
}

function placeHusbandry() {
	setTopLeft("husbandry/root", 7.5, 1);
	setTopLeft("husbandry/breed_an_animal", 1, 2);
	setTopLeft("husbandry/obtain_sniffer_egg", 2, 2);
	setTopLeft("husbandry/make_a_sign_glow", 3, 2);
	setTopLeft("husbandry/safely_harvest_honey", 4, 2);
	setTopLeft("husbandry/fishy_business", 5, 2);
	setTopLeft("husbandry/plant_seed", 6.5, 2);
	setTopLeft("husbandry/tame_an_animal", 9.5, 2);
	setTopLeft("husbandry/ride_a_boat_with_a_goat", 10.75, 2);
	setTopLeft("husbandry/tadpole_in_a_bucket", 12, 2);
	setTopLeft("husbandry/silk_touch_nest", 13, 2);
	setTopLeft("husbandry/allay_deliver_item_to_player", 14, 2);
	setTopLeft("husbandry/bred_all_animals", 1, 3);
	setTopLeft("husbandry/feed_snifflet", 2, 3);
	setTopLeft("husbandry/wax_on", 4, 3);
	setTopLeft("husbandry/tactical_fishing", 5, 3);
	setTopLeft("husbandry/obtain_netherite_hoe", 6, 3);
	setTopLeft("husbandry/balanced_diet", 7, 3);
	setTopLeft("husbandry/whole_pack", 8, 3);
	setTopLeft("husbandry/repair_wolf_armor", 9, 3);
	setTopLeft("husbandry/complete_catalogue", 10, 3);
	setTopLeft("husbandry/remove_wolf_armor", 11, 3);
	setTopLeft("husbandry/leash_all_frog_variants", 12, 3);
	setTopLeft("husbandry/allay_deliver_cake_to_note_block", 14, 3);
	setTopLeft("husbandry/plant_any_sniffer_seed", 2, 4);
	setTopLeft("husbandry/wax_off", 4, 4);
	setTopLeft("husbandry/axolotl_in_a_bucket", 5, 4);
	setTopLeft("husbandry/froglights", 12, 4);
	setTopLeft("husbandry/kill_axolotl_target", 5, 5);
}

function placeArchipelago() {
	setTopLeft("archipelago/root", 3.5, 1);
	setTopLeft("archipelago/get_wood", 1.5, 2);
	setTopLeft("archipelago/craft_sword", 2, 3);
	setTopLeft("archipelago/get_pickaxe", 1, 3);
	setTopLeft("archipelago/cow_tipper", 3.5, 2);
	setTopLeft("archipelago/hot_topic", 1, 4);
	setTopLeft("archipelago/bake_bread", 5.5, 2);
	setTopLeft("archipelago/ride_minecart", 4.5, 2);
	setTopLeft("archipelago/overpowered", 5, 3);
	setTopLeft("archipelago/the_lie", 6, 3);
	setTopLeft("archipelago/overkill", 2, 4);
	setTopLeft("archipelago/obtain_bookshelf", 3, 3);
	setTopLeft("archipelago/ride_pig", 4, 3);
}

function placeUnlocks() {
	setTopLeft("Progressive Resource Crafting", 1, 1);
	setTopLeft("Progressive Tools", 1, 2);
	setTopLeft("Progressive Weapons", 1, 3);
	setTopLeft("Progressive Armor", 1, 4);
	setTopLeft("3 Ender Pearls", 2, 1);
	setTopLeft("8 Netherite Scrap", 2, 2);
	setTopLeft("Channeling Book", 2, 3);
	setTopLeft("Silk Touch Book", 2, 4);
	setTopLeft("Piercing IV Book", 2, 5);
	setTopLeft("Archery", 3, 1);
	setTopLeft("Brewing", 3, 2);
	setTopLeft("Enchanting", 3, 3);
	setTopLeft("Bucket", 3, 4);
	setTopLeft("Flint and Steel", 3, 5);
	setTopLeft("Bed", 3, 6);
	setTopLeft("Bottles", 3, 7);
	setTopLeft("Shield", 4, 1);
	setTopLeft("Fishing Rod", 4, 2);
	setTopLeft("Campfire", 4, 3);
	setTopLeft("Saddle", 4, 4);
	setTopLeft("Spyglass", 4, 5);
	setTopLeft("Lead", 4, 6);
	setTopLeft("Structure Compass (Village)", 5, 1);
	setTopLeft("Structure Compass (Pillager Outpost)", 5, 2);
	setTopLeft("Structure Compass (Nether Fortress)", 5, 3);
	setTopLeft("Structure Compass (Bastion Remnant)", 5, 4);
	setTopLeft("Structure Compass (End City)", 5, 5);
}

function setTopLeft(eleId, t, l) {
	const ele = document.getElementById(eleId);
	ele.style.top = ((t-1) * 1.25) * size;
	ele.style.left = ((l-1) * 2 + .5) * size;
}

function addImages() {
	const nodes = document.getElementsByClassName("node");
	for (let node of nodes) {
		node.innerHTML = '<img src="./images/' + node.id + '.png">';
	}
	const unlocks = document.getElementsByClassName("unlock");
	for (let unlock of unlocks) {
		unlock.innerHTML = '<img src="./images/unlocks/' + unlock.id + '.png">';
	}
}

function addInfoDivs() {
	const nodes = document.getElementsByClassName("node");
	for (let node of nodes) {
		let info = document.createElement('div');
		info.className = "info";
		info.id = "info:" + node.id;
		sizeInfo(info, node);
		info.style.display = "none";
		node.parentElement.appendChild(info);
		node.onmouseover = () => {info.style.display = "block";};
		node.onmouseout = () => {info.style.display = "none";};
		info.onmouseover = () => {info.style.display = "block";};
		info.onmouseout = () => {info.style.display = "none";};
	}
	const unlocks = document.getElementsByClassName("unlock");
	for (let unlock of unlocks) {
		let info = document.createElement('div');
		info.className = "info";
		info.id = "info:" + unlock.id;
		sizeInfo(info, unlock);
		info.style.display = "none";
		unlock.parentElement.appendChild(info);
		unlock.onmouseover = () => {info.style.display = "block";};
		unlock.onmouseout = () => {info.style.display = "none";};
		info.onmouseover = () => {info.style.display = "block";};
		info.onmouseout = () => {info.style.display = "none";};
		info.innerHTML = "<span><b>" + unlock.id + "<b></span><br>";
	}
}

function positionInfo() {
	const infos = document.getElementsByClassName("info");
	for (let info of infos) {
		const node = document.getElementById(info.id.split(":")[1]);
		sizeInfo(info, node);
	}
}

function sizeInfo(info, node) {
	info.style.top = node.style.top;
	const nodeLeft = parseInt(node.style.left);
	if (nodeLeft > fullWidth / 2) {
		info.style.right = fullWidth - nodeLeft - 2;
	}
	else {
		info.style.left = nodeLeft + size + 6;
	}
}