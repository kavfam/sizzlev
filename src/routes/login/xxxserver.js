import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { json } from '@sveltejs/kit';

const db = await mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'admin',
	database: 'sizzle2'
});

export async function POST({ request }) {
	const { email, password } = await request.json();

	const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
	if (rows.length === 0) return json({ error: 'User not found' }, { status: 401 });

	const user = rows[0];
	const isValid = await bcrypt.compare(password, user.password);
	if (!isValid) return json({ error: 'Invalid credentials' }, { status: 401 });

	return json({ id: user.id, email: user.email, security_level: user.security_level });
}
