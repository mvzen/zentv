import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { Gallery } from './pages/Gallery'
import { Play } from './pages/Play'

export function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('is_logged_in') === 'true';
    });
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            localStorage.setItem('is_logged_in', 'true');
            setIsAuthenticated(true);
            window.location.reload();
        } else {
            setError('Incorrect password');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="page-layout">
                <SiteHeader />
                <main className="page-layout__main login-form">
                    <form onSubmit={handleLogin}>
                        <h2>Log in to ZenTV</h2>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="error">{error}</p>}
                        <button type="submit">Connect</button>
                    </form>
                </main>
                <SiteFooter />
            </div>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Gallery />} />
                <Route path="/play/:id" element={<Play />} />
            </Routes>
        </BrowserRouter>
    )
}
