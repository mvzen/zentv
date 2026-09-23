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

## Generate GIF
`ffmpeg -i lily80.mp4 -ss 00:01:19 -t 6 -vf "fps=8,scale=-1:240" -sws_flags area preview.gif`

## Generate HLS from mp4
```console
ffmpeg -i input.mp4 \
  -filter_complex \
  "[0:v]split=3[v0_in][v1_in][v2_in]; \
   [v0_in]scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2[v0_out]; \
   [v1_in]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2[v1_out]; \
   [v2_in]scale=852:480:force_original_aspect_ratio=decrease,pad=852:480:(ow-iw)/2:(oh-ih)/2[v2_out]" \
  \
  -map "[v0_out]" -map 0:a? \
  -c:v:0 libx264 -preset medium -pix_fmt yuv420p -profile:v:0 high \
  -b:v:0 4500k -maxrate:v:0 5000k -bufsize:v:0 10000k \
  -g 120 -keyint_min 120 -sc_threshold 0 \
  -c:a:0 aac -b:a:0 128k -ar:a:0 48000 -ac:a:0 2 \
  -f hls -hls_time 4 -hls_playlist_type vod \
  -hls_flags create_dir \
  -hls_segment_filename "v0/segment_%03d.ts" v0/index.m3u8 \
  \
  -map "[v1_out]" -map 0:a? \
  -c:v:1 libx264 -preset medium -pix_fmt yuv420p -profile:v:1 main \
  -b:v:1 2500k -maxrate:v:1 2800k -bufsize:v:1 5600k \
  -g 120 -keyint_min 120 -sc_threshold 0 \
  -c:a:1 aac -b:a:1 128k -ar:a:1 48000 -ac:a:1 2 \
  -f hls -hls_time 4 -hls_playlist_type vod \
  -hls_flags create_dir \
  -hls_segment_filename "v1/segment_%03d.ts" v1/index.m3u8 \
  \
  -map "[v2_out]" -map 0:a? \
  -c:v:2 libx264 -preset medium -pix_fmt yuv420p -profile:v:2 main \
  -b:v:2 1000k -maxrate:v:2 1200k -bufsize:v:2 2400k \
  -g 120 -keyint_min 120 -sc_threshold 0 \
  -c:a:2 aac -b:a:2 128k -ar:a:2 48000 -ac:a:2 2 \
  -f hls -hls_time 4 -hls_playlist_type vod \
  -hls_flags create_dir \
  -hls_segment_filename "v2/segment_%03d.ts" v2/index.m3u8
```

## Sync R2 Storage
`rclone sync . r2:zenvideos --exclude ".DS_Store" -P`
