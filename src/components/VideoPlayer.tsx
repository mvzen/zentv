'use client'

import '@videojs/react/video/minimal-skin.css'
import { createPlayer, videoFeatures, Poster } from '@videojs/react'
import { MinimalVideoSkin } from '@videojs/react/video'
import { HlsJsVideo } from '@videojs/react/media/hlsjs-video'
import type { Video } from '../data/videos'

const Player = createPlayer({ features: videoFeatures })

interface MyPlayerProps {
    video: Video
}

export const VideoPlayer = ({ video }: MyPlayerProps) => {
    return (
        <Player.Provider>
            <Player.Container style={{ width: '100%', aspectRatio: '16/9' }}>
                <MinimalVideoSkin>
                    <HlsJsVideo
                        src={video.src}
                        autoPlay
                        playsInline
                    />
                    {video.type !== 'live' && <Poster className="media-poster" src={video.thumbnail} />}
                </MinimalVideoSkin>
            </Player.Container>
        </Player.Provider>
    )
}
