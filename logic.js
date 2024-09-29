// Core has
function has(unlock, count = 1) {
	let current = parseInt(document.getElementById(unlock).classList[1][1]);
	if (current >= count) {
		return "logical";
	}
}
function hasAll(...logics) {
	let worst = "logical";
	for (let logic of logics) {
		if (!logic) {
			return;
		}
		if (logic === "possible") {
			worst = "possible";
		}
	}
	return worst;
}
function hasEither(...logics) {
	let best;
	for (let logic of logics) {
		if (logic === "logical") {
			return "logical";
		}
		if (logic === "possible") {
			best = "possible";
		}
	}
	return best;
}

// Helpers
// Biomes
function can_nether() {
	if (has("Bucket") || has("Progressive Tools", 3)) {
		if (has("Flint and Steel") && has("Progressive Tools") && has("Progressive Resource Crafting")) {
			return "logical";
		}
	}
	return "possible";
}
function can_end() {
	if (has("Brewing")) {
		if (has("3 Ender Pearls", 4)) {
			return can_loot_fortress();
		}
		return "possible";
	}
}

// Structures
function can_structure(settingDiv, compassName) {
	if (settingDiv.value === "overworld") {
		if (structure_compasses.value) {
			if (has(compassName) && can_adventure() === "logical") {
				return "logical";
			}
			return "possible";
		}
		else {
			return can_adventure();
		}
		return "logical";
	}
	if (settingDiv.value === "nether") {
		if (structure_compasses.value) {
			if (has(compassName) && can_adventure() === "logical") {
				return can_nether();
			}
			return hasAll("possible", can_nether());
		}
		else {
			if (can_adventure() === "logical") {
				return can_nether();
			}
			return hasAll("possible", can_nether());
		}
		return can_nether();
	}
	if (settingDiv.value === "end") {
		if (structure_compasses.value) {
			if (has(compassName) && can_adventure() === "logical") {
				return can_end();
			}
			return hasAll("possible", can_end());
		}
		else {
			if (can_adventure() === "logical") {
				return can_end();
			}
			return hasAll("possible", can_end());
		}
		return can_end();
	}
}
function can_village() {
	return can_structure(village, "Structure Compass (Village)");
}
function can_fortress() {
	return can_structure(fortress, "Structure Compass (Nether Fortress)");
}
function can_stronghold() {
	if (has("Brewing")) {
		if (has("3 Ender Pearls")) {
			return can_loot_fortress();
		}
		return hasAll("possible", can_loot_fortress());
	}
}
function can_bastion() {
	return can_structure(bastion, "Structure Compass (Bastion Remnant)");
}
function can_loot_fortress() {
	return hasAll(can_fortress(), can_basic_combat());
}
function can_outpost() {
	return can_structure(outpost, "Structure Compass (Pillager Outpost)");
}
function can_city() {
	return can_structure(city, "Structure Compass (End City)");
}

// Ores
function has_iron_ingots() {
	if (has("Progressive Tools") && has("Progressive Resource Crafting")) {
		return "logical";
	}
	return "possible";
}
function has_gold_ingots() {
	if (has("Progressive Resource Crafting")) {
		if (has("Progressive Tools", 2)) {
			return "logical";
		}
		return can_nether();
	}
	return "possible";
}

// Exploration
function can_adventure() {
	const deathlinkable = !death_link.value || has("Bed");
	if (combat_difficulty.value === "easy") {
		if (has_iron_ingots() === "logical" && has("Progressive Weapons", 2) && deathlinkable) {
			return "logical";
		}
	}
	else if (combat_difficulty.value === "normal") {
		if (has("Progressive Weapons") && deathlinkable && (has("Progressive Resource Crafting") || has("Campfire"))) {
			return "logical";
		}
	}
	else {
		return "logical";
	}
	return "possible";
}
function can_basic_combat() {
	if (combat_difficulty.value === "easy") {
		if (has("Progressive Weapons", 2) && has("Progressive Armor") && has("Shield") && has_iron_ingots() === "logical") {
			return "logical";
		}
	}
	else if (combat_difficulty.value === "normal") {
		if (has("Progressive Weapons") && (has("Progressive Armor") || has("Shield")) && has_iron_ingots() === "logical") {
			return "logical";
		}
	}
	else {
		return "logical";
	}
	return "possible";
}
function can_piglin_trade() {
	let netherTrade = hasAll(has_gold_ingots(), can_nether());
	let bastionTrade = hasAll(has_gold_ingots(), can_bastion());
	return hasEither(netherTrade, bastionTrade);
}
function can_complete_raid() {
	const can_village_outpost = hasAll(can_village(), can_outpost());
	if (combat_difficulty.value === "easy") {
		if (has("Progressive Weapons", 3) && has("Progressive Armor", 2) && has("Shield") && has("Archery") && has("Progressive Tools", 2) && has_iron_ingots() === "logical") {
			return can_village_outpost;
		}
	}
	else if (combat_difficulty.value === "normal") {
		if (has("Progressive Weapons", 2) && has("Progressive Armor") && has("Shield") && has_iron_ingots() === "logical") {
			return can_village_outpost;
		}
	}
	else {
		if (has("Progressive Weapons", 2) && (has("Progressive Armor") || has("Shield")) && has_iron_ingots() === "logical") {
			return can_village_outpost;
		}
	}
	return hasAll("possible", can_village_outpost);
}
function can_villager_overworld() {
	if (village.value === "overworld") {
		return can_village();
	}
	if (village.value === "nether") {
		const portalable = hasEither(can_village(), has_diamond_pickaxe());
		if (portalable === "logical") {
			return "logical";
		}
		const doctorable = can_cure_zombie();
		if (doctorable === "logical") {
			return "logical";
		}
		if (portalable || doctorable) {
			return "possible";
		}
	}
	else {
		return can_cure_zombie();
	}
}

// Bosses
function has_wither_goal() {
	if (required_bosses.value === "wither" || required_bosses.value === "both") {
		const count = parseInt(counts.innerHTML.split(" / ")[0]);
		if (count >= parseInt(advancement_goal.value)) {
			return "logical";
		}
		return;
	}
	return "logical";
}
function has_dragon_goal() {
	if (required_bosses.value === "dragon" || required_bosses.value === "both") {
		const count = parseInt(counts.innerHTML.split(" / ")[0]);
		if (count >= parseInt(advancement_goal.value)) {
			return "logical";
		}
		return;
	}
	return "logical";
}
function can_kill_wither() {
	if (has_wither_goal()) {
		const logicallyKillable = hasAll(can_loot_fortress(), has("Progressive Weapons", 3), has("Progressive Armor", 2), can_brew_potions(), can_enchant());
		if (combat_difficulty.value === "easy") {
			if (logicallyKillable === "logical" && has("Archery")) {
				return "logical";
			}
		}
		else if (combat_difficulty.value === "normal") {
			if (logicallyKillable === "logical") {
				return "logical";
			}
		}
		else {
			if (can_loot_fortress() === "logical") {
				if (hasEither(logicallyKillable, can_nether(), can_end()) === "logical") {
					return "logical";
				}
			}
		}
		return can_loot_fortress();
	}
}
function can_kill_dragon() {
	if (has_dragon_goal()) {
		const strongholdable = can_end();
		if (!strongholdable) {
			return;
		}
		if (strongholdable === "logical") { 
			if (combat_difficulty.value === "easy") {
				if (has("Progressive Weapons", 3) && has("Progressive Armor", 2) && has("Archery") && can_brew_potions() && can_enchant()) {
					return "logical";
				}
			}
			else if (combat_difficulty.value === "normal") {
				if (has("Progressive Weapons", 2) && has("Progressive Armor") && has("Archery")) {
					return "logical";
				}
			}
			else {
				if (has("Progressive Weapons", 2) && has("Progressive Armor")) {
					return "logical";
				}
				if (has("Progressive Weapons") && has("Bed")) {
					return "logical";
				}
			}
		}
		return "possible";
	}
}
function can_respawn_dragon() {
	return hasAll(can_nether(), can_end(), has("Progressive Resource Crafting"));
}

// Tools
function has_diamond_pickaxe() {
	if (has("Progressive Tools", 3)) {
		return has_iron_ingots();
	}
	return "possible";
}
function can_enchant() {
	if (has("Enchanting")) {
		return has_diamond_pickaxe();
	}
}
function has_bottle() {
	return hasAll(has("Bottles"), has("Progressive Resource Crafting"));
}
function can_brew_potions() {
	return hasAll(can_loot_fortress(), has("Brewing"), has_bottle());
}
function has_spyglass() {
	return hasAll(has_iron_ingots(), has("Spyglass"), can_adventure());
}
function has_crossbow() {
	if (has("Archery")) {
		return has_iron_ingots();
	}
	return "possible";
}
function can_use_anvil() {
	if (has("Progressive Resource Crafting", 2)) {
		if (has("Enchanting") && has_iron_ingots() === "logical") {
			return "logical";
		}
		return "possible";
	}
}
function can_ancient() {
	if (can_brew_potions() === "logical" && has("Bed") && has_diamond_pickaxe() === "logical") {
		return "logical";
	}
	if (can_bastion()) {
		return "possible";
	}
	return hasAll(has_diamond_pickaxe(), can_nether());
}
function can_strider() {
	if (has("Saddle") && has("Fishing Rod")) {
		const lootable = can_loot_fortress();
		const raidable = can_complete_raid();
		const either = hasEither(lootable, raidable);
		if (either) {
			return either;
		}
	}
	return hasAll("possible", can_nether());
}
function can_beacon() {
	if (can_kill_wither()) {
		if (has("Progressive Resource Crafting", 2)) {
			return has_diamond_pickaxe();
		}
		return "possible";
	}
}
function can_all_potions() {
	if (can_beacon() === "logical") {
		return hasAll(can_brew_potions(), has("Fishing Rod"), can_nether(), can_village());
	}
	return hasAll("possible", can_brew_potions(), has("Fishing Rod"), can_nether(), can_village());
}
function can_cure_zombie() {
	if (can_brew_potions() === "logical" && has_gold_ingots() === "logical") {
		return "logical";
	}
	return "possible";
}

// The logic Proper
const locationLogic = {
	"story/root": function() {
		return "excluded";
	},
	"story/mine_stone": function() {
		return "logical";
	},
	"story/upgrade_tools": function() {
		if (has("Progressive Tools")) {
			return "logical";
		}
		return hasAll("possible", can_village());
	},
	"story/smelt_iron": function() {
		return has_iron_ingots();
	},
	"story/obtain_armor": function() {
		if (has("Progressive Armor")) {
			return has_iron_ingots();
		}
		return "possible";
	},
	"story/lava_bucket": function() {
		if (has("Bucket")) {
			return has_iron_ingots();
		}
		return hasAll("possible", can_village());
	},
	"story/iron_tools": function() {
		if (has("Progressive Tools", 2)) {
			return has_iron_ingots();
		}
		return "possible";
	},
	"story/deflect_arrow": function() {
		if (has("Shield")) {
			return has_iron_ingots();
		}
		return hasAll("possible", can_village());
	},
	"story/form_obsidian": function() {
		return has_diamond_pickaxe();
	},
	"story/mine_diamond": function() {
		if (has("Progressive Tools", 2)) {
			return has_iron_ingots();
		}
		return "possible";
	},
	"story/enter_the_nether": function() {
		return can_nether();
	},
	"story/shiny_gear": function() {
		if (has("Progressive Armor", 2) && has("Progressive Tools", 2)) {
			return has_iron_ingots();
		}
		return "possible";
	},
	"story/enchant_item": function() {
		return can_enchant();
	},
	"story/cure_zombie_villager": function() {
		return can_cure_zombie();
	},
	"story/follow_ender_eye": function() {
		return can_stronghold();
	},
	"story/enter_the_end": function() {
		return can_end();
	},
	"nether/root": function() {
		return "excluded";
	},
	"nether/return_to_sender": function() {
		return can_nether();
	},
	"nether/find_bastion": function() {
		return can_bastion();
	},
	"nether/obtain_ancient_debris": function() {
		return can_ancient();
	},
	"nether/fast_travel": function() {
		return has_diamond_pickaxe();
	},
	"nether/find_fortress": function() {
		return can_fortress();
	},
	"nether/obtain_crying_obsidian": function() {
		return can_piglin_trade();
	},
	"nether/distract_piglin": function() {
		return can_piglin_trade();
	},
	"nether/ride_strider": function() {
		return can_strider();
	},
	"nether/uneasy_alliance": function() {
		if (has("Fishing Rod")) {
			return has_diamond_pickaxe();
		}
		return "possible";
	},
	"nether/loot_bastion": function() {
		return hasAll(can_bastion(), can_basic_combat());
	},
	"nether/use_lodestone": function() {
		if (can_ancient() === "logical") {
			return has_gold_ingots();
		}
		return "possible";
	},
	"nether/netherite_armor": function() {
		if (has("Progressive Armor", 2) && has("Progressive Resource Crafting")) {
			return hasEither("possible", hasAll(has("8 Netherite Scrap"), 2), has_diamond_pickaxe(), has_iron_ingots(), can_brew_potions(), has("Bed"));
		}
	},
	"nether/get_wither_skull": function() {
		return can_loot_fortress();
	},
	"nether/obtain_blaze_rod": function() {
		return can_loot_fortress();
	},
	"nether/charge_respawn_anchor": function() {
		if (has("Progressive Resource Crafting"), 2) {
			return can_piglin_trade();
		}
		return "possible";
	},
	"nether/ride_strider_in_overworld_lava": function() {
		if (has("Bucket")) {
			return can_strider();
		}
		if (can_village()) {
			return hasAll("possible", can_strider());
		}
	},
	"nether/explore_nether": function() {
		return can_nether();
	},
	"nether/summon_wither": function() {
		return can_kill_wither();
	},
	"nether/brew_potion": function() {
		if (can_brew_potions() === "logical") {
			return "logical";
		}
		return "possible";
	},
	"nether/create_beacon": function() {
		return can_beacon();
	},
	"nether/all_potions": function() {
		return can_all_potions();
	},
	"nether/create_full_beacon": function() {
		return can_beacon();
	},
	"nether/all_effects": function() {
		return hasAll(can_all_potions(), has_gold_ingots(), can_city(), has("Archery"), can_beacon(), can_complete_raid());
	},
	"end/root": function() {
		return "excluded";
	},
	"end/kill_dragon": function() {
		return can_kill_dragon();
	},
	"end/dragon_egg": function() {
		return hasAll(can_respawn_dragon(), can_kill_dragon());
	},
	"end/enter_end_gateway": function() {
		return can_end();
	},
	"end/respawn_dragon": function() {
		return hasAll(can_respawn_dragon(), can_kill_dragon());
	},
	"end/dragon_breath": function() {
		if (has("Bottles")) {
			// Potentially a bug, not needing to spawn the dragon the first time
			return can_respawn_dragon();
		}
	},
	"end/find_end_city": function() {
		return can_city();
	},
	"end/elytra": function() {
		return hasAll(can_basic_combat(), can_city());
	},
	"end/levitate": function() {
		return hasAll(can_basic_combat(), can_city());
	},
	"adventure/root": function() {
		return "excluded";
	},
	"adventure/voluntary_exile": function() {
		return hasAll(can_basic_combat(), can_outpost());
	},
	"adventure/spyglass_at_parrot": function() {
		return has_spyglass();
	},
	"adventure/kill_a_mob": function() {
		return "logical";
	},
	"adventure/read_power_of_chiseled_bookshelf": function() {
		return "excluded";
	},
	"adventure/trade": function() {
		return can_village();
	},
	"adventure/trim_with_any_armor_pattern": function() {
		return "excluded";
	},
	"adventure/honey_block_slide": function() {
		return hasAll(has("Campfire"), has_bottle());
	},
	"adventure/ol_betsy": function() {
		return has_crossbow();
	},
	"adventure/lightning_rod_with_villager_no_fire": function() {
		if (has("Channeling Book") && can_enchant()) {
			return hasAll(can_use_anvil(), can_villager_overworld())
		}
		return hasAll("possible", can_use_anvil(), can_villager_overworld());
	},
	"adventure/fall_from_world_height": function() {
		if (has("Bucket") && has("Progressive Tools")) {
			return has_iron_ingots();
		}
		return "possible";
	},
	"adventure/salvage_sherd": function() {
		return "excluded";
	},
	"adventure/avoid_vibration": function() {
		if (has("Progressive Tools", 2)) {
			return hasAll(can_adventure(), has_iron_ingots());
		}
		return "possible";
	},
	"adventure/sleep_in_bed": function() {
		return hasEither(has("Bed"), can_village());
	},
	"adventure/hero_of_the_village": function() {
		return can_complete_raid();
	},
	"adventure/spyglass_at_ghast": function() {
		return hasAll(has_spyglass(), can_nether());
	},
	"adventure/throw_trident": function() {
		return can_adventure();
	},
	"adventure/kill_mob_near_sculk_catalyst": function() {
		if (has("Progressive Tools", 2)) {
			return hasAll(can_adventure(), has_iron_ingots());
		}
		return "possible";
	},
	"adventure/shoot_arrow": function() {
		if (has("Archery")) {
			return "logical";
		}
		return "possible";
	},
	"adventure/kill_all_mobs": function() {
		if (has("Fishing Rod")) {
			return hasAll(can_respawn_dragon(), can_kill_dragon(), can_kill_wither());
		}
		return hasAll("possible", can_respawn_dragon(), can_kill_dragon(), can_kill_wither());
	},
	"adventure/totem_of_undying": function() {
		return can_complete_raid();
	},
	"adventure/summon_iron_golem": function() {
		if (has("Progressive Resource Crafting", 2)) {
			return has_iron_ingots();
		}
	},
	"adventure/trade_at_world_height": function() {
		if (has("Bucket")) {
			if (hasEither(can_nether(), can_fortress(), can_piglin_trade()) === "logical") {
				if (has_iron_ingots() === "logical") {
					return can_villager_overworld();
				}
			}
		}
		return can_villager_overworld();
	},
	"adventure/trim_with_all_exclusive_armor_patterns": function() {
		return "excluded";
	},
	"adventure/two_birds_one_arrow": function() {
		return hasAll(has_crossbow(), can_enchant());
	},
	"adventure/whos_the_pillager_now": function() {
		return hasAll(has_crossbow(), can_outpost());
	},
	"adventure/arbalistic": function() {
		return hasAll(has_crossbow(), has("Piercing IV Book"), can_use_anvil(), can_enchant());
	},
	"adventure/craft_decorated_pot_using_only_sherds": function() {
		return "excluded";
	},
	"adventure/adventuring_time": function() {
		return can_adventure();
	},
	"adventure/play_jukebox_in_meadows": function() {
		if (has("Progressive Tools")) {
			return hasAll(has_iron_ingots(), can_basic_combat());
		}
	},
	"adventure/walk_on_powder_snow_with_leather_boots": function() {
		if (has("Bucket")) {
			return hasAll(has_iron_ingots(), can_adventure());
		}
		return hasAll("possible", has_iron_ingots(), can_adventure());
	},
	"adventure/spyglass_at_dragon": function() {
		if (can_respawn_dragon() === "logical") {
			return has_spyglass();
		}
		return hasAll(has_spyglass(), can_end());
	},
	"adventure/very_very_frightening": function() {
		if (has("Channeling Book") && can_enchant()) {
			return hasAll(can_use_anvil(), can_villager_overworld())
		}
		return hasAll("possible", can_use_anvil(), can_villager_overworld());
	},
	"adventure/sniper_duel": function() {
		if (has("Archery")) {
			return "logical";
		}
		return "possible";
	},
	"adventure/bullseye": function() {
		if (has("Archery") && has("Progressive Tools", 2)) {
			return has_iron_ingots();
		}
		return "possible";
	},
	"adventure/brush_armadillo": function() {
		return "excluded";
	},
	"adventure/minecraft_trials_edition": function() {
		return "excluded";
	},
	"adventure/crafters_crafting_crafters": function() {
		return "excluded";
	},
	"adventure/lighten_up": function() {
		return "excluded";
	},
	"adventure/who_needs_rockets": function() {
		return "excluded";
	},
	"adventure/under_lock_and_key": function() {
		return "excluded";
	},
	"adventure/revaulting": function() {
		return "excluded";
	},
	"adventure/blowback": function() {
		return "excluded";
	},
	"adventure/overoverkill": function() {
		return "excluded";
	},
	"husbandry/root": function() {
		return "excluded";
	},
	"husbandry/safely_harvest_honey": function() {
		return hasAll(has("Campfire"), has_bottle());;
	},
	"husbandry/breed_an_animal": function() {
		return "logical";
	},
	"husbandry/allay_deliver_item_to_player": function() {
		return can_outpost();
	},
	"husbandry/ride_a_boat_with_a_goat": function() {
		return can_adventure();
	},
	"husbandry/tame_an_animal": function() {
		return "logical";
	},
	"husbandry/make_a_sign_glow": function() {
		return can_adventure();
	},
	"husbandry/fishy_business": function() {
		return has("Fishing Rod");
	},
	"husbandry/silk_touch_nest": function() {
		return hasAll(has("Silk Touch Book"), can_use_anvil(), can_enchant());
	},
	"husbandry/tadpole_in_a_bucket": function() {
		if (has("Bucket")) {
			return hasAll(has_iron_ingots(), can_adventure());
		}
		return hasAll("possible", can_village());
	},
	"husbandry/obtain_sniffer_egg": function() {
		return "excluded";
	},
	"husbandry/plant_seed": function() {
		return "logical";
	},
	"husbandry/wax_on": function() {
		if (has("Campfire") && has("Progressive Resource Crafting", 2)) {
			return has_iron_ingots();
		}
	},
	"husbandry/bred_all_animals": function() {
		if (has("Bucket")) {
			return hasAll(has_iron_ingots(), can_adventure());
		}
		return hasAll("possible", can_village());
	},
	"husbandry/allay_deliver_cake_to_note_block": function() {
		if (has("Bucket") && has("Progressive Tools", 2)) {
			return hasAll(has_iron_ingots(), can_outpost());
		}
		return hasAll("possible", can_village(), can_outpost());
	},
	"husbandry/complete_catalogue": function() {
		return can_village();
	},
	"husbandry/tactical_fishing": function() {
		if (has("Bucket")) {
			return has_iron_ingots();
		}
		return hasAll("possible", can_village());
	},
	"husbandry/leash_all_frog_variants": function() {
		if (has("Lead")) {
			return can_adventure();
		}
	},
	"husbandry/feed_snifflet": function() {
		return "excluded";
	},
	"husbandry/balanced_diet": function() {
		if (has_bottle() && has("Progressive Resource Crafting", 2)) {
			return hasAll(has_gold_ingots(), can_end());
		}
	},
	"husbandry/obtain_netherite_hoe": function() {
		// Pretty sure this is wrong...
		// Netherite Hoe needs a Netherite crafting upgrade from the bastion
		if (has("Bed")) {
			return hasAll(can_brew_potions(), can_nether(), has_diamond_pickaxe(), has_gold_ingots());
		}
		return hasAll(can_bastion(), can_nether(), has_diamond_pickaxe(), has_gold_ingots());
	},
	"husbandry/wax_off": function() {
		if (has("Campfire") && has("Progressive Resource Crafting", 2)) {
			return has_iron_ingots();
		}
	},
	"husbandry/axolotl_in_a_bucket": function() {
		if (has("Bucket")) {
			return has_iron_ingots();
		}
		return hasAll("possible", can_village());
	},
	"husbandry/froglights": function() {
		if (has("Lead")) {
			return can_adventure();
		}
	},
	"husbandry/plant_any_sniffer_seed": function() {
		return "excluded";
	},
	"husbandry/kill_axolotl_target": function() {
		if (has("Bucket")) {
			return has_iron_ingots();
		}
		return hasAll("possible", can_village());
	},
	"husbandry/repair_wolf_armor": function() {
		return "excluded";
	},
	"husbandry/whole_pack": function() {
		return "excluded";
	},
	"husbandry/remove_wolf_armor": function() {
		return "excluded";
	},
	"archipelago/root": function() {
		return "excluded";
	},
	"archipelago/get_wood": function() {
		return "logical";
	},
	"archipelago/craft_sword": function() {
		return "logical";
	},
	"archipelago/get_pickaxe": function() {
		return "logical";
	},
	"archipelago/cow_tipper": function() {
		return "logical";
	},
	"archipelago/hot_topic": function() {
		return has("Progressive Resource Crafting");
	},
	"archipelago/bake_bread": function() {
		return "logical";
	},
	"archipelago/ride_minecart": function() {
		if (has("Progressive Tools", 2)) {
			return has_iron_ingots();
		}
		return "possible";
	},
	"archipelago/overpowered": function() {
		if (has("Progressive Tools", 2)) {
			return hasAll(has_iron_ingots(), can_basic_combat());
		}
		return "possible";
	},
	"archipelago/the_lie": function() {
		return "excluded";
	},
	"archipelago/overkill": function() {
		return "excluded";
	},
	"archipelago/obtain_bookshelf": function() {
		return "excluded";
	},
	"archipelago/ride_pig": function() {
		return "excluded";
	}
}