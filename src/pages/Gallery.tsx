import { VideoCard } from '../components/VideoCard'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { videos } from '../data/videos'

export function Gallery() {
    return (
        <div className="page-layout">
            <SiteHeader />

            <main className="gallery page-layout__main">

                <h2>VOD / replay</h2>
                <div className="gallery__grid">
                    {videos.map((video) => (
                        (!video.isLive && <VideoCard key={video.id} video={video} />)
                    ))}
                </div>

                <hr />

                <h2>Live streams</h2>
                <div className="gallery__grid">
                    {videos.map((video) => (
                        (video.isLive && <VideoCard key={video.id} video={video} />)
                    ))}
                </div>

            </main>

            <SiteFooter />
        </div>
    )
}
