// /functions/live/master.js
export async function onRequest() {
    const masterManifest = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-STREAM-INF:BANDWIDTH=10743637,AVERAGE-BANDWIDTH=5090496,RESOLUTION=1920x1080,CODECS="avc1.640028,mp4a.40.2"
v0.m3u8

#EXT-X-STREAM-INF:BANDWIDTH=6474591,AVERAGE-BANDWIDTH=3132007,RESOLUTION=1280x720,CODECS="avc1.64001f,mp4a.40.2"
v1.m3u8

#EXT-X-STREAM-INF:BANDWIDTH=2225651,AVERAGE-BANDWIDTH=1117977,RESOLUTION=854x480,CODECS="avc1.64001e,mp4a.40.2"
v2.m3u8
`;

    return new Response(masterManifest, {
        headers: {
            "Content-Type": "application/vnd.apple.mpegurl",
            "Cache-Control": "max-age=86400", // Master playlist rarely changes
            "Access-Control-Allow-Origin": "*",
        },
    });
}