'use client'

import '@videojs/react/video/minimal-skin.css'
import { Container } from '@videojs/react'
import { VideoPlayer, MinimalVideoSkin } from '@videojs/react/video'
import { HlsJsVideo } from '@videojs/react/media/hlsjs-video'
import type { Video } from '../data/videos'

interface MyPlayerProps {
    video: Video
}

export const Player = ({ video }: MyPlayerProps) => {
    return (
        <VideoPlayer poster={video.type !== 'live' ? video.thumbnail : undefined}>
            <Container style={{ width: '100%', aspectRatio: '16/9' }}>
                <MinimalVideoSkin>
                    <HlsJsVideo src={video.src} autoPlay playsInline />
                </MinimalVideoSkin>
            </Container>
        </VideoPlayer>
    )
}
