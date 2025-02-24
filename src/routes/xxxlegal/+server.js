// src/routes/legal/+server.js
import { query } from '../../../server/db/dataManager';

export async function GET({ url }) {
	const action = url.searchParams.get('action') || 'clients'; // Default to 'clients'
	const page = parseInt(url.searchParams.get('page') || '1', 10);
	const search = url.searchParams.get('search') || '';
	const limit = 10;
	const offset = (page - 1) * limit;

	let data = [];
	let total = 0;

	switch (action) {
		case 'clients':
			data = await fetchData(
				'clients',
				['clientnumber', 'clientname', 'address', 'telno'],
				'clientname LIKE ?',
				[`%${search}%`],
				limit,
				offset
			);
			const countResult = await query(
				'SELECT COUNT(*) AS total FROM clients WHERE clientname LIKE ?',
				[`%${search}%`]
			);
			const total = countResult?.[0]?.total || 0; // Use optional chaining to avoid errors

			break;

		case 'matters':
			data = await fetchData(
				'matters',
				['matternumber', 'clientnumber', 'lawyer', 'statusId'],
				'matternumber LIKE ?',
				[`%${search}%`],
				limit,
				offset
			);
			[[{ total }]] = await query(
				'SELECT COUNT(*) AS total FROM matters WHERE matternumber LIKE ?',
				[`%${search}%`]
			);
			break;

		case 'prebills':
			data = await fetchData(
				'prebills',
				['billNumber', 'clientNumber', 'amount'],
				'billNumber LIKE ?',
				[`%${search}%`],
				limit,
				offset
			);
			[[{ total }]] = await query(
				'SELECT COUNT(*) AS total FROM prebills WHERE billNumber LIKE ?',
				[`%${search}%`]
			);
			break;

		default:
			return new Response(JSON.stringify({ error: 'Invalid action' }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json'
				}
			});
	}

	return new Response(JSON.stringify({ data, total, page, limit }), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// Helper function to reduce duplication
async function fetchData(tableName, fields, condition, params, limit, offset) {
	const queryString = `
        SELECT ${fields.join(', ')}
        FROM ${tableName}
        WHERE ${condition}
        LIMIT ${Number(limit)} OFFSET ${Number(offset)}`;
	const result = await query(queryString, params);
	return Array.isArray(result) ? result : []; // Ensure it's always an array
}
