<script>
	import {
		updateClient,
		setMode,
		getMode,
		getSelectedClient,
		setSelectedClient,
		fetchClients,
		getStatuses,
		getResetClient
	} from '$lib/signals/clientSignals.svelte.js';
	import { toggleAlert } from '$lib/signals/appSignals.svelte.js';

	let client = $state(
		getMode() === 'edit' && getSelectedClient() ? { ...getSelectedClient() } : getResetClient()
	);

	let isAddable = $derived(() => {
		return (
			client.clientname?.trim().length > 0 &&
			client.address?.trim().length > 0 &&
			client.telno?.trim().length > 0
		);
	});

	async function handleSubmit(event) {
		event.preventDefault();
		const data = {
			clientName: client.clientname,
			clientNumber: client.clientnumber,
			address: client.address,
			telNo: client.telno,
			statusid: client.statusid
		};
		let result;
		if (getMode() === 'add') {
			result = await updateClient(data, 'add');
			if (result?.clientnumber) {
				data.clientNumber = result.clientnumber;
				client.clientnumber = result.clientnumber;
			}
		} else {
			result = await updateClient(data, 'update');
		}
		if (result) {
			setSelectedClient({
				...data,
				clientnumber: data.clientNumber,
				clientname: data.clientName,
				telno: data.telNo
			});
			fetchClients({ fetch }, data.clientNumber); // Fetch updated list
			toggleAlert({ alertMsg: 'Client successfully saved!', alertMode: 'inform', alertShow: true });
		} else {
			toggleAlert({ alertMsg: 'Failed to save client data!', alertMode: 'alert', alertShow: true });
		}
		resetForm();
	}

	function resetForm() {
		client = getResetClient();
		setMode(null);
	}
</script>

<div class="section-box">
	<form onsubmit={handleSubmit}>
		<div class="form-group">
			<label for="clientName">Client Name:</label>
			<input type="text" id="clientName" bind:value={client.clientname} required />
		</div>
		<div class="form-group">
			<label for="clientNumber">Client Number:</label>
			<input
				type="text"
				id="clientNumber"
				value={getMode() === 'add' ? 'Assigned on save' : client.clientnumber}
				readonly
			/>
		</div>
		<div class="form-group">
			<label for="address">Address:</label>
			<input type="text" id="address" bind:value={client.address} required />
		</div>
		<div class="form-group">
			<label for="telNo">Telephone Number:</label>
			<input type="text" id="telNo" bind:value={client.telno} required />
		</div>
		<div class="form-group">
			<label for="status">Status:</label>
			{#if getMode() === 'edit'}
				<select id="status" bind:value={client.statusid}>
					{#each getStatuses() as status}
						<option value={status.id}>{status.statusname}</option>
					{/each}
				</select>
			{:else}
				<input type="text" id="status" value="current" readonly />
			{/if}
		</div>
		<div class="form-actions">
			<button type="submit" disabled={!isAddable()}>
				{getMode() === 'add' ? 'Save Client' : 'Update Client'}
			</button>
			<button type="button" onclick={() => resetForm()}>Cancel</button>
		</div>
	</form>
</div>

<style>
	.section-box {
		border: 1px solid #ccc;
		padding: 15px;
		border-radius: 8px;
		background-color: #f0f8ff;
		max-width: 600px;
		z-index: 1;
	}
	.form-group {
		display: grid;
		grid-template-columns: 120px 1fr;
		align-items: center;
		gap: 10px;
		margin-bottom: 10px;
	}
	input {
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 4px;
		width: 90%;
		box-sizing: border-box;
	}
	select {
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 4px;
		width: 90%;
		box-sizing: border-box;
	}
	button {
		background-color: #28a745;
		color: white;
		border: none;
		border-radius: 4px;
		padding: 10px 15px;
		cursor: pointer;
	}
	button:hover {
		background-color: #218838;
	}
	button[type='button'] {
		background-color: red;
		color: white;
	}
	button:disabled {
		background-color: #d3d3d3;
		color: #a9a9a9;
		cursor: not-allowed;
		opacity: 0.6;
	}
	.form-actions {
		display: flex;
		gap: 10px;
	}
	input[readonly] {
		background-color: #f0f0f0;
		cursor: not-allowed;
	}
</style>
