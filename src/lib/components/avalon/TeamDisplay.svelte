<script lang="ts">
	import type { Character } from '$lib/characters.svelte';

	let { title, team, count }: { title: string; team: Character[]; count: number } = $props();
</script>

<div class="flex-1">
	<ul class="list rounded-box bg-base-100 shadow-md">
		<li class="p-4 pb-2 text-xs tracking-wide opacity-60">{title} ({count})</li>
		{#each team as character, index}
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
