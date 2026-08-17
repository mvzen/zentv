import { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import type { Video } from '../data/videos'

interface VideoPlayerProps {
    video: Video
}

export function VideoPlayer({ video }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const element = videoRef.current
        if (!element) return

        if (Hls.isSupported()) {
            const hls = new Hls()
            hls.loadSource(video.src)
            hls.attachMedia(element)

            return () => {
                hls.destroy()
            }
        }

        if (element.canPlayType('application/vnd.apple.mpegurl')) {
            element.src = video.src
        }
    }, [video.src])

    return (
        <video
            ref={videoRef}
            className="video-element"
            controls
            playsInline
            autoPlay
            poster={video.thumbnail}
        />
    )
}
