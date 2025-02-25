import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function query(sql, params = []) {
	try {
		const result = await pool.query(sql, params);
		console.log('Raw query result:', result); // Debug
		return result.rows || []; // Explicitly return rows
	} catch (error) {
		console.error('Database Query Error:', error.message);
		throw new Error('Query failed: ' + error.message);
	}
}

export async function getData(type) {
	const queries = {
		clients: 'SELECT * FROM clients LIMIT 10',
		matters: 'SELECT * FROM matters LIMIT 10',
		prebills: 'SELECT * FROM prebills LIMIT 10',
		lawyers: 'SELECT * FROM lawyers LIMIT 10',
		charges: 'SELECT * FROM charges LIMIT 10',
		chargeTypes: 'SELECT * FROM chargetypes LIMIT 10',
		status: 'SELECT * FROM status LIMIT 10'
	};
	const sql = queries[type];
	if (!sql) return null;
	return await query(sql);
}
