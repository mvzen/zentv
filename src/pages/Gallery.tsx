import { VideoCard } from '../components/VideoCard'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { videos } from '../data/videos'

export function Gallery() {
    const vodVideos = videos.filter((video) => video.type === 'asset')
    const liveVideos = videos.filter((video) => video.type === 'live')

    return (
        <div className="page-layout">
            <SiteHeader />
            <main className="page-layout__main">
                <div className="gallery">

                    {vodVideos.length > 0 && (
                        <>
                            <h2>On Demand</h2>
                            <div className="gallery__grid">
                                {vodVideos.map((vodVideo) => (
                                    <VideoCard key={vodVideo.slug} video={vodVideo} />
                                ))}
                            </div>
                        </>
                    )}

                    {liveVideos.length > 0 && (
                        <>
                            <hr />
                            <h2>Live</h2>
                            <div className="gallery__grid">
                                {liveVideos.map((liveVideo) => (
                                    <VideoCard key={liveVideo.slug} video={liveVideo} />
                                ))}
                            </div>
                        </>
                    )}

                </div>
            </main>
            <SiteFooter />
        </div>
    )
}
