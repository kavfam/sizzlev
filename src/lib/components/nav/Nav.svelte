<script>
	import Vnav from './Vnav.svelte';
	import Hnav from './Hnav.svelte';
	import { getUserState, getSidebarState, toggleNav } from '$lib/signals/appSignals.svelte.js';

	let screenWidth = $state(0);
	let screenSwitch = $state(700);

	// Handle width changes manually
	const handleResize = () => {
		const loggedIn = getUserState()?.loggedIn || false;
		if (screenWidth > screenSwitch) {
			toggleNav(false);
		} else if (loggedIn) {
			toggleNav(true);
		}
	};
</script>

<svelte:window bind:innerWidth={screenWidth} on:resize={handleResize} on:load={handleResize} />
{#if screenWidth > screenSwitch}
	<Hnav />
{:else}
	<Vnav />
{/if}
