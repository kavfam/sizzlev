import { json } from '@sveltejs/kit';
import fs from 'fs/promises';

const lawyersFilePath = 'data/legal/lawyers.json';

async function fetchLawyerData() {
	try {
		const fileData = await fs.readFile(lawyersFilePath, 'utf-8');
		return JSON.parse(fileData);
	} catch (error) {
		console.error('Error reading lawyers file:', error);
		throw error;
	}
}

export async function GET() {
	try {
		const lawyers = await fetchLawyerData();
		return json({ data: lawyers }); // Wrap response in `{ data: ... }`
	} catch (error) {
		return json({ error: 'Failed to load lawyers data' }, { status: 500 });
	}
}
