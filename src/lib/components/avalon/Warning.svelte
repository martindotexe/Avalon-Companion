<script lang="ts">
	import { TriangleAlert } from '@lucide/svelte';

	let { warning }: { warning: string } = $props();
</script>

<div class="badge gap-1.5 badge-warning">
	<TriangleAlert class="h-3.5 w-3.5 flex-shrink-0" />
	<span class="hidden sm:inline">{warning}</span>
</div>
