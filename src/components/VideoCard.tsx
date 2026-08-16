import { Link } from 'react-router-dom'
import type { Video } from '../data/videos'
import { getThumbnailUrl } from '../data/videos'

interface VideoCardProps {
  video: Video
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link to={`/watch/${video.id}`} className="video-card">
      <div className="video-card__image-wrap">
        <img
          src={getThumbnailUrl(video.id)}
          alt={video.title}
          className="video-card__image"
          loading="lazy"
        />
        <div className="video-card__overlay">
          <span className="video-card__play" aria-hidden="true">
            ▶
          </span>
        </div>
      </div>
      <h2 className="video-card__title">{video.title}</h2>
    </Link>
  )
}
