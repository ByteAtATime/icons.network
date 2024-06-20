import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { getIconById } from '$lib/icon';

const SLUG_TO_CHAIN_ID: Record<string, number> = {
	ethereum: 1,
	mainnet: 1,
	optimism: 10,
	optimistic: 10,
	gnosis: 100,
	xdai: 100,
	polygon: 137,
	zksync: 324,
	base: 8453,
	arbitrum: 42161
};

export const GET: RequestHandler = async ({ params, url }) => {
	const { slug } = params;
	const id = SLUG_TO_CHAIN_ID[slug];

	const icon = await getIconById(id);

	if (icon) return icon;

	const fallback = url.searchParams.get('fallback');
	if (!fallback)
		return error(404, `Icon not found for chain id ${id} (retrieved with slug "${slug}")`);

	const fallbackId = SLUG_TO_CHAIN_ID[fallback];

	if (fallback) {
		const fallbackIcon = await getIconById(fallbackId);

		if (fallbackIcon) return fallbackIcon;
	}

	return error(404, `Icon not found for slug "${slug}" and fallback slug "${fallback}"`);
};
