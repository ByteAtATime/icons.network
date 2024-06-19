import type { RequestHandler } from "./$types";
import { error } from '@sveltejs/kit';
import { getIconById } from '$lib/icon';

export const GET: RequestHandler = async ({params, url}) => {
	const {id: rawId} = params;

	const id = parseInt(rawId);

	if (!id) error(400, `Invalid chain id ${id}`);

	const icon= await getIconById(id);

	if (icon) return icon;

	const rawFallback = url.searchParams.get("fallback");

	if (!rawFallback) return error(404, `Icon not found for chain id ${id}`);

	const fallback = parseInt(rawFallback);

	if (fallback) {
		const fallbackIcon = await getIconById(fallback);

		if (fallbackIcon) return fallbackIcon;
	}

	return error(404, `Icon not found for chain id ${id} and fallback ${fallback}`);
}
