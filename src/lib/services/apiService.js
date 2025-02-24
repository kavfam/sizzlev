// $lin/services/apiService.js
//

async function apiRequest(url, method, data = null) {
	const options = {
		method,
		headers: { 'Content-Type': 'application/json' }
	};

	if (data && method !== 'GET') {
		options.body = JSON.stringify(data);
	}

	try {
		const response = await fetch(url, options);
		const result = await response.json();

		if (!response.ok) {
			throw new Error(result.message || `Failed to process ${url} request`);
		}

		return result;
	} catch (error) {
		console.error(`Error processing ${method} request for ${url}:`, error);
		return null;
	}
}

export const getData = async (type) => {
	const result = await apiRequest(`/api/legal?type=${type}`, 'GET');
	return result || [];
};

export const updateData = (url, data, action) => {
	const method = action === 'update' ? 'PUT' : 'POST';
	const cleanData = JSON.parse(JSON.stringify(data));
	return apiRequest(url, method, cleanData);
};
