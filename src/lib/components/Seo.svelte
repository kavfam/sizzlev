<script>
	import { getStores } from '$app/stores';

	let { title, description, type } = $props();

	const { page } = getStores();
	let url = $state('');

	$effect(() => {
		url = $page.url.href;
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<!-- Fixed typo -->
	{@html `<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "${type}",
  "name": "${title}",
  "description": "${description}",
  "url": "${url}"
}
</script>`}
</svelte:head>
