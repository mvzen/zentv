const BASE_URL = 'https://videos.mvzen.com'
const LIVE_BASE_URL = 'https://live.mvzen.com'

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
        slug: 'cam1996',
        broadpeakId: 0,
        title: 'Caméscope 1996',
        info: 'Saint-Aubin & Dinard',
        type: 'asset',
        src: getStreamUrl('cam1996'),
        thumbnail: getThumbnailUrl('cam1996'),
        duration: 0,
        createdBy: 'Pierre',
        createdAt: 1996
    },
    {
        slug: 'cam2000',
        broadpeakId: 0,
        title: 'Caméscope 2000',
        info: 'Soirée Boulevard de la Tour d\'Auvergne',
        type: 'asset',
        src: getStreamUrl('cam2000'),
        thumbnail: getThumbnailUrl('cam2000'),
        duration: 0,
        createdBy: 'Pierre',
        createdAt: 2000
    },
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
        slug: 'markanne40',
        broadpeakId: 0,
        title: 'Mark & Anne (40 ans)',
        info: 'Diaporama 40 ans de Mark & Anne',
        type: 'asset',
        src: getStreamUrl('markanne40'),
        thumbnail: getThumbnailUrl('markanne40'),
        duration: 1016,
        createdBy: 'Corinne',
        createdAt: 2025
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
        createdBy: 'Hugo / Liam / Mark',
        createdAt: 2026
    },
    {
        slug: '10minside',
        broadpeakId: 0,
        title: 'Coco - 10 minutes inside',
        info: 'Reportage 40 ans de Coco',
        type: 'asset',
        src: getStreamUrl('10minside'),
        thumbnail: getThumbnailUrl('10minside'),
        duration: 880,
        createdBy: 'Mark',
        createdAt: 2026
    },
    {
        slug: 'zentv1',
        broadpeakId: 0,
        title: 'ZenTV1',
        info: '24/7 steaming channel',
        type: 'live',
        src: getLiveStreamUrl('zentv1'),
        thumbnail: getThumbnailUrl('flo60'),
    },
]

export function getStreamUrl(slug: string): string {
    return `${BASE_URL}/${slug}/master.m3u8`
}

export function getLiveStreamUrl(slug: string): string {
    return `${LIVE_BASE_URL}/${slug}/master.m3u8`
}

export function getThumbnailUrl(slug: string, extension: string = 'jpg'): string {
    return `${BASE_URL}/${slug}/preview.${extension}`
}

export function getVideoBySlug(slug: string): Video | undefined {
    return videos.find((video) => video.slug === slug)
}
