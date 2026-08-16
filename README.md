# ZenTV

A lightweight video gallery with adaptive HLS streaming. Built with React, Vite, and [hls.js](https://github.com/video-dev/hls.js/).

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/` — ready for static hosting.

## Deploy to Cloudflare Pages

1. Connect this repo to Cloudflare Pages
2. Build command: `npm run build`
3. Output directory: `dist`

The `public/_redirects` file enables client-side routing for `/watch/:id` URLs.

## Videos

Streams and thumbnails are loaded from `https://videos.mvzen.com/{id}/`.
