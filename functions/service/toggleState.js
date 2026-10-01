import { videos, getVideoBySlug } from '../../src/data/videos'

export async function onRequestGet(context) {
    const { env } = context
    const result = await updateService(env)
    return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" }
    });
}

async function updateService(env) {
    const API_ROOT = env.BROADPEAK_API_ROOT
    const API_KEY = env.BROADPEAK_API_KEY
    const SERVICE_ID = getVideoBySlug('zentv1lite').serviceId
    const SERVICE_TYPE = getVideoBySlug('zentv1lite').serviceType

    const service = await fetch(`${API_ROOT}/services/${SERVICE_TYPE}/${SERVICE_ID}`, {
        headers: { Authorization: `Bearer ${API_KEY}` }
    }).then(res => res.json())

    const payload = { ...service }

    // toggle the status between 'paused' and 'enabled'
    payload.state = (service.state === 'paused') ? 'enabled' : 'paused'

    try {
        const response = await fetch(`${API_ROOT}/services/${SERVICE_TYPE}/${SERVICE_ID}`, {
            method: 'PUT',
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

        return {
            message: payload.state === 'enabled' ? 'Service has been enabled. Please wait a moment.' : 'Service has been paused and will disconnect shortly.',
        }
    } catch (error) {
        console.error("Erreur d'exécution:", error)
        return { success: false, error: error.message }
    }
}
