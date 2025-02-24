<!-- Alert.svelte -->
<script>
	import { getAlertState, setAlertStateItem } from '$lib/signals/appSignals.svelte.js';
	import { fly, fade } from 'svelte/transition';

	let alertState = $state(getAlertState());
	let timer = $state(null);

	$effect(() => {
		if (alertState.alertShow) {
			timer = setTimeout(() => {
				setAlertStateItem('alertShow', false);
				setAlertStateItem('alertMsg', '');
				setAlertStateItem('alertMode', '');
			}, 3000);
		}

		return () => {
			clearTimeout(timer);
			setAlertStateItem('alertShow', false);
			setAlertStateItem('alertMsg', '');
			setAlertStateItem('alertMode', '');
		};
	});

	const handleClose = () => {
		clearTimeout(timer);
		setAlertStateItem('alertShow', false);
		setAlertStateItem('alertMsg', '');
		setAlertStateItem('alertMode', '');
	};
</script>

{#if alertState.alertShow}
	<div
		class="alert-container"
		in:fly={{ y: -200, duration: 1000 }}
		out:fade={{ duration: 1000 }}
		class:alert-danger={alertState.alertMode === 'alert'}
	>
		<div class="alert">
			<p>{alertState.alertMsg}</p>
			<button onclick={handleClose} class="alert-close" aria-label="Close alert">
				<i class="fas fa-window-close"></i>
			</button>
		</div>
	</div>
{/if}
