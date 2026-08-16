import { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'
import type { Video } from '../data/videos'
import { getStreamUrl, getThumbnailUrl } from '../data/videos'

interface VideoPlayerProps {
    video: Video
}

export function VideoPlayer({ video }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const streamUrl = getStreamUrl(video.id)

    useEffect(() => {
        const element = videoRef.current
        if (!element) return

        if (Hls.isSupported()) {
            const hls = new Hls()
            hls.loadSource(streamUrl)
            hls.attachMedia(element)

            return () => {
                hls.destroy()
            }
        }

        if (element.canPlayType('application/vnd.apple.mpegurl')) {
            element.src = streamUrl
        }
    }, [streamUrl])

    return (
        <main className="player-content page-layout__main">
            <div className="player-header">
                <h1>{video.title}</h1>
                <h2>
                    {video.createdBy && (
                        <>
                            <span className="info">{video.createdBy} ({video.createdAt})</span>
                            <span className="seperator">|</span>
                        </>
                    )}
                    <span className="info">{video.info}</span>
                </h2>
            </div>

            <div className="player-wrapper">
                <video
                    ref={videoRef}
                    className="video-element"
                    controls
                    playsInline
                    autoPlay
                    poster={getThumbnailUrl(video.id)}
                />
            </div>
        </main >
    )
}
