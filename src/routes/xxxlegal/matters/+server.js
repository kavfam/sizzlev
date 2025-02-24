//routes/api/legal/matters/+server.js
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
	try {
		const entityData = await request.json();
		await saveMatterData(entityData);

		return new Response(JSON.stringify({ message: 'Matter added successfully' }), {
			status: 201,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to add matter' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}

export async function PUT({ request }) {
	try {
		const entityData = await request.json();
		await updateMatterData(entityData);

		return new Response(JSON.stringify({ message: 'Matter updated successfully' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to update matter' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
