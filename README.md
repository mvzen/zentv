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

Vibe coded with Cursor and fine-tuned by hand.

## Generate thumbnail
`ffmpeg -ss 00:00:05.00 -i markanne40.mp4 -vf 'scale=640:640:force_original_aspect_ratio=decrease' -vframes 1 markanne40/preview.jpg`

## Generate HLS from mp4
```console
ffmpeg -i ../markanne40.mp4 \
  -filter_complex "[0:v]split=3[v1][v2][v3];[v1]scale=w=1920:h=1080[v1out];[v2]scale=w=1280:h=720[v2out];[v3]scale=w=854:h=480[v3out]" \
  -map "[v1out]" -c:v:0 libx264 -b:v:0 5000k \
  -map "[v2out]" -c:v:1 libx264 -b:v:1 3000k \
  -map "[v3out]" -c:v:2 libx264 -b:v:2 1000k \
  -map a:0 -c:a:0 aac -b:a:0 128k \
  -map a:0 -c:a:1 aac -b:a:1 128k \
  -map a:0 -c:a:2 aac -b:a:2 96k \
  -f hls \
  -hls_time 6 \
  -hls_playlist_type vod \
  -hls_segment_filename "v%v/segment_%03d.ts" \
  -master_pl_name master.m3u8 \
  -var_stream_map "v:0,a:0 v:1,a:1 v:2,a:2" \
  v%v/index.m3u8
```

## Sync R2 Storage
`rclone sync . r2:zenvideos -P`
