import type { APIRoute } from 'astro';
import { getIconByIdWithFallback } from '@icons';

export const GET: APIRoute = async ({ params, request }) => {
	const idStr = params.id!
	const fallbackStr = new URL(request.url).searchParams.get('fallback');

	return getIconByIdWithFallback(idStr, fallbackStr, request.url);
};
