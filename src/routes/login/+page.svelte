<script>
	import { goto } from '$app/navigation';
	import { toggleAlert, getUserState, setUserState } from '$lib/signals/appSignals.svelte.js';
	import { enhance } from '$app/forms';
	import { browser } from '$app/environment';

	// state
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let isMember = $state(true);
	let error = $state('');

	// Debug state changes
	$inspect('Logged in:', getUserState().loggedIn);

	if (browser && document.cookie.includes('session=')) {
		const user = getUserState();
		if (!user.loggedIn) {
			setUserState({ ...user, loggedIn: true });
		}
	}

	const handleSubmit = () => {
		return async ({ result, update }) => {
			console.log('Action result:', result);
			if (result.type === 'redirect') {
				console.log('Redirecting to:', result.location);
				setUserState({
					id: 1, // Hardcoded for now, ideally from server
					email: email,
					security_level: 1, // Hardcoded, adjust later
					loggedIn: true
				});
				goto(result.location);
			} else if (result.type === 'failure') {
				error = result.data?.error || 'Login failed';
				console.log('Login error:', error);
				toggleAlert({ alertMsg: error, alertMode: 'danger' });
			} else {
				console.log('Unexpected result:', result);
			}
			update();
		};
	};
</script>

<div class="form">
	<h1>{isMember ? 'Login' : 'Register'}</h1>
	{#if error}
		<p class="form-empty">{error}</p>
	{/if}

	<!-- need action to tell SK to use login action instead of default -->
	<form method="POST" action="/login?/login" use:enhance={handleSubmit} class="login-form">
		<div class="form-control">
			<label for="email">Email</label>
			<input
				type="email"
				id="email"
				name="email"
				bind:value={email}
				placeholder="Email"
				required
				autocomplete="email"
			/>
		</div>
		<div class="form-control">
			<label for="password">Password</label>
			<input
				type="password"
				id="password"
				name="password"
				bind:value={password}
				placeholder="Password"
				required
				autocomplete="current-password"
			/>
		</div>
		{#if !isMember}
			<div class="form-control">
				<label for="confirmPassword">Confirm Password</label>
				<input
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					bind:value={confirmPassword}
					placeholder="Confirm Password"
					required
					autocomplete="new-password"
				/>
			</div>
		{/if}
		<button type="submit" class="btn-primary btn-block">{isMember ? 'Login' : 'Register'}</button>
	</form>

	<div class="register-link">
		<button onclick={() => (isMember = !isMember)}>
			{isMember ? 'Need an account? Register' : 'Already a member? Login'}
		</button>
	</div>
</div>

<style>
	/* Enhance spacing and alignment */
	.form-control {
		margin-bottom: 1.5rem; /* More space between fields */
	}
	.form-control input {
		padding: 0.75rem; /* Larger input fields */
	}
	.register-link button {
		background: transparent;
		border: none;
		color: var(--primaryColor);
		cursor: pointer;
		font-size: 1rem;
	}
</style>
