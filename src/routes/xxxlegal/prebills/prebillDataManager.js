import { promises as fs } from 'fs';
import path from 'path';

const prebillFilePath = path.resolve('data/legal/prebills.json');

// Function to fetch prebill data for specific client and matter
// export async function fetchPrebillData(clientNumber, matterNumber) {
// 	try {
// 		const fileData = await fs.readFile(prebillFilePath, 'utf-8');
// 		const prebills = JSON.parse(fileData);

// 		console.log('PrebillDataManager: Raw Prebills Data:', prebills); // Log all prebills

// 		// Filter prebills by clientNumber and matterNumber
// 		const filteredPrebills = prebills.filter(
// 			(p) => p.clientNumber === Number(clientNumber) && p.matterNumber === Number(matterNumber)
// 		);

// 		console.log('prebillDataManager : Filtered Prebills:', filteredPrebills); // Log after filtering

// 		return filteredPrebills;
// 	} catch (error) {
// 		console.error(`Error fetching prebills data:`, error);
// 		throw new Error(`Failed to fetch prebills data`);
// 	}
// }

export async function fetchPrebillData(clientNumber, matterNumber) {
	try {
		const fileData = await fs.readFile(prebillFilePath, 'utf-8');
		const prebills = JSON.parse(fileData);

		// console.log('PrebillDataManager: Raw Prebills Data:', prebills);
		// console.log('Type of clientNumber:', typeof clientNumber, clientNumber);
		// console.log('Type of matterNumber:', typeof matterNumber, matterNumber);

		// Check if there's an issue with data types
		// prebills.forEach((prebill, index) => {
		// console.log(`Prebill ${index}:`, prebill);
		// console.log(
		// 	'Type of prebill.clientNumber:',
		// 	typeof prebill.clientNumber,
		// 	prebill.clientNumber
		// );
		// // console.log(
		// 	'Type of prebill.matterNumber:',
		// 	typeof prebill.matterNumber,
		// 	prebill.matterNumber
		// );
		// });

		//console.log('Filtering Prebills for:', clientNumber, matterNumber);

		// Filter prebills by clientNumber and matterNumber
		const filteredPrebills = prebills.filter(
			(prebill) => prebill.clientNumber == clientNumber && prebill.matterNumber == matterNumber
		);

		// console.log('Filtered Prebills:', filteredPrebills);
		return filteredPrebills;
	} catch (error) {
		console.error(`Error fetching prebills data:`, error);
		throw new Error(`Failed to fetch prebills data`);
	}
}

// Function to save a new prebill
export async function savePrebillData(prebillData) {
	const filePath = prebillFilePath;
	try {
		const data = await fs.readFile(filePath, 'utf-8');
		const prebillList = JSON.parse(data);

		// Add the new prebill data to the list
		prebillList.push(prebillData);

		// Write the updated prebill list back to the file
		await fs.writeFile(filePath, JSON.stringify(prebillList, null, 2));

		return { status: 200 };
	} catch (error) {
		console.error(`Error saving prebill data:`, error);
		return { status: 500, error: `Failed to save prebill data.` };
	}
}

// Function to update an existing prebill
export async function updatePrebillData(updatedData) {
	const filePath = prebillFilePath;
	try {
		const fileData = await fs.readFile(filePath, 'utf-8');
		const prebillList = JSON.parse(fileData);

		// Assuming each prebill has a unique identifier
		const index = prebillList.findIndex(
			(item) =>
				item.clientNumber === updatedData.clientNumber &&
				item.matterNumber === updatedData.matterNumber &&
				item.date === updatedData.date // Add unique identification logic if needed
		);

		if (index !== -1) {
			// Merge the updated data into the existing prebill
			prebillList[index] = { ...prebillList[index], ...updatedData };

			// Write the updated list back to the file
			await fs.writeFile(filePath, JSON.stringify(prebillList, null, 2));
			return { status: 200 };
		} else {
			throw new Error(`Prebill not found`);
		}
	} catch (error) {
		console.error(`Error updating prebill data:`, error);
		throw new Error(`Failed to update prebill data.`);
	}
}

// Function to fetch prebills for a specific client and matter
export async function fetchPrebillsByClientAndMatter(clientNumber, matterNumber) {
	const filePath = prebillFilePath;
	try {
		const fileData = await fs.readFile(filePath, 'utf-8');
		const prebills = JSON.parse(fileData);

		// Filter the prebills based on clientNumber and matterNumber
		const filteredPrebills = prebills.filter(
			(prebill) => prebill.clientNumber === clientNumber && prebill.matterNumber === matterNumber
		);

		return filteredPrebills;
	} catch (error) {
		console.error(
			`Error fetching prebills for client ${clientNumber} and matter ${matterNumber}:`,
			error
		);
		throw new Error(`Failed to fetch prebills for the given client and matter.`);
	}
}
