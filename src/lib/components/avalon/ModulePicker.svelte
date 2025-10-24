<script lang="ts">
	import type { Module } from '$lib/game.svelte';
	import { TriangleAlert } from '@lucide/svelte';

	let {
		modules
	}: {
		modules: Module[];
	} = $props();

	let checkedCount = $derived(modules.filter((c) => c.picked).length);
</script>

<div class="card bg-base-100 shadow-xl">
	<div class="card-body p-0">
		<!-- Header -->
		<div class="flex items-center justify-between border-b border-base-300 p-6 pb-4">
			<div class="flex items-center gap-3">
				<h3 class="text-xl font-bold">Modules</h3>
				<div class="badge badge-outline badge-lg">
					{checkedCount}/{modules.length}
				</div>
			</div>
		</div>

		<!-- Module List -->
		<ul class="menu w-full p-4">
			{#each modules as module}
				{@const warning = module.warnFunc()}
				<li class="w-full">
					<label
						class="flex w-full cursor-pointer items-center gap-5 rounded-lg p-4 transition-colors hover:bg-base-200"
					>
						<div class="min-w-0 flex-1">
							<div class="mb-1 flex items-center gap-2">
								<div class="text-base font-semibold">{module.name}</div>
								{#if warning}
									<div class="badge gap-1.5 badge-warning">
										<TriangleAlert class="h-3.5 w-3.5" />
										{warning}
									</div>
								{/if}
							</div>
							<div class="line-clamp-2 text-sm opacity-60">{module.description}</div>
						</div>

						<input
							type="checkbox"
							class="toggle toggle-lg"
							checked={module.picked}
							onchange={module.pickFunc}
						/>
					</label>
				</li>
			{/each}
		</ul>
	</div>
</div>
