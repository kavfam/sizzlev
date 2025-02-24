// /routes/api/legal/clients/+server.js

import {
	saveClientData,
	updateClientData,
	fetchClientData,
	fetchClientByNumber
} from './clientDataManager';

export async function GET({ url }) {
	// console.log('In clients/+server.js, handling GET request');

	// Default: fetch all clients
	// console.log('clients/+server IN } else {');

	try {
		const clients = await fetchClientData();
		return new Response(JSON.stringify({ data: clients }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to fetch client data' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}

export async function POST({ request }) {
	const entity = 'clients';

	// console.log('Post: entity : ', entity);
	try {
		const entityData = await request.json(); // Parse the incoming request data

		// await saveClientData(entityData); // Save the entity data using the dynamic function
		// return new Response(JSON.stringify({ message: `${entity} added successfully` }), {
		// 	status: 201,
		// 	headers: { 'Content-Type': 'application/json' }
		// });

		const newClient = await saveClientData(entityData); // Save client data and get new client number
		return new Response(
			JSON.stringify({
				message: `${entity} added successfully`,
				clientNumber: newClient.clientNumber
			}),
			{
				status: 201,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	} catch (error) {
		return new Response(JSON.stringify({ error: `Failed to add ${entity} data` }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}

export async function PUT({ request }) {
	const entity = 'clients'; // Hardcode entity to 'clients'

	try {
		const entityData = await request.json(); // Parse the incoming request data
		await updateClientData(entityData); // Update the entity data using the dynamic function
		return new Response(JSON.stringify({ message: `${entity} updated successfully` }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: `Failed to update ${entity} data` }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
