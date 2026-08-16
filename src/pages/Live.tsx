import { useParams } from 'react-router-dom'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { VideoPlayer } from '../components/VideoPlayer'
import { getVideoById } from '../data/vod'

export function Live() {
    const { id } = useParams<{ id: string }>()
    const video = id ? getVideoById(id) : undefined

    if (!video) {
        return 'Video not found'
    }

    return (
        <div className="page-layout">
            <SiteHeader />
            <VideoPlayer video={video} />
            <SiteFooter />
        </div >
    )
}
