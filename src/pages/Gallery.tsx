import { VideoCard } from '../components/VideoCard'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { videos } from '../data/videos'

export function Gallery() {
    return (
        <div className="page-layout">
            <SiteHeader />
            <main className="page-layout__main">
                <div className="gallery">

                    <h2>On Demand</h2>
                    <div className="gallery__grid">
                        {videos.map((video) => (
                            (video.type === 'asset' && <VideoCard key={video.slug} video={video} />)
                        ))}
                    </div>

                    <hr />

                    <h2>Live</h2>
                    <div className="gallery__grid">
                        {videos.map((video) => (
                            (video.type === 'live' && <VideoCard key={video.slug} video={video} />)
                        ))}
                    </div>

                </div>
            </main>
            <SiteFooter />
        </div>
    )
}
