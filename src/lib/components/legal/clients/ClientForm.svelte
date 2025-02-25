<!-- ClientForm.svelte -->
<script>
	import { setMode, getMode, getSelectedClient } from '$lib/signals/clientSignals.svelte.js';
	import ClientSearch from './ClientSearch.svelte';
	import ClientUpdate from './ClientUpdate.svelte';
	import ClientList from './ClientList.svelte';

	setMode(null);

	function handleAdd() {
		setMode('add');
		console.log('Mode set to:', getMode()); // Debug
	}
</script>

<div class="button-group">
	<button type="button" onclick={() => handleAdd()} disabled={getMode() !== null}>
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

<style>
	button {
		color: white;
		background-color: #28a745;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		padding: 10px 15px;
	}

	button:hover {
		opacity: 0.8;
		background-color: #218838;
	}

	button:disabled {
		background-color: #d3d3d3;
		color: #a9a9a9;
		cursor: not-allowed;
		opacity: 0.6;
	}

	button:active {
		opacity: 0.6;
	}

	button:focus {
		outline: 2px solid #0056b3;
	}
</style>
