// functions/api/logout.js
export async function onRequestPost() {
    // Set Max-Age=0 to tell the browser to immediately discard the cookie
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Set-Cookie': 'site_auth=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict'
    })

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers
    })
}
