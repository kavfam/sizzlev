import { query } from '../../server/db/dataManager.js';
import crypto from 'crypto';

export async function loginUser({ email, password }) {
	const result = await query(
		'SELECT id, password_hash, security_level FROM users WHERE email = $1',
		[email]
	);
	console.log('Query result:', result);

	if (!result.length) {
		console.log('No user found for email:', email);
		return null;
	}

	const user = result[0];
	console.log('User found:', user);
	if (password !== user.password_hash) {
		// Plaintext compare
		console.log('Password mismatch for user:', email);
		return null;
	}

	return { id: user.id, security_level: user.security_level, sessionId: crypto.randomUUID() };
}
