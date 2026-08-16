import { VideoCard } from '../components/VideoCard'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { vod } from '../data/vod'

export function Gallery() {
    return (
        <div className="page-layout">
            <SiteHeader />

            <main className="gallery page-layout__main">
                <div className="gallery__grid">
                    {vod.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            </main>

            <SiteFooter />
        </div>
    )
}
