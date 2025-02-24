<script>
	import links from '$lib/links';
	import Logio from '$lib/components/Nav/Logio.svelte';
	import Moon from '$lib/moon.svelte';
	import Sun from '$lib/sun.svelte';
	import { toggleNav } from '$lib/signals/appSignals.svelte';
	import { fade, fly } from 'svelte/transition';

	let curTheme = $state('');
	if (typeof window !== 'undefined') {
		curTheme = document.documentElement.dataset.theme || 'light';
	}

	const setTheme = (theme) => {
		document.documentElement.dataset.theme = theme;
		document.cookie = `siteTheme=${theme};max-age=8640000;path="/"`;
		curTheme = theme;
	};

	const closeNav = () => {
		toggleNav(false);
	};
</script>

<div class="sidebar-container" transition:fly={{ x: -1000 }}>
	<div class="sidebar" transition:fade={{ delay: 400 }}>
		<div class="sidebar-header">
			<button class="btn-close" onclick={closeNav} aria-label="Close Sidebar">
				<i class="fas fa-window-close"></i>
			</button>
			<div class="sidebar-parent">
				<div class="sidebar-child">
					<img src="/Kode.png" class="logo" alt="logo" />
				</div>
				<div class="sidebar-child">
					{#if curTheme === 'light'}
						<span
							class="moon"
							onclick={() => setTheme('dark')}
							onkeydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') setTheme('dark');
							}}
							role="button"
							aria-label="Switch to Dark Mode"
							tabindex="0"
						>
							<Moon />
						</span>
					{:else}
						<span
							class="sun"
							onclick={() => setTheme('light')}
							onkeydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') setTheme('light');
							}}
							role="button"
							aria-label="Switch to Light Mode"
							tabindex="0"
						>
							<Sun />
						</span>
					{/if}
				</div>
			</div>
		</div>
		<ul class="sidebar-links">
			{#each links as { title, href }}
				<li>
					<a {href} onclick={closeNav} aria-label={`Navigate to ${title}`}>{title}</a>
				</li>
			{/each}
			<li><Logio /></li>
		</ul>
	</div>
</div>

<style>
	.sidebar-parent {
		display: flex;
	}
	.sidebar-child {
		width: 20%;
		height: 120px;
		text-align: left;
	}
</style>
