import { useParams } from 'react-router-dom'
import { LiveControls } from '../components/LiveControls'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { VideoPlayer } from '../components/VideoPlayer'
import { getVideoBySlug } from '../data/videos'

export function Play() {
    const { id } = useParams<{ id: string }>()
    const video = id ? getVideoBySlug(id) : undefined

    if (!video) {
        return 'Video not found'
    }

    return (
        <div className="page-layout">
            <SiteHeader />
            <main className="page-layout__main">
                <div className="player-content">

                    <div className="player-header">
                        <h1>
                            <span className="title">{video.title}</span>
                            {video.type === 'live' && (
                                <span className="live-tag" aria-hidden="true">LIVE</span>
                            )}
                        </h1>
                        <h2>
                            {video.createdBy && (
                                <>
                                    <span className="info">{video.createdBy} ({video.createdAt})</span>
                                    <span className="seperator">|</span>
                                </>
                            )}
                            {video.info && <span className="info">{video.info}</span>}
                        </h2>
                    </div>

                    <div className={'player-wrapper' + (video.type === 'live' ? ' is-live' : '')}>
                        <VideoPlayer video={video} />
                    </div>

                    {video.type === 'live' && <LiveControls />}

                </div>
            </main>
            <SiteFooter />
        </div >
    )
}
