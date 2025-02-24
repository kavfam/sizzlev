import { promises as fs } from 'fs';
import path from 'path';

const clientFilePath = path.resolve('data/legal/clients.json'); // Define the file path for clients

export async function fetchClientData() {
	const filePath = clientFilePath;

	try {
		const fileData = await fs.readFile(filePath, 'utf-8');
		return JSON.parse(fileData); // Return the parsed data
	} catch (error) {
		console.error(`Error fetching clients data:`, error);
		throw new Error(`Failed to fetch clients data`);
	}
}

export async function saveClientData(clientData) {
	const filePath = clientFilePath; // Use the fixed client file path

	try {
		const data = await fs.readFile(filePath, 'utf-8');
		const entityList = JSON.parse(data);

		// Generate next client number
		const nextClientNumber = Math.max(...entityList.map((c) => c.clientNumber), 0) + 1;
		clientData.clientNumber = nextClientNumber;

		// Add the new entity data to the list
		entityList.push(clientData);

		// Write the updated entity list back to the file
		await fs.writeFile(filePath, JSON.stringify(entityList, null, 2));

		// return new client number
		return { status: 200, clientNumber: nextClientNumber };
	} catch (error) {
		console.error(`Error saving client data:`, error);
		return { status: 500, error: `Failed to save client data.` };
	}
}

export async function updateClientData(updatedData) {
	const filePath = clientFilePath;

	try {
		const fileData = await fs.readFile(filePath, 'utf-8');
		const entityList = JSON.parse(fileData);

		// Assuming each entity has a unique identifier (like clientNumber)
		const index = entityList.findIndex((item) => item.clientNumber === updatedData.clientNumber);

		if (index !== -1) {
			// Merge the updated data into the existing entity data
			entityList[index] = { ...entityList[index], ...updatedData };

			// Write the updated list back to the file
			await fs.writeFile(filePath, JSON.stringify(entityList, null, 2));
			return { status: 200 };
		} else {
			throw new Error(`Client not found`);
		}
	} catch (error) {
		console.error(`Error updating client data:`, error);
		throw new Error(`Failed to update client data.`);
	}
}

// Function to fetch a client by their number
export async function fetchClientByNumber(clientNumber) {
	const filePath = clientFilePath;

	try {
		const fileData = await fs.readFile(filePath, 'utf-8');
		const clients = JSON.parse(fileData);

		// Find the client with the matching number
		const client = clients.find((client) => client.clientNumber === clientNumber);

		if (!client) {
			throw new Error(`Client with number ${clientNumber} not found`);
		}

		return client; // Return the found client
	} catch (error) {
		console.error(`Error fetching client by number:`, error);
		throw new Error(`Failed to fetch client by number`);
	}
}
