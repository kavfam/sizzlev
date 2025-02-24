import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
};

export async function registerUser({ email, password }) {
	const db = await mysql.createConnection(dbConfig);

	const [existing] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
	if (existing.length > 0) {
		await db.end();
		return { error: 'User already exists' };
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	await db.execute('INSERT INTO users (email, password, security_level) VALUES (?, ?, ?)', [
		email,
		hashedPassword,
		1
	]);
	await db.end();

	return { success: true, message: 'User registered' };
}
