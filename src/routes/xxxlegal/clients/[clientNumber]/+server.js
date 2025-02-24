// /routes/api/legal/clients/[clientNumber]/+server.js

import { fetchClientByNumber } from '../clientDataManager'; // Import fetch function

export async function GET({ params }) {
	const { clientNumber } = params; // Extract clientNumber from the URL

	try {
		const client = await fetchClientByNumber(parseInt(clientNumber));
		if (client) {
			return new Response(JSON.stringify({ data: client }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			});
		} else {
			return new Response(JSON.stringify({ error: 'Client not found' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' }
			});
		}
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to fetch client' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
