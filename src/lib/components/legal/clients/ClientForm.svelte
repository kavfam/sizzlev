<!-- ClientForm.svelte -->
<!-- ClientForm.svelte -->
<script>
	import { setMode, getMode, getSelectedClient } from '$lib/signals/clientSignals.svelte.js';
	import ClientSearch from './ClientSearch.svelte';
	import ClientUpdate from './ClientUpdate.svelte';
	import ClientList from './ClientList.svelte';

	setMode(null);

	function handleAdd() {
		setMode('add'); // Ensure mode sticks
		console.log('Mode set to:', getMode()); // Debug
	}
</script>

<div class="button-group">
	<button type="button" onclick={() => handleAdd} disabled={getMode() !== null}>
		Add Client
	</button>
</div>

{#if getMode() !== 'add' && getMode() !== 'edit'}
	<ClientSearch />
{/if}

{#if getMode() === 'add' || (getMode() === 'edit' && getSelectedClient())}
	<ClientUpdate />
{:else}
	<ClientList />
{/if}
