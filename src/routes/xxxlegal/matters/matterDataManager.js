import { promises as fs } from 'fs';
import path from 'path';

const matterFilePath = path.resolve('data/legal/matters.json');
// console.log('Attempting to read:', matterFilePath);

// Function to fetch matter data
export async function fetchMatterData() {
	const filePath = matterFilePath;
	try {
		const fileData = await fs.readFile(filePath, 'utf-8');
		return JSON.parse(fileData); // Return the parsed data
	} catch (error) {
		console.error(`Error fetching matters data:`, error);
		throw new Error(`Failed to fetch matters data`);
	}
}

export async function saveMatterData(matterData) {
	const filePath = matterFilePath;
	try {
		const data = await fs.readFile(filePath, 'utf-8');
		const matterList = JSON.parse(data);

		// Add the new matter data to the list
		matterList.push(matterData);

		// Write the updated matter list back to the file
		await fs.writeFile(filePath, JSON.stringify(matterList, null, 2));

		return { status: 200 };
	} catch (error) {
		console.error(`Error saving matter data:`, error);
		return { status: 500, error: `Failed to save matter data.` };
	}
}

// Function to update existing matter
// note because you cant "update" a specific onject in the json array what you do is create an array with the json, remove the original object being updated and add the rest to leave the updated record in the same place the original was. Then rewrite the file.
export async function updateMatterData(updatedData) {
	const filePath = matterFilePath;
	try {
		const fileData = await fs.readFile(filePath, 'utf-8');
		const matterList = JSON.parse(fileData);

		// console.log('matterDataManager.js Initial matterList:', JSON.stringify(matterList, null, 2));
		// console.log('matterDataManager.js Incoming updatedData:', updatedData);

		const index = matterList.findIndex(
			(item) =>
				Number(item.clientNumber) === Number(updatedData.clientNumber) &&
				Number(item.matterNumber) === Number(updatedData.matterNumber)
		);

		if (index !== -1) {
			// console.log('materDataManager.js Found record at index:', index, matterList[index]); // Confirms the record is located

			// Replace only the fields in the original object, maintaining position
			matterList[index] = { ...matterList[index], ...updatedData };
			// console.log('materDataManager.js Updated record:', matterList[index]);
		} else {
			console.warn(`Record not found. No update applied.`);
			throw new Error(`Matter not found`);
		}

		// console.log(
		// 	'materDataManager.js Final matterList before writing to file:',
		// 	JSON.stringify(matterList, null, 2)
		// );

		// Write the updated array back to the file
		await fs.writeFile(filePath, JSON.stringify(matterList, null, 2));
		// return { status: 200 };
		return { status: 200, message: 'matters updated successfully' };
	} catch (error) {
		console.error(`Error updating matter data:`, error);
		throw new Error(`Failed to update matter data.`);
	}
}
