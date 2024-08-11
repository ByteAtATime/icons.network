import type { GetImageResult, ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

const SLUG_TO_ID: Record<string, number> = {
	mainnet: 1,
	ethereum: 1,
	eth: 1,

	optimism: 10,
	optimistic: 10,
	op: 10,
	opeth: 10,

	gnosis: 100,
	xdai: 100,

	polygon: 137,
	matic: 137,

	zksync: 324,
	zk: 324,
	zkrollup: 324,
	'zk-rollup': 324,
	'zk-sync': 324,

	base: 8453,
	coinbase: 8453,

	arbitrum: 42161,
	arb: 42161,
	arbitrumone: 42161,
	'arbitrum-one': 42161
};

const rawIcons = import.meta.glob<{ default: ImageMetadata }>('./*.svg', { eager: true });
const processIcons = async (rawIcons: Record<string, { default: ImageMetadata }>) => {
	const icons = new Map<number, GetImageResult>();

	for (const [ key, value ] of Object.entries(rawIcons)) {
		const id = parseInt(/\.\/(\d+)\.svg/.exec(key)![1]);
		const iconMetadata = await getImage({ src: value.default });

		icons.set(id, iconMetadata);
	}

	return icons;
};

const processedIcons = processIcons(rawIcons);

const getIconById = async (id: number) => {
	return await processedIcons.then(it => it.get(id));
};

const getIconBySlug = async (slug: string) => {
	const id = SLUG_TO_ID[slug];
	if (!id) return null;

	return await getIconById(id);
};

const iconMetadataToResponse = async (metadata: GetImageResult, reqUrl: string) => {
	return fetch(new URL(metadata.src, reqUrl));
};

const idMustBeNumberResponse = (idStr: string) => new Response(null, {
	status: 400,
	statusText: `\`id\` parameter must be a number, got \`${idStr}\``
});
const idNotFoundResponse = (id: number) => new Response(null, { status: 404, statusText: `Icon with ID \`${id}\` not found` });
const fallbackMustBeNumberResponse = (fallbackStr: string) => new Response(null, {
	status: 400,
	statusText: `\`fallback\` parameter must be a number, got \`${fallbackStr}\``
});
const idAndFallbackNotFoundResponse = (id: number, fallback: number) => new Response(null, {
	status: 404,
	statusText: `Icon with ID \`${id}\` and fallback \`${fallback}\` not found`
});

export const getIconByIdWithFallback = async (idStr: string, fallbackStr: string | null, reqUrl: string) => {
	const id = parseInt(idStr);
	if (isNaN(id)) return idMustBeNumberResponse(idStr);

	const icon = await getIconById(id);
	if (icon) return iconMetadataToResponse(icon, reqUrl);
	else if (!fallbackStr) return idNotFoundResponse(id);

	const fallback = parseInt(fallbackStr);
	if (isNaN(fallback)) return fallbackMustBeNumberResponse(fallbackStr);

	const fallbackIcon = await getIconById(fallback);
	if (fallbackIcon) return iconMetadataToResponse(fallbackIcon, reqUrl);
	return idAndFallbackNotFoundResponse(id, fallback);
};

const slugNotFoundResponse = (slug: string) => new Response(null, { status: 404, statusText: `Icon with slug \`${slug}\` not found` });
const fallbackSlugNotFoundResponse = (slug: string, fallbackSlug: string) => new Response(null, {
	status: 404,
	statusText: `Icon with slug \`${slug}\` and fallback slug \`${fallbackSlug}\` not found`
});

export const getIconBySlugWithFallback = async (slug: string, fallbackSlug: string|null, reqUrl: string) => {
	const icon = await getIconBySlug(slug);
	if (icon) return iconMetadataToResponse(icon, reqUrl);
	else if (!fallbackSlug) return slugNotFoundResponse(slug);

	const fallbackIcon = await getIconBySlug(fallbackSlug);
	if (fallbackIcon) return iconMetadataToResponse(fallbackIcon, reqUrl);
	return fallbackSlugNotFoundResponse(slug, fallbackSlug);
}
