<script>
	import links from '$lib/links';
	import Logio from '$lib/components/Nav/Logio.svelte';
	import Moon from '$lib/moon.svelte';
	import Sun from '$lib/sun.svelte';
	import { getUserState, logoutUser } from '$lib/signals/appSignals.svelte.js';
	$inspect('Hnav logged in:', getUserState().loggedIn);
	let curTheme = $state('');

	// Initialize curTheme on mount, not with $effect
	if (typeof window !== 'undefined') {
		curTheme = document.documentElement.dataset.theme || 'light';
	}

	const setTheme = (theme) => {
		document.documentElement.dataset.theme = theme;
		document.cookie = `siteTheme=${theme};max-age=8640000;path="/"`;
		curTheme = theme;
	};

	const loggedInLinks = [
		{
			title: 'Data',
			href: '#',
			submenu: [
				{ title: 'Clients', href: '/clients' },
				{ title: 'Matters', href: '/matters' },
				{ title: 'Prebills', href: '/prebills' },
				{ title: 'Charges', href: '/charges' },
				{ title: 'Charge Type', href: '/charge-types' },
				{ title: 'Status', href: '/status' }
			]
		},
		{ title: 'Logout', href: '#', onclick: () => logoutUser() }
	];
</script>

<nav class="navbar">
	<a href="/">
		<img src="/Kode.png" class="logo" alt="logo" />
	</a>
	<div>
		{#if curTheme == 'light'}
			<a class="moon" href={'#'} onclick={() => setTheme('dark')}>
				<Moon />
			</a>
		{:else}
			<a class="sun" href={'#'} onclick={() => setTheme('light')}>
				<Sun />
			</a>
		{/if}
	</div>
	<div class="nav-container">
		<div class="nav-center">
			<ul class="nav-links">
				{#each links as { title, href }}
					<li>
						<a {href} class:activenav={href === '/'}>{title}</a>
					</li>
				{/each}
				{#if getUserState().loggedIn}
					<li class="dropdown">
						<a href={'#'} class="nav-links">Data</a>
						<ul class="dropdown-content">
							<li><a href={'/legal?type=clients'} class="nav-links">Clients</a></li>
							<li><a href={'/legal?type=matters'} class="nav-links">Matters</a></li>
							<li><a href={'/legal?type=prebills'} class="nav-links">Prebills</a></li>
							<li><hr /></li>
							<li><a href={'/legal?type=charges'} class="nav-links">Charges</a></li>
							<li><a href={'/legal?type=charge-types'} class="nav-links">Charge Type</a></li>
							<li><a href={'/legal?type=status'} class="nav-links">Status</a></li>
						</ul>
					</li>
					<li><a href={'#'} onclick={() => logoutUser()} class="nav-links">Logout</a></li>
				{/if}
			</ul>
			<!-- Logio was here -->
			<div class="nav-aside">
				{#if !getUserState().loggedIn}
					<Logio />
				{/if}
			</div>
		</div>
	</div>
</nav>

<style>
	.dropdown {
		position: relative;
		display: inline-block;
	}
	.dropdown-content {
		display: none;
		position: absolute;
		top: 100%;
		left: 0;
		background: var(--mainWhite);
		min-width: 160px;
		box-shadow: var(--lightShadow);
		z-index: 1;
	}
	.dropdown-content a {
		display: block;
		padding: 0.25rem 0.5rem;
	}
	.dropdown:hover .dropdown-content {
		display: block;
	}
</style>
