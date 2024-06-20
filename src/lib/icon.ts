import { read } from '$app/server';

const rawIcons = import.meta.glob('$lib/icons/*.svg');

const icons = Object.fromEntries(
	Object.entries(rawIcons).map(([ key, value ]) => [ key.match(/\d+/)![0], value ])
);

export const getIconById = async (id: number): Promise<Response | null> => {
	try {
		const icon = (await icons[id]()) as { default: string };

		const response = read(icon.default);

		response.headers.set('Content-Type', 'image/svg+xml');

		return response;
	} catch (e) {
		console.error(e);
		return null;
	}
};
