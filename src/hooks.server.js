export const handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');
	if (!session && event.url.pathname.startsWith('/legal')) {
		return new Response(null, { status: 303, headers: { Location: '/login' } });
	}
	return resolve(event);
};
