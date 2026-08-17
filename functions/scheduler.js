import { videos, getVideoBySlug } from '../src/data/videos'

// 1. Automatically triggered via Cron Trigger (executed by Cloudflare)
export async function onScheduled({ request, env, ctx }) {
    await runScheduler(env);
}

// 2. Manually triggered via HTTP GET (useful for testing from your browser or Postman)
export async function onRequestGet(context) {
    const { env } = context;
    const result = await runScheduler(env);
    return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" }
    });
}

// Main logic for sending the slots to broadpeak.io
async function runScheduler(env) {
    const API_KEY = env.BROADPEAK_API_KEY;
    const SERVICE_ID = getVideoBySlug('zentv1').broadpeakId

    let currentTime = new Date();

    for (const asset of getVideoAssets()) {

        const payload = {
            name: asset.name,
            startTime: currentTime.toISOString(),
            duration: asset.duration,
            replacement: {
                id: asset.id
            },
            type: 'content',
        };

        try {
            const response = await fetch(`https://api.broadpeak.io/v1/services/virtual-channel/${SERVICE_ID}/slots`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.text();

            if (!response.ok) {
                return { success: false, error: data };
            }
        } catch (error) {
            console.error("Erreur d'exécution:", error);
            return { success: false, error: error.message };
        }

        currentTime = new Date(currentTime.getTime() + asset.duration * 1000);
    }

    return { success: true, message: "Slots programmé" };
}

function getVideoAssets() {
    const assets = [];

    videos.map((video) => {
        if (video.type !== 'asset') return; // Skip if not an asset
        if (video.slug !== 'sensdelafamille') return; // Skip if not an asset
        assets.push({
            id: video.broadpeakId,
            name: video.title,
            duration: video.duration,
        });
    });

    return assets;
}
