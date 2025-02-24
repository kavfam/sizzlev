<script>
	import { getUserState, logoutUser, toggleNav } from '$lib/signals/appSignals.svelte.js';
	import { goto } from '$app/navigation';

	function handleLogout() {
		logoutUser();
		goto('/');
		toggleNav(false); // Close sidebar on logout
	}
</script>

{#if getUserState().loggedIn}
	<button class="logout-btn" onclick={handleLogout} type="button" aria-label="Log out">
		logout
	</button>
{:else}
	<!-- close sidebar on login click -->
	<a href="/login" onclick={() => toggleNav(false)}> Login </a>
{/if}
