import React from 'react'

export function SiteFooter() {

    const isLoggedIn = localStorage.getItem('is_logged_in') === 'true'

    const handleLogout = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            await fetch('/api/logout', { method: 'POST' })
        } catch (err) {
            console.error('Logout request failed:', err)
        } finally {
            localStorage.removeItem('is_logged_in')
            window.location.href = '/'
        }
    }

    return (
        <footer className="site-footer discreet-surface">
            <p className="site-footer__text">
                <span>© Mark Veldhuizen</span>
                <span className="seperator">|</span>
                <a href="https://tv.mvzen.com">tv.mvzen.com</a>
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
