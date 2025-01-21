import { writable } from 'svelte/store';
import axios from 'axios';

export const projectData = writable(null);

export function setProjectData(data) {
	projectData.set(data);
}

// Function to fetch project details and update the store
export async function getProjectDetails(id) {
	try {
		const response = await axios.get(`https://luma-server.onrender.com/api/projects/id/${id}`);
		projectData.set(response.data); // Update the store with the fetched data
		// console.log('Project details fetched:', response.data);
	} catch (error) {
		console.error('Error fetching project details:', error);
	}
}