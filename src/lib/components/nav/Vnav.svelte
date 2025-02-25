<script>
	import {
		toggleNav,
		getSidebarState,
		getUserState,
		logoutUser
	} from '$lib/signals/appSignals.svelte';
	import links from '$lib/links';
</script>

<nav class="navbar">
	<div class="nav-center">
		<button
			class="btn-sidebar-toggle"
			onclick={() => toggleNav(!getSidebarState().isOpen)}
			aria-label="Toggle navigation"
		>
			<i class="fas fa-bars"></i>
		</button>
		{#if getSidebarState().isOpen}
			<ul>
				{#each links as { title, href }}
					<li><a {href}>{title}</a></li>
				{/each}
				{#if getUserState().loggedIn}
					<li class="dropdown">
						<span>Data</span>
						<ul class="dropdown-content">
							<li><a href={'/legal?type=clients'}>Clients</a></li>
							<li><a href={'/legal?type=matters'}>Matters</a></li>
							<li><a href={'/legal?type=prebills'}>Prebills</a></li>
							<li><hr /></li>
							<li><a href={'/legal?type=charges'}>Charges</a></li>
							<li><a href={'/legal?type=charge-types'}>Charge Type</a></li>
							<li><a href={'/legal?type=status'}>Status</a></li>
						</ul>
					</li>
					<li><a href={'#'} onclick={() => logoutUser()}>Logout</a></li>
				{:else}
					<li><a href={'/login'}>Login</a></li>
				{/if}
			</ul>
		{/if}
	</div>
</nav>
