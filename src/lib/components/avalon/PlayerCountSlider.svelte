<script lang="ts">
	let { playerCount = $bindable(7) } = $props();
</script>

<div class="w-full max-w-xs">
	<input bind:value={playerCount} type="range" min="5" max="10" class="range" step="1" />
	<div class="mt-2 flex justify-between px-2.5 text-xs">
		<span>5</span>
		<span>6</span>
		<span>7</span>
		<span>8</span>
		<span>9</span>
		<span>10</span>
	</div>
</div>
