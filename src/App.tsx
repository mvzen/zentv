import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Gallery } from './pages/Gallery'
import { WatchPage } from './pages/WatchPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/watch/:id" element={<WatchPage />} />
      </Routes>
    </BrowserRouter>
  )
}
