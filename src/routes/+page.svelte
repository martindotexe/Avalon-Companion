<script lang="ts">
	import '../app.css';
	import { gameStore } from '$lib/game.svelte';
	import CharacterPicker from '$lib/components/avalon/CharacterPicker.svelte';
	import ModulePicker from '$lib/components/avalon/ModulePicker.svelte';

	let goodTeam = $derived(() => {
		const counts = gameStore.getRecommendedTeamSizes();
		const pickedGood = gameStore.selectedRoles.filter((c) => c.alignment === 'good');
		const loyalServantsNeeded = counts.good - pickedGood.length;

		const loyalServants = Array.from({ length: Math.max(0, loyalServantsNeeded) }, () => ({
			name: 'Loyal Servant',
			description: 'A loyal servant of Arthur.',
			alignment: 'good' as const,
			picked: false
		}));

		return [...pickedGood, ...loyalServants];
	});

	let evilTeam = $derived(() => {
		const counts = gameStore.getRecommendedTeamSizes();
		const pickedEvil = gameStore.selectedRoles.filter((c) => c.alignment === 'evil');
		const minionsNeeded = counts.evil - pickedEvil.length;

		const minions = Array.from({ length: Math.max(0, minionsNeeded) }, () => ({
			name: 'Minion',
			description: 'A minion of Mordred.',
			alignment: 'evil' as const,
			picked: false
		}));

		return [...pickedEvil, ...minions];
	});

	let goodCharacters = $derived(gameStore.characters.filter((c) => c.alignment === 'good'));
	let evilCharacters = $derived(gameStore.characters.filter((c) => c.alignment === 'evil'));
</script>

<div class="min-h-screen bg-base-200">
	<div class="container mx-auto max-w-7xl px-4 py-8">
		<!-- Hero Section -->
		<div class="hero mb-8 rounded-box bg-base-100 shadow-xl">
			<div class="hero-content py-12 text-center">
				<div class="max-w-md">
					<h1
						class="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-5xl font-bold text-transparent"
					>
						Avalon
					</h1>
					<p class="py-6 text-base-content/70">
						Configure script by selecting characters and settings below
					</p>
				</div>
			</div>
		</div>

		<div class="mb-6 flex items-center gap-3">
			<h2 class="text-2xl font-bold">Game setup</h2>
		</div>

		<!-- Character Selection Section -->
		<div class="mb-8">
			<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<CharacterPicker title="Good" characters={goodCharacters} />

				<CharacterPicker title="Evil" characters={evilCharacters} />
			</div>
		</div>

		<!-- Module Section -->
		<div class="mb-8">
			<ModulePicker modules={gameStore.modules} />
		</div>

		<!-- Game Script Section -->
		<div class="mb-8">
			<div class="mb-6 flex items-center gap-3">
				<h2 class="text-2xl font-bold">Game Script</h2>
			</div>

			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<ol class="space-y-3">
						{#each gameStore.script as line, i}
							<li class="flex gap-3">
								<span class="mt-0.5 badge badge-ghost badge-sm">{i + 1}</span>
								<span class="flex-1">{line}</span>
							</li>
						{/each}
					</ol>
				</div>
			</div>
		</div>
	</div>
</div>
