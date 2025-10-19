<script lang="ts">
	import type { Character } from '$lib/characters.svelte';
	import CharacterCheckbox from './CharacterCheckbox.svelte';

	let {
		title,
		characters,
		onToggle
	}: {
		title: string;
		characters: Character[];
		onToggle: (name: string) => void;
	} = $props();
</script>

<div class="flex-1">
	<h2 class="mb-2 text-lg font-semibold">{title}</h2>
	<ul>
		{#each characters as character}
			<CharacterCheckbox {character} onToggle={() => onToggle(character.name)} />
		{/each}
	</ul>
</div>
