import type { Component } from 'svelte';
import {
	Telescope,
	Handshake,
	BowArrow,
	Swords,
	UserSearch,
	Sparkles,
	EyeClosed,
	VenetianMask,
	Drama,
	HandPlatter,
	PenTool,
	Feather,
	Shell,
	BicepsFlexed,
	Blinds,
	ScanFace,
	ShieldAlert,
	Shield,
	Eye
} from '@lucide/svelte';

type Setting = {
	picked: boolean;
	pickFunc: () => void;
	warnFunc: () => string | null;
};

interface Character extends Setting {
	id: string;
	name: string;
	description: string;
	alignment: "good" | "evil";
	icon: Component;
}

interface Module extends Setting {
	id: string;
	name: string;
	description: string;
}

function createGameStore() {
	let characters: Character[] = $state([
		{
			id: "merlin",
			name: "Merlin",
			description: "Knows Evil. Must remain hidden.",
			alignment: "good",
			icon: Telescope,
			picked: true,
			pickFunc: () => toggleCharacter("merlin"),
			warnFunc: () => { return null; }
		},
		{
			id: "assassin",
			name: "Assassin",
			description: "May actiavate Assassination stage if theree Quests succeed.",
			alignment: "evil",
			icon: BowArrow,
			picked: true,
			pickFunc: () => toggleCharacter("assassin"),
			warnFunc: () => {
				const merlin = characters.find(c => c.id === "merlin")
				const self = characters.find(c => c.id === "assassin")
				if (!merlin?.picked && self?.picked) return "Requires Merlin"
				return null;
			}
		},
		{
			id: "percival",
			name: "Percival",
			description: "Knows Merlin.",
			alignment: "good",
			icon: Handshake,
			picked: false,
			pickFunc: () => toggleCharacter("percival"),
			warnFunc: () => {
				const merlin = characters.find(c => c.id === "merlin")
				const self = characters.find(c => c.id === "percival")
				if (!merlin?.picked && self?.picked) return "Requires Merlin"
				return null;
			}
		},
		{
			id: "mordred",
			name: "Mordred",
			description: "Unknow to Merlin.",
			alignment: "evil",
			icon: EyeClosed,
			picked: false,
			pickFunc: () => toggleCharacter("mordred"),
			warnFunc: () => {
				const merlin = characters.find(c => c.id === "merlin")
				const self = characters.find(c => c.id === "mordred")
				if (!merlin?.picked && self?.picked) return "Requires Merlin"
				return null;
			}
		},
		{
			id: "oberon",
			name: "Oberon",
			description: "Unknown to Evil. Does not know Evil.",
			alignment: "evil",
			icon: VenetianMask,
			picked: false,
			pickFunc: () => toggleCharacter("oberon"),
			warnFunc: () => { return null }
		},
		{
			id: "morgana",
			name: "Morgana",
			description: "Appears as Merlin.",
			alignment: "evil",
			icon: Drama,
			picked: false,
			pickFunc: () => toggleCharacter("morgana"),
			warnFunc: () => {
				const merlin = characters.find(c => c.id === "merlin")
				const percival = characters.find(c => c.id === "percival")
				const self = characters.find(c => c.id === "morgana")
				if (!(merlin?.picked && percival?.picked) && self?.picked) return "Requires Merlin & Percival"
				return null;
			}
		},
		{
			id: "goodLancelot",
			name: "Lancelot",
			description: "Knows Evil Lancelot, or can switch allegiance.",
			alignment: "good",
			icon: Swords,
			picked: false,
			pickFunc: () => toggleCharacter("goodLancelot", "evilLancelot"),
			warnFunc: () => { return null }
		},
		{
			id: "evilLancelot",
			name: "Lancelot",
			description: "Knows Evil Lancelot, or can switch allegiance.",
			alignment: "evil",
			icon: Swords,
			picked: false,
			pickFunc: () => toggleCharacter("evilLancelot", "goodLancelot"),
			warnFunc: () => { return null }
		},
		{
			id: "lunatic",
			name: "Lunatic",
			description: "Must Fail every Quest.",
			alignment: "evil",
			icon: Shell,
			picked: false,
			pickFunc: () => toggleCharacter("lunatic"),
			warnFunc: () => { return null }
		},
		{
			id: "brute",
			name: "Brute",
			description: "May Fail only the frist three Quests.",
			alignment: "evil",
			icon: BicepsFlexed,
			picked: false,
			pickFunc: () => toggleCharacter("brute"),
			warnFunc: () => { return null }
		},
		{
			id: "revealer",
			name: "Revealer",
			description: "Reveals loyalty after second failed Quest.",
			alignment: "evil",
			icon: Blinds,
			picked: false,
			pickFunc: () => toggleCharacter("revealer"),
			warnFunc: () => { return null }
		},
		{
			id: "cleric",
			name: "Cleric",
			description: "Secretly investigates the first Leader.",
			alignment: "good",
			icon: UserSearch,
			picked: false,
			pickFunc: () => toggleCharacter("cleric"),
			warnFunc: () => { return null }
		},
		{
			id: "trickster",
			name: "Trickster",
			description: "May lie about loyalty.",
			alignment: "evil",
			icon: Shield,
			picked: false,
			pickFunc: () => toggleCharacter("trickster"),
			warnFunc: () => { return null }
		},
		{
			id: "troublemaker",
			name: "Troublemaker",
			description: "Must lie about loyalty.",
			alignment: "good",
			icon: ShieldAlert,
			picked: false,
			pickFunc: () => toggleCharacter("troublemaker"),
			warnFunc: () => { return null }
		},
		{
			id: "goodSorcerer",
			name: "Sorcerer",
			description: "May play Magic.",
			alignment: "good",
			icon: Sparkles,
			picked: false,
			pickFunc: () => toggleCharacter("goodSorcerer", "evilSorcerer"),
			warnFunc: () => { return null }
		},
		{
			id: "evilSorcerer",
			name: "Sorcerer",
			description: "May play Magic. May not play Fail.",
			alignment: "evil",
			icon: Sparkles,
			picked: false,
			pickFunc: () => toggleCharacter("evilSorcerer", "goodSorcerer"),
			warnFunc: () => { return null }
		},
		{
			id: "untrustworthyServant",
			name: "Untrustworthy Servant",
			description: "Appears Evil to Merlin. Knows the Assassin. Can become Evil during the Recruitment stage.",
			alignment: "good",
			icon: HandPlatter,
			picked: false,
			pickFunc: () => toggleCharacter("untrustworthyServant"),
			warnFunc: () => {
				const merlin = characters.find(c => c.id === "merlin")
				const assassin = characters.find(c => c.id === "assassin")
				const self = characters.find(c => c.id === "untrustworthyServant")
				if (!(merlin?.picked && assassin?.picked) && self?.picked) return "Requires Merlin & Assassin"
				return null;
			}
		},
		{
			id: "goodRouge",
			name: "Rouge",
			description: "May play Rogue Success.",
			alignment: "good",
			icon: Eye,
			picked: false,
			pickFunc: () => toggleCharacter("goodRouge"),
			warnFunc: () => { return null }
		},
		{
			id: "evilRouge",
			name: "Rouge",
			description: "May play Rogue Fail. Unknown to Evil. Does not know evil.",
			alignment: "evil",
			icon: Eye,
			picked: false,
			pickFunc: () => toggleCharacter("evilRouge"),
			warnFunc: () => { return null }
		},
		{
			id: "seniorMessenger",
			name: "Senior Messenger",
			description: "Knows Junior Messenger. May play Good Message.",
			alignment: "good",
			icon: PenTool,
			picked: false,
			pickFunc: () => toggleCharacter("seniorMessenger", "juniorMessenger", "evilMessenger"),
			warnFunc: () => { return null }
		},
		{
			id: "juniorMessenger",
			name: "Junior Messenger",
			description: "May play Good Message.",
			alignment: "good",
			icon: Feather,
			picked: false,
			pickFunc: () => toggleCharacter("juniorMessenger", "seniorMessenger", "evilMessenger"),
			warnFunc: () => { return null }
		},
		{
			id: "evilMessenger",
			name: "Messenger",
			description: "May play Evil Message.",
			alignment: "evil",
			icon: Feather,
			picked: false,
			pickFunc: () => toggleCharacter("evilMessenger", "seniorMessenger", "juniorMessenger"),
			warnFunc: () => { return null }
		}
	]);

	let modules: Module[] = $state([
		{
			id: "lancelotVariant",
			name: "Lancelot variant rules",
			description: "When playing with Lancelot variant rules, Evil Lancetlot does not get to see the evil team.",
			picked: false,
			pickFunc: () => toggleModule("lancelotVariant"),
			warnFunc: () => {
				const lancelot = characters.find(c => c.id === "goodLancelot")
				const self = modules.find(c => c.id === "lancelotVariant")
				if (!lancelot?.picked && self?.picked) return "Requires Lancelot"
				return null
			}
		},
		{
			id: "hiddenSorcerer",
			name: "Hidden evil sorcerer",
			description: "The Evil Sorcerer dose not reveal themself in the Reveal stage.",
			picked: false,
			pickFunc: () => toggleModule("hiddenSorcerer"),
			warnFunc: () => {
				const sorcerer = characters.find(c => c.id === "goodSorcerer")
				const self = modules.find(c => c.id === "hiddenSorcerer")
				if (!sorcerer?.picked && self?.picked) return "Requires Sorcerer"
				return null
			}
		}
	]);

	let playerCount = $state(5);
	let selectedRoles = $derived(characters.filter(c => c.picked));
	let goodCount = $derived(selectedRoles.filter(c => c.alignment === "good").length);
	let evilCount = $derived(selectedRoles.filter(c => c.alignment === "evil").length);

	function toggleCharacter(...ids: string[]) {
		if (ids.length === 0) return;

		const firstChar = characters.find(c => c.id === ids[0]);
		if (!firstChar) return;

		const newState = !firstChar.picked;

		ids.forEach(id => {
			const char = characters.find(c => c.id === id);
			if (char) {
				char.picked = newState;
			}
		});
	}

	function toggleModule(...ids: string[]) {
		if (ids.length === 0) return;

		const firstMod = modules.find(m => m.id === ids[0]);
		if (!firstMod) return;

		const newState = !firstMod.picked;

		ids.forEach(id => {
			const mod = modules.find(m => m.id === id);
			if (mod) {
				mod.picked = newState;
			}
		});
	}

	function getRecommendedTeamSizes(): { good: number; evil: number } {
		const recommendations: Record<number, { good: number; evil: number }> = {
			5: { good: 3, evil: 2 },
			6: { good: 4, evil: 2 },
			7: { good: 4, evil: 3 },
			8: { good: 5, evil: 3 },
			9: { good: 6, evil: 3 },
			10: { good: 6, evil: 4 }
		};
		return recommendations[playerCount] || { good: 0, evil: 0 };
	}

	let script = $derived.by(() => {
		const picked = characters.filter(c => c.picked);

		// Use IDs for more reliable character detection
		const hasCleric = picked.some(c => c.id === 'cleric');
		const hasMerlin = picked.some(c => c.id === 'merlin');
		const hasPercival = picked.some(c => c.id === 'percival');
		const hasMorgana = picked.some(c => c.id === 'morgana');
		const hasGoodLancelot = picked.some(c => c.id === 'goodLancelot');
		const hasEvilLancelot = picked.some(c => c.id === 'evilLancelot');
		const hasLancelot = hasGoodLancelot || hasEvilLancelot;
		const hasOberon = picked.some(c => c.id === 'oberon');
		const hasMordred = picked.some(c => c.id === 'mordred');
		const hasGoodSorcerer = picked.some(c => c.id === 'goodSorcerer');
		const hasEvilSorcerer = picked.some(c => c.id === 'evilSorcerer');
		const hasSorcerer = hasGoodSorcerer || hasEvilSorcerer;
		const hasUntrustworthyServant = picked.some(c => c.id === 'untrustworthyServant');

		const pickedModules = modules.filter(m => m.picked);
		const hasVariantLancelot = pickedModules.some(m => m.id === 'lancelotVariant');
		const hasHiddenSorcerer = pickedModules.some(m => m.id === 'hiddenSorcerer');

		const scriptLines: string[] = [];

		// Opening
		scriptLines.push("Everyone close your eyes and extend your hand into a fist in front of you");

		// Cleric phase
		if (hasCleric) {
			scriptLines.push(
				"Leader, extend your thumb if you are Evil",
				"Cleric, open your eyes",
				"Cleric, close your eyes",
				"Leader, re-form your hand into a fist"
			);
		}

		// Evil team revelation
		const evilExclusions: string[] = [];
		if (hasOberon) evilExclusions.push("not Oberon");
		if (hasLancelot && hasVariantLancelot) {
			scriptLines.push("Evil Lancelot, extend your thumb so that the other agents of Evil may know you");
			evilExclusions.push("not Evil Lancelot");
		}
		if (hasSorcerer && hasHiddenSorcerer) evilExclusions.push("not Evil Sorcerer");

		const evilExclusionText = evilExclusions.length > 0 ? ` - ${evilExclusions.join(", ")}` : "";
		scriptLines.push(
			`Minions of Mordred${evilExclusionText} - open your eyes and look around so that you know all agents of Evil`,
			"Minions of Mordred, close your eyes"
		);

		if (hasLancelot && hasVariantLancelot) {
			scriptLines.push("Evil Lancelot, re-form your hand into a fist");
		}

		// Merlin phase
		if (hasMerlin) {
			const merlinExclusions: string[] = [];
			if (hasMordred) merlinExclusions.push("not Mordred himself");

			const merlinReveals: string[] = ["Minions of Mordred"];
			if (hasUntrustworthyServant) merlinReveals.push("Untrustworthy Servant");

			const merlinExclusionText = merlinExclusions.length > 0 ? ` - ${merlinExclusions.join(", ")}` : "";
			const merlinRevealText = merlinReveals.join(" and ");

			scriptLines.push(
				`${merlinRevealText}${merlinExclusionText} - extend your thumb so that Merlin will know of you`,
				"Merlin, open your eyes and see the agents of Evil",
				`${merlinRevealText}, re-form your hand into a fist`,
				"Merlin, close your eyes"
			);
		}

		// Untrustworthy Servant phase
		if (hasUntrustworthyServant) {
			scriptLines.push(
				"Assassin, extend your thumb so that the Untrustworthy Servant may know you",
				"Untrustworthy Servant, open your eyes",
				"Untrustworthy Servant, close your eyes",
				"Assassin, re-form your hand into a fist"
			);
		}

		// Percival phase
		if (hasPercival) {
			const percivalSeesWho = hasMorgana ? "Merlin and Morgana" : "Merlin";
			scriptLines.push(
				`${percivalSeesWho}, extend your thumb so that Percival may know of you`,
				`Percival, open your eyes so you may know ${percivalSeesWho}`,
				`${percivalSeesWho}, re-form your hand into a fist`,
				"Percival, close your eyes"
			);
		}

		// Lancelot phase (non-variant)
		if (hasLancelot && !hasVariantLancelot) {
			scriptLines.push(
				"Lancelot, open your eyes to reveal your counterpart",
				"Lancelot, close your eyes"
			);
		}

		// Closing
		scriptLines.push("Everyone open your eyes");

		return scriptLines;
	});

	return {
		get characters() { return characters; },
		get modules() { return modules; },
		get playerCount() { return playerCount; },
		set playerCount(value: number) { playerCount = value; },
		get selectedRoles() { return selectedRoles; },
		get goodCount() { return goodCount; },
		get evilCount() { return evilCount; },
		get script() { return script },
		getRecommendedTeamSizes,
	};
}

export const gameStore = createGameStore();
export type { Character, Module, Setting };
