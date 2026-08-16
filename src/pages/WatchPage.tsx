import { Link, useParams } from 'react-router-dom'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { VideoPlayer } from '../components/VideoPlayer'
import { getVideoById } from '../data/videos'

export function WatchPage() {
  const { id } = useParams<{ id: string }>()
  const video = id ? getVideoById(id) : undefined

  if (!video) {
    return (
      <div className="page-layout">
        <SiteHeader />
        <main className="error-page page-layout__main">
          <h1>Video not found</h1>
          <p>This video doesn&apos;t exist in the gallery.</p>
          <Link to="/" className="back-link">
            ← Back to videos
          </Link>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return <VideoPlayer video={video} />
}
