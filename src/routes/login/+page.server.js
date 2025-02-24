// routes/login/+page.server.js
import { query } from '../../../server/db/dataManager.js';
import { loginUser } from '../../../server/auth/loginUser.js';
import { redirect } from '@sveltejs/kit';
import { setUserState, setAppData } from '$lib/signals/appSignals.svelte.js';

export const actions = {
	login: async ({ request, cookies }) => {
		console.log('Login action started'); // Debug
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		console.log('Form data:', { email, password });

		const user = await loginUser({ email, password });
		console.log('User:', user);
		if (!user) {
			console.log('Invalid credentials');
			return { error: 'Invalid credentials' };
		}

		cookies.set('session', user.sessionId, {
			path: '/',
			httpOnly: true,
			secure: false,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24
		});

		setUserState({
			id: user.id,
			email,
			security_level: user.security_level,
			loggedIn: true
		});

		console.log('Redirecting to /');
		throw redirect(303, '/');
	}
};
