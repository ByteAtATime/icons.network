<main>
	<h1>Network icons shouldn't be this hard to get</h1>
	<p>So I made this simple tool, to allow you to get them as an SVG.</p>

	<p>You can get them by chain ID...</p>

	<div>
		<div>
			<img src="/id/1" alt="Ethereum" /> <code>&lt;img src="https://icons.network/id/1" /&gt;</code>
		</div>
		<div>
			<img src="/id/10" alt="Optimism" />
			<code>&lt;img src="https://icons.network/id/10" /&gt;</code>
		</div>
	</div>

	<p>Or by network slug (more readable, as long as it's not user input)...</p>

	<div>
		<div>
			<img src="/slug/mainnet" alt="Ethereum" />
			<code>&lt;img src="https://icons.network/slug/mainnet" /&gt;</code>
		</div>
		<div>
			<img src="/slug/optimism" alt="Optimism" />
			<code>&lt;img src="https://icons.network/slug/optimism" /&gt;</code>
		</div>
	</div>

	<p>Relying on user input? You can add a fallback chain!</p>

	<div>
		<div>
			<img src="/id/0?fallback=10" alt="Optimism" />
			<code>&lt;img src="https://icons.network/id/0?fallback=10" /&gt;</code>
		</div>

		<div>
			<img src="/slug/this-doesnt-exist?fallback=ethereum" alt="Unknown" />
			<code>&lt;img src="https://icons.network/slug/this-doesnt-exist?fallback=ethereum" /&gt;</code>
		</div>
	</div>

	<p>
		Have a chain you want to add?
		<a href="https://github.com/ByteAtATime/icons.network"><strong>Contribute!</strong></a>
	</p>
</main>

<style>
    main {
        font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
        'Segoe UI Emoji', 'Segoe UI Symbol';
        font-size: 1.5rem;

        display: flex;
        flex-direction: column;
        gap: 12px 0;
        align-items: center;
        text-align: center;
    }

    main > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px 0;
    }

    main > div > div {
        display: flex;
        align-items: center;
        gap: 0 8px;
    }

    main > div > div > img {
        width: 48px;
        height: 48px;
    }
</style>
