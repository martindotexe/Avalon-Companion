export type Character = {
	name: string
	description: string
	evil: boolean
	picked: boolean
	enabledBy?: string
	special?: 'lancelot'
}

function createCharacterStore() {
	let characters: Character[] = $state([
		{ name: "Assassin", description: "May activate Assassination stage if three Quests succeed.", evil: true, picked: true },
		{ name: "Brute", description: "May Fail only the first three Quests.", evil: true, picked: false },
		{ name: "Cleric", description: "Secretly investigates the first Leader.", evil: false, picked: false },
		{ name: "Lancelot", description: "Can switch allegiance. One added to each team.", evil: false, picked: false, special: 'lancelot' },
		{ name: "Lunatic", description: "Must Fail every Quest.", evil: true, picked: false },
		{ name: "Merlin", description: "Knows Evil. Must remain hidden.", evil: false, picked: true },
		{ name: "Mordred", description: "Unknown to Merlin.", evil: true, picked: false, enabledBy: "Merlin" },
		{ name: "Morgana", description: "Appears as Merlin.", evil: true, picked: false, enabledBy: "Percival" },
		{ name: "Oberon", description: "Unknown to Evil. Does not know Evil.", evil: true, picked: false },
		{ name: "Percival", description: "Knows Merlin.", evil: false, picked: false, enabledBy: "Merlin" },
		{ name: "Revealer", description: "Reveals loyalty after second failed Quest.", evil: true, picked: false },
		{ name: "Trickster", description: "May lie about loyalty.", evil: true, picked: false },
		{ name: "Troublemaker", description: "Must lie about loyalty.", evil: false, picked: false }
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
			return characters.filter(c => c.picked && !c.evil).length
		},
		get evilCount() {
			return characters.filter(c => c.picked && c.evil).length
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
