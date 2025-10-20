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

<div class="flex-1">
	<ul class="list rounded-box bg-base-100 shadow-md">
		<li class="p-4 pb-2 text-xs tracking-wide opacity-60">
			{title}
		</li>
		{#each settings as setting}
			<li class="list-row">
				<div class="list-col-grow">
					<div class="font-semibold">{setting.name}</div>
					<div class="text-xs opacity-60">{setting.description}</div>
				</div>
				<input
					type="checkbox"
					class="toggle"
					checked={setting.picked}
					onchange={() => onToggle(setting.name)}
				/>
			</li>
		{/each}
	</ul>
</div>
