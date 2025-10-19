<script lang="ts">
	import '../app.css';
	import { characterStore, playerCounts } from '$lib/characters.svelte';

	let playerCount = $state(7);

	// Computed property to get the filled team lists
	let goodTeam = $derived(() => {
		const counts = playerCounts.get(playerCount);
		if (!counts) return [];

		const pickedGood = characterStore.characters.filter((c) => !c.evil && c.picked);
		const loyalServantsNeeded = counts.good - pickedGood.length;

		const loyalServants = Array.from({ length: Math.max(0, loyalServantsNeeded) }, () => ({
			name: 'Loyal Servant',
			description: 'A loyal servant of Arthur.',
			evil: false,
			picked: false
		}));

		return [...pickedGood, ...loyalServants];
	});

	let evilTeam = $derived(() => {
		const counts = playerCounts.get(playerCount);
		if (!counts) return [];

		const pickedEvil = characterStore.characters.filter((c) => c.evil && c.picked);
		const minionsNeeded = counts.evil - pickedEvil.length;

		const minions = Array.from({ length: Math.max(0, minionsNeeded) }, () => ({
			name: 'Minion',
			description: 'A minion of Mordred.',
			evil: true,
			picked: false
		}));

		return [...pickedEvil, ...minions];
	});

	// Split characters by alignment
	let goodCharacters = $derived(characterStore.characters.filter((c) => !c.evil));
	let evilCharacters = $derived(characterStore.characters.filter((c) => c.evil));
</script>

<h1>Welcome to Avalon</h1>
<div class="divider"></div>

<p>{playerCount}</p>
<div class="w-full max-w-xs">
	<input bind:value={playerCount} type="range" min="5" max="10" class="range" step="1" />
	<div class="mt-2 flex justify-between px-2.5 text-xs">
		<span>5</span>
		<span>6</span>
		<span>7</span>
		<span>8</span>
		<span>9</span>
		<span>10</span>
	</div>
</div>

<div class="divider"></div>
<div class="flex w-full gap-4">
	<div class="flex-1">
		<h2 class="mb-2 text-lg font-semibold">Good Characters</h2>
		<ul>
			{#each goodCharacters as character}
				<li>
					<label class="label">
						<input
							type="checkbox"
							checked={character.picked}
							onchange={() => characterStore.toggleCharacter(character.name)}
							class="checkbox"
						/>
						{character.name}
					</label>
				</li>
			{/each}
		</ul>
	</div>
	<div class="divider divider-horizontal"></div>
	<div class="flex-1">
		<h2 class="mb-2 text-lg font-semibold">Evil Characters</h2>
		<ul>
			{#each evilCharacters as character}
				<li>
					<label class="label">
						<input
							type="checkbox"
							checked={character.picked}
							onchange={() => characterStore.toggleCharacter(character.name)}
							class="checkbox"
						/>
						{character.name}
					</label>
				</li>
			{/each}
		</ul>
	</div>
	<div class="divider divider-horizontal"></div>
	<div class="flex-1">
		<h2 class="mb-2 text-lg font-semibold">Other Characters</h2>
		<ul></ul>
	</div>
</div>

<div class="divider"></div>

<div class="flex w-full">
	<div class="flex-1">
		<ul class="list rounded-box bg-base-100 shadow-md">
			<li class="p-4 pb-2 text-xs tracking-wide opacity-60">Good ({goodTeam().length})</li>
			{#each goodTeam() as character, index}
				<li class="list-row">
					<div class="text-4xl font-thin tabular-nums opacity-30">
						{index + 1}
					</div>
					<div class="list-col-grow">
						<div class="font-semibold">{character.name}</div>
						<div class="text-xs opacity-60">{character.description}</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
	<div class="divider divider-horizontal"></div>
	<div class="flex-1">
		<ul class="list rounded-box bg-base-100 shadow-md">
			<li class="p-4 pb-2 text-xs tracking-wide opacity-60">Evil ({evilTeam().length})</li>
			{#each evilTeam() as character, index}
				<li class="list-row">
					<div class="text-4xl font-thin tabular-nums opacity-30">
						{index + 1}
					</div>
					<div class="list-col-grow">
						<div class="font-semibold">{character.name}</div>
						<div class="text-xs opacity-60">{character.description}</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>
