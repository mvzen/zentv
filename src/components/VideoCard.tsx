import { Link } from 'react-router-dom'
import type { Video } from '../data/videos'
import { VideoPlayer } from '../components/VideoPlayer'

interface VideoCardProps {
    video: Video
}

export function VideoCard({ video }: VideoCardProps) {
    return (
        <Link to={`/play/${video.slug}`} className="video-card">
            <div className="video-card__image-wrap">
                {video.thumbnail ? (
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="video-card__image"
                        loading="lazy"
                    />
                ) : (
                    <VideoPlayer video={video} controls={false} />
                )}
                <div className="video-card__overlay">
                    <span className="video-card__play" aria-hidden="true">
                        ▶
                    </span>
                </div>
                {video.isLive && (
                    <span className="video-card__live" aria-hidden="true">LIVE</span>
                )}
            </div>
            <h3 className="video-card__title">{video.title}</h3>
        </Link>
    )
}
