import { Link } from 'react-router-dom'

export function SiteHeader() {
    return (
        <header className="site-header discreet-surface">
            <div className="site-header__inner">
                <span className="site-header__logo"><Link to="/">ZenTV</Link></span>
                <span className="site-header__tagline">Adaptive video streaming playground</span>
            </div>
        </header >
    )
}
