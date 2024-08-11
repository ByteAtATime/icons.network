# icons.network

This is a simple CDN for EVM-compatible chain icons. All endpoints return SVG images, with dimensions 100x100.

[View the website](https://icons.network)

## Usage

You may either get icons using their chain ID:

```
<img src="https://icons.network/1" alt="Ethereum" />
<img src="https://icons.network/10" alt="Optimism" />
```

Or by their chain slug:

```
<img src="https://icons.network/eth" alt="Ethereum" />
<img src="https://icons.network/optimism" alt="Optimism" />
```

If you're relying on user input, you can add a `fallback` parameter to the URL:

```
<img src="https://icons.network/0?fallback=137" alt="Polygon" />
<img src="https://icons.network/this-doesnt-exist?fallback=mainnet" alt="Ethereum" />
```
