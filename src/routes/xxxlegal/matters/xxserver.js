// /routes/api/legal/matters/+server.js
import { saveMatterData, updateMatterData, fetchMatterData } from './matterDataManager';

export async function GET() {
	try {
		const matters = await fetchMatterData();
		return new Response(JSON.stringify({ data: matters }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to fetch matters' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}

export async function POST({ request }) {
	const entity = 'matters'; // Hardcode entity to 'matters'

	console.log('Post: entity : ', entity);
	try {
		const entityData = await request.json(); // Parse the incoming request data
		await saveMatterData(entityData);

		return new Response(JSON.stringify({ message: `${entity} added successfully` }), {
			status: 201,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to fetch matter by ID' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}

export async function PUT({ request }) {
	const entity = 'matters'; // Hardcode entity to 'matters'

	try {
		const entityData = await request.json(); // Parse the incoming request data
		await updateMatterData(entityData);

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
