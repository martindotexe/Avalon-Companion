<script lang="ts">
	import '../app.css';
	import { characterStore, playerCounts } from '$lib/characters.svelte';
	import PlayerCountSlider from '$lib/components/avalon/PlayerCountSlider.svelte';
	import CharacterList from '$lib/components/avalon/CharacterList.svelte';
	import TeamDisplay from '$lib/components/avalon/TeamDisplay.svelte';

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

	let goodCharacters = $derived(characterStore.characters.filter((c) => c.alignment === 'good'));
	let evilCharacters = $derived(characterStore.characters.filter((c) => c.alignment === 'evil'));
	let otherCharacters = $derived(characterStore.characters.filter((c) => c.alignment === 'other'));
</script>

<h1>Welcome to Avalon</h1>
<div class="divider"></div>

<p>{playerCount}</p>
<PlayerCountSlider bind:playerCount />

<div class="divider"></div>
<div class="flex w-full gap-4">
	<CharacterList
		title="Good Characters"
		characters={goodCharacters}
		onToggle={(name) => characterStore.toggleCharacter(name)}
	/>
	<div class="divider divider-horizontal"></div>
	<CharacterList
		title="Evil Characters"
		characters={evilCharacters}
		onToggle={(name) => characterStore.toggleCharacter(name)}
	/>
	<div class="divider divider-horizontal"></div>
	<CharacterList
		title="Other Characters"
		characters={otherCharacters}
		onToggle={(name) => characterStore.toggleCharacter(name)}
	/>
</div>

<!-- <div class="divider"></div> -->

<!-- <div class="flex w-full"> -->
<!-- 	<TeamDisplay title="Good" team={goodTeam()} count={goodTeam().length} /> -->
<!-- 	<div class="divider divider-horizontal"></div> -->
<!-- 	<TeamDisplay title="Evil" team={evilTeam()} count={evilTeam().length} /> -->
<!-- </div> -->

<div class="divider"></div>

<div class="w-full max-w-2xl">
	<h2 class="mb-4 text-lg font-semibold">Game Script</h2>
	<ol class="list-decimal space-y-2 pl-6">
		{#each characterStore.script as line, index}
			<li class="text-sm">{line}</li>
		{/each}
	</ol>
</div>
