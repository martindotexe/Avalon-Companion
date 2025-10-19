export type Character = {
	name: string
	description: string
	alignment: "good" | "evil" | "other"
	picked: boolean
	enabledBy?: string
}

function createCharacterStore() {
	let characters: Character[] = $state([
		{ name: "Assassin", description: "May activate Assassination stage if three Quests succeed.", alignment: "evil", picked: true },
		{ name: "Brute", description: "May Fail only the first three Quests.", alignment: "evil", picked: false },
		{ name: "Cleric", description: "Secretly investigates the first Leader.", alignment: "good", picked: false },
		{ name: "Lancelot", description: "Can switch allegiance. One added to each team.", alignment: "other", picked: false },
		{ name: "Lunatic", description: "Must Fail every Quest.", alignment: "evil", picked: false },
		{ name: "Merlin", description: "Knows Evil. Must remain hidden.", alignment: "good", picked: true },
		{ name: "Mordred", description: "Unknown to Merlin.", alignment: "evil", picked: false, enabledBy: "Merlin" },
		{ name: "Morgana", description: "Appears as Merlin.", alignment: "evil", picked: false, enabledBy: "Percival" },
		{ name: "Oberon", description: "Unknown to Evil. Does not know Evil.", alignment: "evil", picked: false },
		{ name: "Percival", description: "Knows Merlin.", alignment: "good", picked: false, enabledBy: "Merlin" },
		{ name: "Revealer", description: "Reveals loyalty after second failed Quest.", alignment: "evil", picked: false },
		{ name: "Trickster", description: "May lie about loyalty.", alignment: "evil", picked: false },
		{ name: "Troublemaker", description: "Must lie about loyalty.", alignment: "good", picked: false }
	])

	return {
		get characters() {
			return characters
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

			const oberonText = hasOberon ? " - not Oberon" : ""
			script.push(
				`Minions of Mordred${oberonText} - open your eyes and look around so that you know all agents of Evil`,
				"Minions of Mordred, close your eyes",
			)

			// Merlin
			if (hasMerlin) {
				const mordredText = hasMordred ? " - not Mordred himself" : ""
				script.push(
					`Minions of Mordred${mordredText} - extend your thumb so that Merlin will know of you`,
					"Merlin, open your eyes and see the agents of Evil",
					"Minions of Mordred, re-form your hand into a fist",
					"Merlin, close your eyes",
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
			if (hasLancelot) {
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

export const characterStore = createCharacterStore()

export const playerCounts = new Map<number, { good: number; evil: number }>([
	[5, { good: 3, evil: 2 }],
	[6, { good: 4, evil: 2 }],
	[7, { good: 4, evil: 3 }],
	[8, { good: 5, evil: 3 }],
	[9, { good: 6, evil: 3 }],
	[10, { good: 6, evil: 4 }]
])
