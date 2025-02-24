<script>
	import '../app.css';
	import Nav from '$lib/components/Nav/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Sidebar from '$lib/components/Nav/Sidebar.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import { getSidebarState, getAlertState } from '$lib/signals/appSignals.svelte';
	import { getUserState, setUserState } from '$lib/signals/appSignals.svelte.js';
	import { browser } from '$app/environment';

	if (browser && document.cookie.includes('session=') && !getUserState().loggedIn) {
		setUserState({ ...getUserState(), loggedIn: true });
	}

	// state
	let { children } = $props();

	$effect(() => {
		if (browser && document.cookie.includes('session=') && !getUserState().loggedIn) {
			setUserState({ ...getUserState(), loggedIn: true });
		}
	});

	// $inspect('Layout: sidebar.isOpen=', getSidebarState().isOpen);
</script>

<div class="app">
	<Nav />
	{#if getSidebarState().isOpen}
		<Sidebar />
	{/if}
	{#if getAlertState().alertShow}
		<Alert />
	{/if}
	{@render children()}
	<Footer />
</div>
