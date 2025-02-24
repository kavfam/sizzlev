import { json } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';

const disbursementsFilePath = path.resolve('data/legal/disbursements.json');

export async function GET() {
	try {
		const data = await fs.readFile(disbursementsFilePath, 'utf-8');
		return json(JSON.parse(data));
	} catch (error) {
		return json({ error: 'Failed to load disbursements' }, { status: 500 });
	}
}
