const BASE_URL = 'https://videos.mvzen.com'

export interface Video {
    slug: string
    broadpeakId?: number
    title: string
    info?: string
    type: 'asset' | 'live'
    src: string
    thumbnail?: string
    duration?: number
    createdBy?: string
    createdAt?: number
}

export const videos: Video[] = [
    {
        slug: 'flo60',
        broadpeakId: 215524,
        title: 'Florence (60 ans)',
        info: 'Joan Baez - Diamonds & Rust',
        type: 'asset',
        src: getStreamUrl('flo60'),
        thumbnail: getThumbnailUrl('flo60'),
        duration: 203,
        createdBy: 'Les Quatre Cousins',
        createdAt: 2018
    },
    {
        slug: 'lily80',
        broadpeakId: 213843,
        title: 'Lily (80 ans)',
        info: 'Simon & Garfunkel - The Sound of Silence',
        type: 'asset',
        src: getStreamUrl('lily80'),
        thumbnail: getThumbnailUrl('lily80'),
        duration: 206,
        createdBy: 'Les Quatre Cousins',
        createdAt: 2022
    },
    {
        slug: 'christine70',
        broadpeakId: 213846,
        title: 'Christine (70 ans)',
        info: 'Tracy Chapman - Telling Stories',
        type: 'asset',
        src: getStreamUrl('christine70'),
        thumbnail: getThumbnailUrl('christine70'),
        duration: 255,
        createdBy: 'Les Quatre Cousins',
        createdAt: 2023
    },
    {
        slug: 'coco40',
        broadpeakId: 215523,
        title: 'Coco (40 ans)',
        info: 'Kids United - On écrit sur les murs',
        type: 'asset',
        src: getStreamUrl('coco40'),
        thumbnail: getThumbnailUrl('coco40'),
        duration: 195,
        createdBy: 'Les Quatre Cousins',
        createdAt: 2026
    },
    {
        slug: 'sensdelafamille',
        broadpeakId: 215525,
        title: 'Coco - Sens de la famille',
        info: 'Grand Corps Malade - Le sens de la famille',
        type: 'asset',
        src: getStreamUrl('sensdelafamille'),
        thumbnail: getThumbnailUrl('sensdelafamille'),
        duration: 199,
        createdBy: 'Dad & Kids',
        createdAt: 2026
    },
    {
        slug: 'zentv1',
        broadpeakId: 83498,
        title: 'ZenTV1',
        type: 'live',
        src: 'https://stream.broadpeak.io/96b250a90d3cf0869f46237472e7183d/bpk-tv/cycling/default/index.m3u8',
        thumbnail: getThumbnailUrl('zentv1', 'gif'),
    },
]

export function getStreamUrl(slug: string): string {
    return `${BASE_URL}/${slug}/master.m3u8`
}

export function getThumbnailUrl(slug: string, extension: string = 'jpg'): string {
    return `${BASE_URL}/${slug}/preview.${extension}`
}

export function getVideoBySlug(slug: string): Video | undefined {
    return videos.find((video) => video.slug === slug)
}
