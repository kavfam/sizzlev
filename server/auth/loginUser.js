import { query } from '../../server/db/dataManager.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
// console.log('Test hash for password123:', bcrypt.hashSync('password123', 10));

const generateSessionId = () => crypto.randomUUID();

export async function loginUser({ email, password }) {
	// //console.log('loginUser called with:', { email, password });
	const result = await query(
		'SELECT id, password_hash, security_level FROM users WHERE email = $1',
		[email]
	);
	//console.log('Query result:', result);

	if (!result.length) {
		console.log('No user found for email:', email);
		return null;
	}

	const user = result[0];
	//console.log('Stored hash:', user.password_hash);
	const match = await bcrypt.compare(password, user.password_hash);
	//console.log('Comparing password:', password, 'with hash, result:', match);
	if (!match) {
		console.log('Password mismatch for user:', email);
		return null;
	}

	return { id: user.id, security_level: user.security_level, sessionId: generateSessionId() };
}
