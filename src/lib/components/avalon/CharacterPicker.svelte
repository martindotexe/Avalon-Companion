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
		<ul class="menu p-4">
			{#each characters as character}
				{@const Icon = character.icon}
				<li>
					<label
						class="flex cursor-pointer items-center gap-3 rounded-lg p-4 transition-colors hover:bg-base-200"
					>
						<div class="w-12">
							<Icon />
						</div>

						<div class="min-w-0 flex-1">
							<div class="text-base font-semibold">{character.name}</div>
							<div class="line-clamp-2 text-sm opacity-60">{character.description}</div>
						</div>

						<input
							type="checkbox"
							class="checkbox checkbox-lg"
							checked={character.picked}
							onchange={() => onToggle(character.name)}
						/>
					</label>
				</li>
			{/each}
		</ul>
	</div>
</div>
