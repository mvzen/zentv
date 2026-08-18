import { useState } from 'react'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

interface LoginProps {
    onLoginSuccess: () => void
}

export function Login({ onLoginSuccess }: LoginProps) {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            })

            if (res.ok) {
                localStorage.setItem('is_logged_in', 'true')
                onLoginSuccess()
                window.location.reload()
            } else {
                setError('Incorrect password')
            }
        } catch {
            setError('An error occurred. Please try again.')
        }
    }

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
