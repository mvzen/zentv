import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Gallery } from './pages/Gallery'
import { Vod } from './pages/Vod'
import { Live } from './pages/Live'

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Gallery />} />
                <Route path="/vod/:id" element={<Vod />} />
                <Route path="/live/:id" element={<Live />} />
            </Routes>
        </BrowserRouter>
    )
}
