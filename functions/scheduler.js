// functions/scheduler.js

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

// Main logic for sending the Slot to broadpeak.io
async function runScheduler(env) {
    const API_KEY = env.BROADPEAK_API_KEY;
    const SERVICE_ID = env.BROADPEAK_SERVICE_ID;
    const ASSET_1_ID = env.ASSET_1_ID;

    const now = new Date();
    const startTime = now.toISOString();

    const payload = {
        name: "Slot Automatique Pages",
        startTime: startTime,
        duration: 300,
        replacement: {
            id: Number(ASSET_1_ID)
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
            console.error("Erreur Broadpeak:", data);
            return { success: false, error: data };
        }

        console.log("Slot programmé avec succès !");
        return { success: true, message: "Slot programmé" };
    } catch (error) {
        console.error("Erreur d'exécution:", error);
        return { success: false, error: error.message };
    }
}
