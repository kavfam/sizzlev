import { query } from '../../server/db/dataManager.js';
import bcrypt from 'bcryptjs';
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
	console.log('Checking password for:', email, 'Hash:', user.password_hash);
	const match = await bcrypt.compare(password, user.password_hash || ''); // Ensure hash isn’t null
	console.log('Password match:', match);
	if (!match) {
		console.log('Password mismatch for user:', email);
		return null;
	}

	return { id: user.id, security_level: user.security_level, sessionId: crypto.randomUUID() };
}
