<script lang="ts">
	import '../app.css';
	import { characterStore, playerCounts } from '$lib/characters.svelte';
	import CharacterPicker from '$lib/components/avalon/CharacterPicker.svelte';

	let playerCount = $state(7);

	let goodTeam = $derived(() => {
		const counts = playerCounts.get(playerCount);
		if (!counts) return [];

		const pickedGood = characterStore.characters.filter((c) => c.alignment === 'good' && c.picked);
		const loyalServantsNeeded = counts.good - pickedGood.length;

		const loyalServants = Array.from({ length: Math.max(0, loyalServantsNeeded) }, () => ({
			name: 'Loyal Servant',
			description: 'A loyal servant of Arthur.',
			alignment: 'good' as const,
			picked: false
		}));

		return [...pickedGood, ...loyalServants];
	});

	let evilTeam = $derived(() => {
		const counts = playerCounts.get(playerCount);
		if (!counts) return [];

		const pickedEvil = characterStore.characters.filter((c) => c.alignment === 'evil' && c.picked);
		const minionsNeeded = counts.evil - pickedEvil.length;

		const minions = Array.from({ length: Math.max(0, minionsNeeded) }, () => ({
			name: 'Minion',
			description: 'A minion of Mordred.',
			alignment: 'evil' as const,
			picked: false
		}));

		return [...pickedEvil, ...minions];
	});

	let goodCharacters = $derived(
		characterStore.characters.filter((c) => c.alignment === 'good' || c.alignment === 'other')
	);
	let evilCharacters = $derived(
		characterStore.characters.filter((c) => c.alignment === 'evil' || c.alignment === 'other')
	);
</script>

<div class="container mx-auto max-w-7xl px-4 py-8">
	<h1 class="text-center">Welcome to Avalon</h1>
	<div class="divider"></div>

	<!-- Character Pickers - Stack on mobile, side by side on desktop -->
	<div class="flex w-full flex-col gap-4 lg:flex-row">
		<CharacterPicker
			title="Good"
			characters={goodCharacters}
			onToggle={(name) => characterStore.toggleCharacter(name)}
		/>

		<div class="divider lg:divider-horizontal"></div>

		<CharacterPicker
			title="Evil"
			characters={evilCharacters}
			onToggle={(name) => characterStore.toggleCharacter(name)}
		/>
	</div>

	<div class="divider"></div>

	<!-- Game Script -->
	<div class="w-full">
		<h2 class="mb-4 text-lg font-semibold">Game Script</h2>
		<ol class="list-decimal space-y-2 pl-6">
			{#each characterStore.script as line}
				<li class="text-sm">{line}</li>
			{/each}
		</ol>
	</div>
</div>
