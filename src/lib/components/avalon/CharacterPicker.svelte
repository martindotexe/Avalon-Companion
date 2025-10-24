<script lang="ts">
	import type { Character } from '$lib/game.svelte';
	import Warning from '$lib/components/avalon/Warning.svelte';

	let {
		title,
		characters,
		type
	}: {
		title: string;
		characters: Character[];
		type: 'good' | 'evil';
	} = $props();

	let checkedCount = $derived(characters.filter((c) => c.picked).length);
	let borderClass = $derived(type === 'good' ? 'border-success' : 'border-error');
</script>

<div class="card bg-base-100 shadow-xl">
	<div class="card-body p-0">
		<!-- Header -->
		<div class="flex items-center justify-between border-b border-base-300 p-6 pb-4">
			<div class="flex items-center gap-3">
				<h3 class="text-xl font-bold">{title} Characters</h3>
				<div class="badge badge-outline badge-lg">
					{checkedCount}/{characters.length}
				</div>
			</div>
		</div>

		<!-- Character List -->
		<ul class="menu w-full space-y-2 p-4">
			{#each characters as character}
				{@const Icon = character.icon}
				{@const warning = character.warnFunc()}
				<li class="w-full">
					<button
						class="flex w-full cursor-pointer items-center gap-5 rounded-lg p-4 transition-all {character.picked
							? `border-2 ${borderClass}`
							: 'border-2 border-transparent hover:bg-base-200'}"
						onclick={character.pickFunc}
					>
						<Icon class="h-8 w-8" />

						<div class="min-w-0 flex-1">
							<div class="mb-1 flex items-center gap-2">
								<div class="text-base font-semibold">{character.name}</div>
								{#if warning}
									<Warning {warning} />
								{/if}
							</div>
							<div class="line-clamp-2 text-sm opacity-60">{character.description}</div>
						</div>
					</button>
				</li>
			{/each}
		</ul>
	</div>
</div>
