import type { APIRoute } from 'astro';
import { getIconBySlugWithFallback } from '@icons';

export const GET: APIRoute = async ({ params, request }) => {
	const slug = params.slug!
	const fallback = new URL(request.url).searchParams.get('fallback');

	return getIconBySlugWithFallback(slug, fallback, request.url);
};
