import { read } from '$app/server';
import { error } from '@sveltejs/kit';

export const getIconById = async (id: number): Promise<Response|null> => {
	try {
		const icon = await import(`$lib/icons/${id}.svg`);

		const response = read(icon.default);

		response.headers.set('Content-Type', 'image/svg+xml');

		return response;
	} catch (e) {
		console.error(e);
		return null;
	}
}
