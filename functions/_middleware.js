// functions/_middleware.js

export async function onRequest(context) {
    const { request, env } = context
    const url = new URL(request.url)

    // Allow login AND logout endpoints without requiring an active cookie
    if (url.pathname === '/api/login' || url.pathname === '/api/logout') {
        return await context.next();
    }

    const REQUIRED_PASSWORD = env.PASSWORD
    const cookieHeader = request.headers.get('Cookie') || ''

    // Check if the auth cookie matches the expected password
    if (cookieHeader.includes(`site_auth=${REQUIRED_PASSWORD}`)) {
        return await context.next()
    }

    // If no valid cookie, rewrite the request to serve the site's HTML,
    // where React will show the lock screen
    return await context.next()
}
