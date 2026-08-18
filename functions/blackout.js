import { videos, getVideoBySlug } from '../src/data/videos'

export async function onRequestGet(context) {
    const { env } = context
    const result = await replaceContent(env)
    return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" }
    });
}

async function replaceContent(env) {
    const API_ROOT = env.BROADPEAK_API_ROOT
    const API_KEY = env.BROADPEAK_API_KEY
    const SERVICE_ID = getVideoBySlug('zentv1').broadpeakId

    const currentTime = new Date(Date.now())

    const payload = {
        name: 'Blackout',
        startTime: currentTime.toISOString(),
        duration: 300, // 5 minutes
        replacement: {
            id: 215573
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
}
