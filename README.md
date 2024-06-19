# icons.network

A simple CDN for network icons.

## Usage

There are two ways to use the icons:

1. `/id/*` allows you to get a chain icon by their id. For example, `/id/1` will return the icon for the Ethereum mainnet, and `/id/10` will return the icon for Optimism.
2. `/slug/*` allows you to get a chain icon by their slug. For example, `/slug/mainnet` will return the icon for the Ethereum mainnet, and `/slug/optimism` will return the icon for Optimism.

All images are returned as SVGs. If an image doesn't exist, a 404 error will be returned. Alternatively, by adding a `fallback` query parameter, a default icon will be returned instead. The value of `fallback` depends on the endpoint (for `/id/*`, it's the id of the chain, and for `/slug/*`, it's the slug of the chain).
