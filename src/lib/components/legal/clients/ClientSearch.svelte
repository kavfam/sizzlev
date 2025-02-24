<!-- ClientSearch.svelte -->
<script>
	import {
		setSelectedClient,
		getClients,
		fetchClients
	} from '$lib/signals/clientSignals.svelte.js';
	import { toggleAlert } from '$lib/signals/appSignals.svelte.js';

	let filterText = $state('');
	let searchClientNumber = $state('');
	let showSuggestions = $state(false);
	let searchResults = $state([]);

	async function searchByName() {
		const response = await fetch(`/api/legal?type=clients&name=${filterText}`);
		searchResults = await response.json();
		showSuggestions = searchResults.length > 0;
		if (!searchResults.length && filterText) {
			toggleAlert({
				alertMsg: `No clients found for "${filterText}"`,
				alertMode: 'alert',
				alertShow: true
			});
		}
	}

	function selectClient(client) {
		setSelectedClient(client);
		fetchClients({ fetch }, client.clientnumber); // Fetch selected + 9 prior
		filterText = '';
		searchClientNumber = '';
		showSuggestions = false;
	}

	async function searchByClientNumber() {
		const clientNum = Number(searchClientNumber);
		if (!clientNum) return;

		console.log('searchByClientNumber');
		await fetchClients({ fetch }, clientNum);

		const foundClient = getClients().find((c) => c.clientnumber === clientNum);
		setSelectedClient(foundClient || null);
		if (!foundClient) {
			toggleAlert({
				alertMsg: `Client ${clientNum} not found`,
				alertMode: 'alert',
				alertShow: true
			});
		}
		searchClientNumber = '';
		showSuggestions = false;
	}

	function handleCancel() {
		setSelectedClient(null);
		fetchClients({ fetch }); // Fetch latest 10
		filterText = '';
		searchClientNumber = '';
		showSuggestions = false;
	}
</script>

<div class="search-box">
	<label for="filterText">Search</label>
	<input type="text" id="filterText" bind:value={filterText} placeholder="Client name" />
	<button type="button" id="searchNameButton" onclick={searchByName} aria-label="Search by name">
		<i class="fas fa-search"></i>
	</button>
	<span>or</span>
	<input
		type="text"
		id="searchClientNumber"
		bind:value={searchClientNumber}
		placeholder="Client number"
	/>
	<button
		type="button"
		id="searchNumberButton"
		onclick={searchByClientNumber}
		aria-label="Search by number"
	>
		<i class="fas fa-search"></i>
	</button>
	<button type="button" id="cancelButton" onclick={handleCancel}>Clear</button>
</div>

{#if showSuggestions && searchResults.length > 0}
	{#each searchResults as client}
		<div
			class="client-entry"
			tabindex="0"
			role="button"
			aria-label="Select client {client.clientname}"
			aria-pressed="false"
			onclick={() => selectClient(client)}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') selectClient(client);
			}}
		>
			{client.clientname} : {client.clientnumber}
		</div>
	{/each}
{/if}

<style>
	.search-box {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 5px;
		padding: 5px;
		border: 1px solid #ccc;
		border-radius: 5px;
		background-color: #f0f8ff;
		white-space: nowrap;
	}
	input {
		width: auto;
		min-width: 150px;
	}
	button {
		white-space: nowrap;
	}
	input#filterText {
		width: 250px;
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
	input#searchClientNumber {
		width: 200px;
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	button#cancelButton {
		width: 50px;
		padding: 6px;
		background-color: #ff4d4d;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}
	.client-entry {
		display: block;
		padding: 8px;
		cursor: pointer;
		background: none;
		color: black;
		text-align: left;
		width: 100%;
		border-bottom: 1px solid #ccc;
	}
	.client-entry:hover,
	.client-entry:focus {
		background-color: #007bff;
		color: white;
		border-radius: 4px;
		outline: none;
	}

	button#searchNameButton,
	button#searchNumberButton {
		width: 40px;
		padding: 6px;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}
</style>
