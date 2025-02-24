<script>
	// Any necessary imports and script content
	import { fly } from 'svelte/transition';
</script>

<header>
	<div class="logo-title">
		<img src="/Kode_6000px.png" alt="Logo" class="header-logo" />
		<h1>Si<span class="italic">zz</span>ling <span class="italic">Signals</span></h1>
	</div>

	<nav>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/clients">Clients</a></li>
			<li><a href="/matters">Matters</a></li>
			<li><a href="/prebills">Prebills</a></li>

			<li>
				<span class="app-header">Other</span>
				<ul class="dropdown">
					<li><a href="/lawyers">Lawyers</a></li>
					<li><a href="/charges">Charges</a></li>
					<li><a href="/chargetype">Charge Type</a></li>
					<li><a href="/status">Status</a></li>
				</ul>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background-color: #f0f8ff;
		border-bottom: 1px solid #ddd;
	}

	.italic {
		font-style: italic;
		color: red;
	}

	/* Flex container for the logo and title */
	.logo-title {
		display: flex;
		align-items: center;
	}

	/* Style for the header logo */
	.header-logo {
		width: 50px; /* Adjust the size as needed */
		height: auto;
		margin-right: 0.5rem;
	}

	nav ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		gap: 1rem;
	}

	nav a {
		text-decoration: none;
		/* color: #333; */
		color: #00008b;
	}

	nav a:hover {
		text-decoration: underline;
	}

	h1 {
		color: #00008b;
		font-size: 2.5rem;
		line-height: 1.2; /* Optional: increases vertical spacing */
	}

	li {
		position: relative;
		text-align: right; /* Align the "App" link to the right */
	}

	ul.dropdown {
		display: none;
		position: absolute;
		right: 0; /* Align dropdown to the right */
		top: 100%;
		list-style: none;
		background-color: #f0f8ff;
		padding: 0.5rem;
		border: 1px solid #ddd;
		min-width: 100%; /* Ensure dropdown is as wide as the parent li */
	}

	li:hover ul.dropdown {
		display: block;
	}

	ul.dropdown li {
		margin: 0;
		padding: 0;
	}

	ul.dropdown li a {
		color: #333;
		white-space: nowrap;
		display: block;
		padding: 0.5rem;
		text-decoration: none;
	}

	ul.dropdown li a:hover {
		background-color: #e0e8ff; /* Slightly darker blue for contrast */
		color: #333; /* Keeps text color visible */
	}

	.app-header {
		color: #333;
		cursor: default; /* Shows that it's not clickable */
		padding: 0.5rem;
		text-decoration: none;
	}

	.app-header:hover {
		text-decoration: none; /* No hover effect */
	}
</style>
