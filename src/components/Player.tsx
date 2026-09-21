'use client'

import '@videojs/react/video/minimal-skin.css'
import '@videojs/react/live-video/minimal-skin.css'
import { Container } from '@videojs/react'
import { VideoPlayer, MinimalVideoSkin } from '@videojs/react/video'
import { LiveVideoPlayer, MinimalLiveVideoSkin } from '@videojs/react/live-video'
import { HlsJsVideo } from '@videojs/react/media/hlsjs-video'
import type { Video } from '../data/videos'

interface MyPlayerProps {
    video: Video
}

export const Player = ({ video }: MyPlayerProps) => {

    if (video.type === 'live') {
        return (
            <LiveVideoPlayer>
                <Container style={{ width: '100%', aspectRatio: '16/9' }}>
                    <MinimalLiveVideoSkin>
                        <HlsJsVideo src={video.src} autoPlay playsInline />
                    </MinimalLiveVideoSkin>
                </Container>
            </LiveVideoPlayer>
        )
    } else {
        return (
            <VideoPlayer poster={video.thumbnail}>
                <Container style={{ width: '100%', aspectRatio: '16/9' }}>
                    <MinimalVideoSkin>
                        <HlsJsVideo src={video.src} autoPlay playsInline />
                    </MinimalVideoSkin>
                </Container>
            </VideoPlayer>
        )
    }
}
