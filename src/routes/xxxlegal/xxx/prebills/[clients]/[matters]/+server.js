// src/routes/api/legal/prebills/[clientNumber]/[matterNumber]/+server.js

import { fetchPrebillData, savePrebillData, updatePrebillData } from '../../prebillDataManager';

// GET: Fetch prebills based on clientNumber and matterNumber
export async function GET({ params }) {
	const { clients: clientNumber, matters: matterNumber } = params;
	// const { clientNumber, matterNumber } = params;
	// const clientNumber = Number(params.clientNumber);
	// const matterNumber = Number(params.matterNumber);

	//console.log('+server.js : params : ', params);

	// const clientNumber = parseInt(params.clientNumber, 10);
	// const matterNumber = parseInt(params.matterNumber, 10);

	// console.log(
	// 	'+server.js: Parsed clientNumber:',
	// 	clientNumber,
	// 	'Parsed matterNumber:',
	// 	matterNumber
	// );

	try {
		const prebills = await fetchPrebillData(clientNumber, matterNumber);
		//console.log('All Prebills from JSON:', prebills); // Log fetched data before sending

		return new Response(JSON.stringify(prebills), { status: 200 });
	} catch (error) {
		console.error('Error in fetching prebills:', error);

		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
}

// POST: Add a new prebill
export async function POST({ request }) {
	const prebillData = await request.json();

	try {
		await savePrebillData(prebillData);
		return new Response(JSON.stringify({ message: 'Prebill saved successfully' }), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to save prebill' }), { status: 500 });
	}
}

// PUT: Update an existing prebill
export async function PUT({ request }) {
	const prebillData = await request.json();

	try {
		await updatePrebillData(prebillData);
		return new Response(JSON.stringify({ message: 'Prebill updated successfully' }), {
			status: 200
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to update prebill' }), { status: 500 });
	}
}
