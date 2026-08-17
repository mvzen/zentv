
// 1. Déclenchement automatique via Cron Trigger (exécuté par Cloudflare)
export async function onScheduled({ request, env, ctx }) {
    await getSources(env);
}

// 2. Déclenchement manuel via HTTP GET (pratique pour tester depuis votre navigateur ou Postman)
export async function onRequestGet(context) {
    const { env } = context;
    const result = await getSources(env);
    return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" }
    });
}

// Logique principale d'envoi du Slot vers broadpeak.io
async function getSources(env) {
    const API_KEY = env.BROADPEAK_API_KEY;

    try {
        const response = await fetch(`https://api.broadpeak.io/v1/services`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
        });

        const data = await response.text();

        if (!response.ok) {
            return { success: false, error: data };
        }

        return { success: true, message: data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
