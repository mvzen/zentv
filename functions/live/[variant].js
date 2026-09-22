// Map your VOD files with exact variant names and durations (in seconds).
// All segment durations should ideally be uniform (e.g., 6.0 seconds per segment).
const R2_BASE_URL = "https://videos.mvzen.com";

// Function to generate padded segment URLs dynamically
const generateSegments = (vodName, count, targetDuration = 6.0) => {
    return Array.from({ length: count }, (_, i) => {
        // Pad numbers with leading zeros up to 3 digits (1 -> "001", 32 -> "032")
        const segmentNumber = String(i).padStart(3, '0');
        return {
            url: `${R2_BASE_URL}/${vodName}/v2/segment_${segmentNumber}.ts`,
            duration: targetDuration,
        };
    });
};

// Updated PLAYLIST configuration
const PLAYLIST = [
    {
        id: "flo60",
        segments: generateSegments("flo60", 34, 14.0), // Generates segment_001.ts through segment_010.ts
    },
    {
        id: "christine70",
        segments: generateSegments("christine70", 41, 13.0),  // Generates segment_001.ts through segment_007.ts
    },
    {
        id: "lily80",
        segments: generateSegments("lily80", 32, 11.0), // Generates segment_001.ts through segment_032.ts
    },
    {
        id: "coco40",
        segments: generateSegments("coco40", 35, 11.0),  // Generates segment_001.ts through segment_007.ts
    },
];

// Helper: Calculate total duration of all video streams combined
function getTotalDuration(playlist) {
    return playlist.reduce((total, vod) => {
        return total + vod.segments.reduce((sTotal, s) => sTotal + s.duration, 0);
    }, 0);
}

// Helper: Flatten all segments into a continuous timeline array with metadata
function buildTimeline(playlist) {
    let timeline = [];
    let globalIndex = 0;

    for (const vod of playlist) {
        for (let i = 0; i < vod.segments.length; i++) {
            timeline.push({
                globalIndex: globalIndex++,
                vodId: vod.id,
                isFirstInVod: i === 0,
                duration: vod.segments[i].duration,
                url: vod.segments[i].url,
            });
        }
    }
    return timeline;
}

export async function onRequest(context) {
    const timeline = buildTimeline(PLAYLIST);
    const totalDuration = getTotalDuration(PLAYLIST);

    // 1. Determine current timeline position in seconds
    const nowSeconds = Date.now() / 1000;
    const currentLoopTime = nowSeconds % totalDuration;

    // 2. Locate active segment index matching current time
    let accumulatedTime = 0;
    let currentSegmentIndex = 0;

    for (let i = 0; i < timeline.length; i++) {
        if (accumulatedTime + timeline[i].duration > currentLoopTime) {
            currentSegmentIndex = i;
            break;
        }
        accumulatedTime += timeline[i].duration;
    }

    // 3. Extract a sliding window of 5 segments
    const WINDOW_SIZE = 5;
    const windowSegments = [];

    for (let i = 0; i < WINDOW_SIZE; i++) {
        const idx = (currentSegmentIndex + i) % timeline.length;
        windowSegments.push(timeline[idx]);
    }

    // 1. Calculate the target duration dynamically based on the current window
    const maxSegmentDuration = Math.max(...windowSegments.map((s) => s.duration));
    const targetDuration = Math.ceil(maxSegmentDuration);

    // 2. Compute media sequence based on window index
    const mediaSequence = Math.floor(nowSeconds / 10);

    // 3. Build Manifest Header
    let m3u8 = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:${targetDuration}
#EXT-X-MEDIA-SEQUENCE:${mediaSequence}
`;

    let lastVodId = null;

    for (const seg of windowSegments) {
        // Inject DISCONTINUITY if crossing into a new video stream
        if (seg.isFirstInVod || (lastVodId && lastVodId !== seg.vodId)) {
            m3u8 += `#EXT-X-DISCONTINUITY\n`;
        }
        m3u8 += `#EXTINF:${seg.duration.toFixed(3)},\n`;
        m3u8 += `${seg.url}\n`;
        lastVodId = seg.vodId;
    }

    // 5. Return with zero-cache HTTP headers
    return new Response(m3u8, {
        headers: {
            "Content-Type": "application/vnd.apple.mpegurl",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Access-Control-Allow-Origin": "*",
        },
    });
}
