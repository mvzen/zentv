import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Gallery } from './pages/Gallery'
import { Play } from './pages/Play'

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Gallery />} />
                <Route path="/play/:id" element={<Play />} />
            </Routes>
        </BrowserRouter>
    )
}
