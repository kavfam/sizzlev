import { query } from '../../server/db/dataManager.js';
import bcrypt from 'bcryptjs';

export async function registerUser({ email, password }) {
	const existing = await query('SELECT * FROM users WHERE email = $1', [email]);
	if (existing.length > 0) {
		return { error: 'User already exists' };
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	await query('INSERT INTO users (email, password_hash, security_level) VALUES ($1, $2, $3)', [
		email,
		hashedPassword,
		1
	]);

	return { success: true, message: 'User registered' };
}
