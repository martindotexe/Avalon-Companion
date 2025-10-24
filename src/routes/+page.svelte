<script lang="ts">
	import '../app.css';
	import { gameStore } from '$lib/game.svelte';
	import CharacterPicker from '$lib/components/avalon/CharacterPicker.svelte';
	import ModulePicker from '$lib/components/avalon/ModulePicker.svelte';
	import Warning from '$lib/components/avalon/Warning.svelte';
	import { TriangleAlert, CircleCheckBig } from '@lucide/svelte';

	let goodCharacters = $derived(gameStore.characters.filter((c) => c.alignment === 'good'));
	let evilCharacters = $derived(gameStore.characters.filter((c) => c.alignment === 'evil'));

	let characterWarnings = $derived(
		gameStore.characters
			.map((c) => {
				const warning = c.warnFunc();
				return warning ? `${c.name}: ${warning}` : null;
			})
			.filter((w) => w !== null)
	);

	let settingsWarnings = $derived(
		gameStore.modules
			.map((m) => {
				const warning = m.warnFunc();
				return warning ? `${m.name}: ${warning}` : null;
			})
			.filter((w) => w !== null)
	);

	let hasWarnings = $derived(characterWarnings.length > 0 || settingsWarnings.length > 0);
</script>

<div class="min-h-screen bg-base-200">
	<div class="container mx-auto max-w-7xl px-4 py-12">
		<!-- Header -->
		<div class="mb-16">
			<div class="mb-12 text-center">
				<h1 class="mb-4 text-6xl font-bold tracking-tight">Avalon: Big Box</h1>
				<p class="mx-auto max-w-2xl text-xl text-base-content/80">
					Craft the perfect game of deception, deduction, and betrayal. Choose your roles, enable
					epic expansions, and let the battle between good and evil begin.
				</p>
			</div>

			<!-- Player Count Slider -->
			<div class="mx-auto max-w-2xl">
				<div class="card bg-base-100 shadow-xl">
					<div class="card-body">
						<h3 class="mb-6 text-center text-lg font-bold">Player Count</h3>
						<div class="mx-auto mb-8 w-full max-w-xs">
							<input
								type="range"
								min="5"
								max="10"
								bind:value={gameStore.playerCount}
								class="range range-primary"
								step="1"
							/>
							<div class="mt-2 flex justify-between px-2.5 text-xs">
								<span>5</span>
								<span>6</span>
								<span>7</span>
								<span>8</span>
								<span>9</span>
								<span>10</span>
							</div>
						</div>
						<!-- Team Stats -->
						<div class="stats w-full stats-horizontal">
							<div class="stat place-items-center">
								<div class="stat-title">Good Team</div>
								<div class="stat-value text-success">
									{gameStore.getRecommendedTeamSizes().good}
								</div>
							</div>
							<div class="stat place-items-center">
								<div class="stat-title">Evil Team</div>
								<div class="stat-value text-error">{gameStore.getRecommendedTeamSizes().evil}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Character Selection Section -->
		<div class="mb-12">
			<h2 class="mb-6 text-2xl font-bold">Characters</h2>
			<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<CharacterPicker title="Good" characters={goodCharacters} type="good" />
				<CharacterPicker title="Evil" characters={evilCharacters} type="evil" />
			</div>
		</div>

		<!-- Module Section -->
		<div class="mb-12">
			<h2 class="mb-6 text-2xl font-bold">Modules</h2>
			<ModulePicker modules={gameStore.modules} />
		</div>

		<!-- Configuration Status Section -->
		<div class="mb-12">
			<h2 class="mb-6 text-2xl font-bold">Configuration Status</h2>
			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					{#if hasWarnings}
						<!-- Character Warnings -->
						{#if characterWarnings.length > 0}
							<div class="mb-6">
								<h3 class="mb-3 text-lg font-semibold">Character Issues</h3>
								<div class="space-y-3">
									{#each characterWarnings as warning}
										<div
											class="flex items-center gap-3 rounded-lg border-l-4 border-warning bg-warning/10 p-4"
										>
											<TriangleAlert class="h-5 w-5 flex-shrink-0 text-warning" />
											<span class="text-sm">{warning}</span>
										</div>
									{/each}
								</div>
							</div>
						{/if}

						<!-- Settings Warnings -->
						{#if settingsWarnings.length > 0}
							<div>
								<h3 class="mb-3 text-lg font-semibold">Module Issues</h3>
								<div class="space-y-3">
									{#each settingsWarnings as warning}
										<div
											class="flex items-center gap-3 rounded-lg border-l-4 border-warning bg-warning/10 p-4"
										>
											<TriangleAlert class="h-5 w-5 flex-shrink-0 text-warning" />
											<span class="text-sm">{warning}</span>
										</div>
									{/each}
								</div>
							</div>
						{/if}
					{:else}
						<div
							class="flex items-center gap-3 rounded-lg border-l-4 border-success bg-success/10 p-4"
						>
							<CircleCheckBig class="h-5 w-5 flex-shrink-0 text-success" />
							<span class="text-sm">Configuration has no warnings! Ready to start the game.</span>
						</div>
					{/if}
				</div>
			</div>
		</div>

		<!-- Game Script Section -->
		<div class="mb-12">
			<h2 class="mb-6 text-2xl font-bold">Game Script</h2>
			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<div class="overflow-x-auto">
						<table class="table">
							<thead>
								<tr>
									<th class="w-16">#</th>
									<th>Instruction</th>
								</tr>
							</thead>
							<tbody>
								{#each gameStore.script as line, i}
									<tr>
										<td class="font-mono text-base-content/60">{i + 1}</td>
										<td>{line}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
