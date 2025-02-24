// api/legal/+server.js
import { query } from '../../../../server/db/dataManager.js';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const type = url.searchParams.get('type');
	const selected = url.searchParams.get('selected');
	const name = url.searchParams.get('name');
	if (!type) return new Response('Missing dataset type', { status: 400 });

	const typeMap = {
		clients: 'clients',
		matters: 'matters',
		prebills: 'prebills',
		lawyers: 'lawyers',
		charges: 'charges',
		chargetypes: 'chargetypes',
		'charge-types': 'chargetypes',
		status: 'status'
	};
	const orderMap = {
		clients: 'clientnumber',
		matters: 'id',
		prebills: 'id',
		lawyers: 'lawyer',
		charges: 'id',
		chargetypes: 'id',
		status: 'id'
	};
	const mappedType = typeMap[type];
	if (!mappedType) return new Response('Invalid dataset type', { status: 404 });

	const orderColumn = orderMap[mappedType] || 'id';
	let sql, params;
	if (name) {
		sql = `SELECT * FROM ${mappedType} WHERE ${orderColumn === 'clientnumber' ? 'clientname' : orderColumn} LIKE $1 ORDER BY ${orderColumn} DESC LIMIT 10`;
		params = [`%${name}%`];
	} else if (selected) {
		sql = `SELECT * FROM ${mappedType} WHERE ${orderColumn} <= $1 ORDER BY ${orderColumn} DESC LIMIT 10`;
		params = [selected];
	} else {
		sql = `SELECT * FROM ${mappedType} ORDER BY ${orderColumn} DESC LIMIT 10`;
		params = [];
	}
	const data = await query(sql, params);
	return json(data, { status: 200 });
}

export async function POST({ request, url }) {
	const type = url.searchParams.get('type');
	if (!type) return new Response('Missing type', { status: 400 });
	const data = await request.json();
	const maxResult = await query('SELECT MAX(clientnumber) as maxNum FROM clients');
	const nextClientNumber = (maxResult[0].maxnum || 0) + 1;
	const result = await query(
		'INSERT INTO clients (clientname, clientnumber, address, telno, statusid) VALUES ($1, $2, $3, $4, $5) RETURNING clientnumber',
		[
			data.clientname || '',
			nextClientNumber,
			data.address || '',
			data.telno || '',
			data.statusid || 1
		]
	);
	return json({ ...data, clientnumber: result[0].clientnumber }, { status: 201 });
}

export async function PUT({ request, url }) {
	const type = url.searchParams.get('type');
	if (!type) return new Response('Missing type', { status: 400 });
	const data = await request.json();
	const result = await query(
		'UPDATE clients SET clientname = $1, address = $2, telno = $3, statusid = $4 WHERE clientnumber = $5',
		[data.clientname, data.address, data.telno, data.statusid, data.clientnumber]
	);
	if (result.rowCount === 0) return new Response('Client not found', { status: 404 });
	return json(data, { status: 200 });
}
