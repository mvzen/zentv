'use client'

import { useState, useEffect } from 'react'
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
    const [isIOS, setIsIOS] = useState(false)

    useEffect(() => {
        // Detect iOS / iPadOS Safari
        const userAgent = window.navigator.userAgent.toLowerCase()
        const isAppleMobile = /iphone|ipad|ipod/.test(userAgent) ||
            (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /macintosh/.test(userAgent))

        setIsIOS(!!isAppleMobile)
    }, [])

    return (
        <Player.Provider>
            <Player.Container style={{ width: '100%', aspectRatio: '16/9' }}>
                <MinimalVideoSkin>
                    {isIOS ? (
                        /* Native HTML5 video tag for iOS native HLS + AirPlay handoff */
                        <video
                            src={video.src}
                            autoPlay
                            playsInline
                            x-webkit-airplay="allow"
                            webkit-playsinline="true"
                            style={{ width: '100%', height: '100%' }}
                        />
                    ) : (
                        /* HlsJsVideo for Chrome, Edge, Firefox, and Desktop */
                        <HlsJsVideo
                            src={video.src}
                            autoPlay
                            playsInline
                        />
                    )}
                    {video.type !== 'live' && <Poster className="media-poster" src={video.thumbnail} />}
                </MinimalVideoSkin>
            </Player.Container>
        </Player.Provider>
    )
}
