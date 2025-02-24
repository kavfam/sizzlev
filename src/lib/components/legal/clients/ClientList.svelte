<!-- ClientList.svelte -->
<script>
	import {
		getClients,
		setSelectedClient,
		setMode,
		getMode,
		getSelectedClient,
		getStatusName,
		fetchClients
	} from '$lib/signals/clientSignals.svelte.js';
	import { browser } from '$app/environment';

	let filteredClients = $derived(() => {
		const allClients = getClients();
		return allClients; // Trust server fetch
	});
	function editClient(client) {
		setSelectedClient(client);
		setMode('edit');
		if (browser) {
			const row = document.getElementById(`client-${client.clientnumber}`);
			row?.scrollIntoView({ behavior: 'smooth' });
		}
	}

	$inspect('SelectedClient:', getSelectedClient());
</script>

<div class="client-list">
	<h3>Recent Clients</h3>
	<table>
		<thead>
			<tr>
				<th>Number</th>
				<th>Name</th>
				<th>Telephone</th>
				<th>Status Id</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each filteredClients() as client}
				<tr id={'client-' + client.clientnumber} class="client-row">
					<td>{client.clientnumber}</td>
					<td>{client.clientname}</td>
					<td>{client.telno}</td>
					<td>{getStatusName(client.statusid)}</td>
					<td>
						<button
							type="button"
							onclick={() => editClient(client)}
							aria-label={`Edit client ${client.clientname}`}
						>
							<i class="fas fa-edit"></i>
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.client-list {
		margin-top: 20px;
		padding: 15px;
		border: 1px solid #ccc;
		border-radius: 8px;
		background-color: #f0f8ff;
	}
	.client-list h3 {
		margin-bottom: 10px;
	}
	table {
		width: 100%;
		border-collapse: collapse;
	}
	th,
	td {
		padding: 8px;
		text-align: left;
		border-bottom: 1px solid #ddd;
	}
	th {
		background-color: #f2f2f2;
		font-weight: bold;
	}
	button {
		background: none;
		border: none;
		cursor: pointer;
		color: #007bff;
		font-size: 16px;
		margin-left: 10px;
	}
	button:hover {
		color: #0056b3;
	}
	button:focus {
		outline: none;
	}
	.archive {
		color: red;
	}
	.client-list h3 {
		margin-top: 5px;
		margin-bottom: 5px;
	}
</style>
