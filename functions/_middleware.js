// functions/_middleware.js

export async function onRequest(context) {
    const { request, env } = context
    const url = new URL(request.url)

    // Allow access to the login API endpoint without a cookie
    if (url.pathname === '/api/login') {
        return await context.next()
    }

    const REQUIRED_PASSWORD = 'hugoliam'
    const cookieHeader = request.headers.get('Cookie') || ''

    // Check if the auth cookie matches the expected password
    if (cookieHeader.includes(`site_auth=${REQUIRED_PASSWORD}`)) {
        return await context.next()
    }

    // If no valid cookie, rewrite the request to serve the site's HTML,
    // where React will show the lock screen
    return await context.next()
}
