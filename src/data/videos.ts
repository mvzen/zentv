const BASE_URL = 'https://videos.mvzen.com'

export interface Video {
    id: string
    title: string
    info: string
    src: string
    isLive?: boolean | false
    thumbnail?: string
    createdBy?: string
    createdAt?: number
}

export const videos: Video[] = [
    {
        id: 'flo60',
        title: 'Florence (60 ans)',
        info: 'Joan Baez - Diamonds & Rust',
        src: getStreamUrl('flo60'),
        thumbnail: getThumbnailUrl('flo60'),
        createdBy: 'Les Quatre Cousins',
        createdAt: 2018
    },
    {
        id: 'lily80',
        title: 'Lily (80 ans)',
        info: 'Simon & Garfunkel - The Sound of Silence',
        src: getStreamUrl('lily80'),
        thumbnail: getThumbnailUrl('lily80'),
        createdBy: 'Les Quatre Cousins',
        createdAt: 2022
    },
    {
        id: 'christine70',
        title: 'Christine (70 ans)',
        info: 'Tracy Chapman - Telling Stories',
        src: getStreamUrl('christine70'),
        thumbnail: getThumbnailUrl('christine70'),
        createdBy: 'Les Quatre Cousins',
        createdAt: 2023
    },
    {
        id: 'coco40',
        title: 'Coco (40 ans)',
        info: 'Kids United - On écrit sur les murs',
        src: getStreamUrl('coco40'),
        thumbnail: getThumbnailUrl('coco40'),
        createdBy: 'Les Quatre Cousins',
        createdAt: 2026
    },
    {
        id: 'sensdelafamille',
        title: 'Coco - Sens de la famille',
        info: 'Grand Corps Malade - Le sens de la famille',
        src: getStreamUrl('sensdelafamille'),
        thumbnail: getThumbnailUrl('sensdelafamille'),
        createdBy: 'Dad & Kids',
        createdAt: 2026
    },
    {
        id: 'live-zentv',
        title: 'Zen TV1',
        info: 'Live stream',
        src: 'https://stream.broadpeak.io/96b250a90d3cf086a2ae6aa4f5be592d/bpk-tv/cycling/default/index.m3u8',
        isLive: true
    },
    {
        id: 'live-bpio',
        title: 'Test Broadpeak.io',
        info: 'Broadpeak.io test live stream',
        src: 'https://stream.broadpeak.io/96b250a90d3cf086a2ae6aa4f5be592d/bpk-tv/cycling/default/index.m3u8',
        isLive: true
    },
]

export function getStreamUrl(id: string): string {
    return `${BASE_URL}/${id}/master.m3u8`
}

export function getThumbnailUrl(id: string): string {
    return `${BASE_URL}/${id}/preview.jpg`
}

export function getVideoById(id: string): Video | undefined {
    return videos.find((video) => video.id === id)
}
