import React from 'react'
import { Link } from 'react-router-dom'

export function SiteFooter() {

    const isLoggedIn = localStorage.getItem('is_logged_in') === 'true'

    const handleLogout = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            // 1. Invalidate server-side HttpOnly cookie
            await fetch('/api/logout', { method: 'POST' })
        } catch (err) {
            console.error('Logout request failed:', err)
        } finally {
            // 2. Clear client storage & reload page to show login screen
            localStorage.removeItem('is_logged_in')
            window.location.href = '/'
        }
    }

    return (
        <footer className="site-footer discreet-surface">
            <p className="site-footer__text">
                <span>© Mark Veldhuizen</span>
                <span className="seperator">|</span>
                <Link to="https://tv.mvzen.com">tv.mvzen.com</Link>
                {isLoggedIn && (
                    <>
                        <span className="seperator">|</span>
                        <a href="#logout" onClick={handleLogout}>Log out</a>
                    </>
                )}
            </p>
        </footer>
    )
}
