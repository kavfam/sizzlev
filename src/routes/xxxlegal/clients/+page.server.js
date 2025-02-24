import { user } from '$lib/signals/user';

export function load() {
	if (!user.value) {
		throw redirect(302, '/login');
	}
}
