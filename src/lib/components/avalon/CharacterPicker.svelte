<script lang="ts">
	import type { Character } from '$lib/characters.svelte';

	let {
		title,
		characters,
		onToggle
	}: {
		title: string;
		characters: Character[];
		onToggle: (name: string) => void;
	} = $props();

	let checkedCount = $derived(characters.filter((c) => c.picked).length);
</script>

<div class="flex-1">
	<ul class="list rounded-box bg-base-100 shadow-md">
		<li class="p-4 pb-2 text-xs tracking-wide opacity-60">
			{title} ({checkedCount}/{characters.length})
		</li>
		{#each characters as character}
			<li class="list-row">
				<div>
					<svelte:component this={character.icon} />
				</div>
				<div class="list-col-grow">
					<div class="font-semibold">{character.name}</div>
					<div class="text-xs opacity-60">{character.description}</div>
				</div>
				<input
					type="checkbox"
					class="toggle"
					checked={character.picked}
					onchange={() => onToggle(character.name)}
				/>
			</li>
		{/each}
	</ul>
</div>
