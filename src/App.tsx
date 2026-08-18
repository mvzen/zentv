import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Gallery } from './pages/Gallery'
import { Login } from './pages/Login'
import { Play } from './pages/Play'

export function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('is_logged_in') === 'true'
    })

    if (!isAuthenticated) {
        return <Login onLoginSuccess={() => setIsAuthenticated(true)} />
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
