// functions/api/login.js
export async function onRequestPost(context) {
    const { request, env } = context
    const REQUIRED_PASSWORD = env.SITE_PASSWORD

    try {
        const { password } = await request.json()

        if (password === REQUIRED_PASSWORD) {
            // 1 year duration in seconds (365 days)
            const maxAge = 60 * 60 * 24 * 365;

            // Set HttpOnly, Secure cookie so JS can't tamper with it
            const headers = new Headers({
                'Content-Type': 'application/json',
                'Set-Cookie': `site_auth=${REQUIRED_PASSWORD}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Strict`
            })

            return new Response(JSON.stringify({ success: true }), { status: 200, headers })
        }

        return new Response(JSON.stringify({ error: 'Incorrect password' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 })
    }
}
