<script lang="ts">
	import type { Setting } from '$lib/characters.svelte';

	let {
		title,
		settings,
		onToggle
	}: {
		title: string;
		settings: Setting[];
		onToggle: (name: string) => void;
	} = $props();

	let checkedCount = $derived(settings.filter((c) => c.picked).length);
</script>

<div class="card bg-base-100 shadow-xl">
	<div class="card-body p-0">
		<!-- Header -->
		<div class="flex items-center justify-between border-b border-base-300 p-6 pb-4">
			<div class="flex items-center gap-3">
				<h3 class="text-xl font-bold">{title}</h3>
				<div class="badge badge-outline badge-lg">
					{checkedCount} active
				</div>
			</div>
		</div>

		<!-- Settings List -->
		<ul class="menu p-4">
			{#each settings as setting}
				<li>
					<label
						class="flex cursor-pointer items-center gap-4 rounded-lg p-4 transition-colors hover:bg-base-200"
					>
						<div class="min-w-0 flex-1">
							<div class="text-base font-semibold">{setting.name}</div>
							<div class="text-sm opacity-60">{setting.description}</div>
						</div>

						<input
							type="checkbox"
							class="toggle toggle-lg"
							checked={setting.picked}
							onchange={() => onToggle(setting.name)}
						/>
					</label>
				</li>
			{/each}
		</ul>
	</div>
</div>
