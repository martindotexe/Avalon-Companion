<script lang="ts">
	import type { Character } from '$lib/characters.svelte';

	let { character, onToggle }: { character: Character; onToggle: () => void } = $props();
</script>

<li>
	<label class="label">
		<input type="checkbox" checked={character.picked} onchange={onToggle} class="checkbox" />
		{character.name}
	</label>
</li>
