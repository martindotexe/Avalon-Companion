import type { Component } from 'svelte';
import {
	Telescope,
	Handshake,
	Swords,
	UserSearch,
	Sparkles,
	EyeClosed,
	VenetianMask,
	Drama,
	HandPlatter,
	PenTool,
	Feather
} from '@lucide/svelte'

export type Character = {
	name: string
	description: string
	alignment: "good" | "evil" | "other"
	picked: boolean
	enabledBy?: string
	icon: Component
}

export type Setting = {
	name: string,
	description: string,
	picked: boolean
}

function createGameStore() {
	let characters: Character[] = $state([
		{ name: "Merlin", description: "Knows Evil. Must remain hidden.", alignment: "good", picked: true, icon: Telescope },
		// { name: "Assassin", description: "May activate Assassination stage if three Quests succeed.", alignment: "evil", picked: true },
		{ name: "Percival", description: "Knows Merlin.", alignment: "good", picked: false, enabledBy: "Merlin", icon: Handshake },
		{ name: "Mordred", description: "Unknown to Merlin.", alignment: "evil", picked: false, enabledBy: "Merlin", icon: EyeClosed },
		{ name: "Oberon", description: "Unknown to Evil. Does not know Evil.", alignment: "evil", picked: false, icon: VenetianMask },
		{ name: "Morgana", description: "Appears as Merlin.", alignment: "evil", picked: false, enabledBy: "Percival", icon: Drama },
		{ name: "Lancelot", description: "Can switch allegiance. One added to each team.", alignment: "other", picked: false, icon: Swords },
		// { name: "Lunatic", description: "Must Fail every Quest.", alignment: "evil", picked: false },
		// { name: "Brute", description: "May Fail only the first three Quests.", alignment: "evil", picked: false },
		// { name: "Revealer", description: "Reveals loyalty after second failed Quest.", alignment: "evil", picked: false },
		{ name: "Cleric", description: "Secretly investigates the first Leader.", alignment: "good", picked: false, icon: UserSearch },
		// { name: "Trickster", description: "May lie about loyalty.", alignment: "evil", picked: false },
		// { name: "Troublemaker", description: "Must lie about loyalty.", alignment: "good", picked: false }
		{ name: "Sorcerer", description: "May play Magic. Evil can not play fail. One added to each team.", alignment: "other", picked: false, icon: Sparkles },
		{ name: "Untrustworthy Servant", description: "Appears Evil to Merlin. Knows the Assassin. Can become Evil during the Recruitment stage.", alignment: "good", picked: false, icon: HandPlatter }
	])

	let settings: Setting[] = $state([
		{ name: "Lancelot variant rules", description: "When playing with Lancelot variant rules, Evil Lancetlot does not get to see the evil team.", picked: false },
		{ name: "Hidden evil sorcerer", description: "The Evil Sorcerer dose not reveal themself in the Reveal stage.", picked: false }
	])

	return {
		get characters() {
			return characters
		},
		get settings() {
			return settings
		},
		toggleSetting(name: string) {
			const setting = settings.find(c => c.name === name)
			if (setting) {
				setting.picked = !setting.picked
			}
		},
		toggleCharacter(name: string) {
			const character = characters.find(c => c.name === name)
			if (character) {
				character.picked = !character.picked
			}
		},
		resetCharacters() {
			characters.forEach(c => c.picked = false)
		},
		get pickedCharacters() {
			return characters.filter(c => c.picked)
		},
		get goodCount() {
			return characters.filter(c => c.picked && c.alignment === "good").length
		},
		get evilCount() {
			return characters.filter(c => c.picked && c.alignment === "evil").length
		},
		get script() {
			const picked = characters.filter(c => c.picked)
			const hasCleric = picked.some(c => c.name === 'Cleric')
			const hasMerlin = picked.some(c => c.name === 'Merlin')
			const hasPercival = picked.some(c => c.name === 'Percival')
			const hasMorgana = picked.some(c => c.name === 'Morgana')
			const hasLancelot = picked.some(c => c.name === 'Lancelot')
			const hasOberon = picked.some(c => c.name === 'Oberon')
			const hasMordred = picked.some(c => c.name === 'Mordred')
			const hasSorcerer = picked.some(c => c.name === 'Sorcerer')
			const hasUntrustworthyServant = picked.some(c => c.name === "Untrustworthy Servant")

			const pickedSettings = settings.filter(s => s.picked)
			const hasVariantLancelot = pickedSettings.some(s => s.name === 'Lancelot variant rules')
			const hasHiddenSorcerer = pickedSettings.some(s => s.name === 'Hidden evil sorcerer')

			const script: string[] = [
				"Everyone close your eyes and extend your hand into a fist in front of you"
			]

			// Cleric
			if (hasCleric) {
				script.push(
					"Leader, extend your thumb if you are Evil",
					"Cleric, open your eyes",
					"Cleric, close your eyes",
					"Leader, re-form your hand into a fist",
				)
			}

			// Lancelot variant rules
			if (hasLancelot && hasVariantLancelot) {
				script.push(
					"Evil Lancelot, extend your thumb so that the other agents of Evil may know you"
				)
			}

			const oberonText = hasOberon ? " - not Oberon" : ""
			const lancelotVariantText = hasVariantLancelot ? " - not Evil Lancelot" : ""
			const hiddenSorcererText = hasSorcerer && hasHiddenSorcerer ? " - not Evil Sorcerer" : ""
			script.push(
				`Minions of Mordred${oberonText}${lancelotVariantText}${hiddenSorcererText} - open your eyes and look around so that you know all agents of Evil`,
				"Minions of Mordred, close your eyes",
			)

			// Lancelot variant rules
			if (hasLancelot && hasVariantLancelot) {
				script.push(
					"Evil Lancelot, re-form your hand into a fist"
				)
			}

			// Merlin
			if (hasMerlin) {
				const mordredText = hasMordred ? " - not Mordred himself" : ""
				const untrustworthyServantText = hasUntrustworthyServant ? " and Untrustworth Servant" : ""
				script.push(
					`Minions of Mordred${untrustworthyServantText}${mordredText} - extend your thumb so that Merlin will know of you`,
					"Merlin, open your eyes and see the agents of Evil",
					"Minions of Mordred, re-form your hand into a fist",
					"Merlin, close your eyes",
				)
			}

			// Untrustworthy Servant
			if (hasUntrustworthyServant) {
				script.push(
					"Assassin, extend your thumb so that the Untrustworthy Servant may know you",
					"Untrustworthy Servant, open your eyes",
					"Untrustworthy Servant, close your eyes",
					"Assassin, re-form your hand into a fist"
				)
			}

			// Percival
			if (hasPercival) {
				const merlinMorganaText = hasMorgana ? "Merlin & Morgana" : "Merlin"
				script.push(
					`${merlinMorganaText}, extend your thumb so that Percival may know of you`,
					`Percival, open your eyes so you may know ${merlinMorganaText}`,
					`${merlinMorganaText}, re-form your hand into a fist`,
					"Percival, close your eyes",
				)
			}

			// Lancelot
			if (hasLancelot && !hasVariantLancelot) {
				script.push(
					"Lancelot, open your eyes to reveal your counterpart",
					"Lancelot, close your eyes",
				)
			}

			script.push("Everyone open your eyes")

			return script
		}
	}
}

export const characterStore = createGameStore()

export const playerCounts = new Map<number, { good: number; evil: number }>([
	[5, { good: 3, evil: 2 }],
	[6, { good: 4, evil: 2 }],
	[7, { good: 4, evil: 3 }],
	[8, { good: 5, evil: 3 }],
	[9, { good: 6, evil: 3 }],
	[10, { good: 6, evil: 4 }]
])
