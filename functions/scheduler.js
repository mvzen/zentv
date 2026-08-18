import { videos, getVideoBySlug } from '../src/data/videos'

export async function onScheduled({ request, env, ctx }) {
    await runScheduler(env)
}

export async function onRequestGet(context) {
    const { env } = context
    const result = await runScheduler(env)
    return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" }
    });
}

async function runScheduler(env) {
    const API_ROOT = env.BROADPEAK_API_ROOT
    const API_KEY = env.BROADPEAK_API_KEY
    const SERVICE_ID = getVideoBySlug('zentv1').broadpeakId

    let currentTime = new Date(Date.now())

    for (const asset of getVideoAssets()) {

        const payload = {
            name: asset.name,
            startTime: currentTime.toISOString(),
            duration: asset.duration,
            replacement: {
                id: asset.id
            }
        }

        try {
            const response = await fetch(`${API_ROOT}/services/content-replacement/${SERVICE_ID}/slots`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            const data = await response.text()

            if (!response.ok) {
                return { success: false, error: data }
            }
        } catch (error) {
            console.error("Erreur d'exécution:", error)
            return { success: false, error: error.message }
        }

        currentTime = new Date(currentTime.getTime() + asset.duration * 1000)
    }

    return { success: true, message: "Slots programmé" }
}

function getVideoAssets() {
    const assets = []

    videos.map((video) => {
        if (video.type !== 'asset') return; // Skip if not an asset
        if (video.slug !== 'sensdelafamille') return; // Skip if not an asset
        assets.push({
            id: video.broadpeakId,
            name: video.title,
            duration: video.duration,
        })
    })

    return assets
}
