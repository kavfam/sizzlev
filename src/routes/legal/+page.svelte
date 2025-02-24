<!-- routes/legal/+page.svelte -->
<script>
	import ClientForm from '$lib/components/legal/clients/ClientForm.svelte';
	import { fetchClients, fetchInitialData } from '$lib/signals/clientSignals.svelte.js';
	import { getUserState } from '$lib/signals/appSignals.svelte.js';
	import { page } from '$app/stores';

	let type = $state('clients');
	$effect(() => {
		type = $page.url.searchParams.get('type') || 'clients';
		if (getUserState().loggedIn) {
			fetchInitialData({ fetch });
		}
	});
</script>

<h1>{type.charAt(0).toUpperCase() + type.slice(1)}</h1>
{#if type === 'clients'}
	<ClientForm />
{/if}
