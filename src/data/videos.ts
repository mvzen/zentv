const BASE_URL = 'https://videos.mvzen.com'
const LIVE_BASE_URL = 'https://live.mvzen.com'
const BPKIO_STREAM_URL = 'https://stream.broadpeak.io/e464f78f1b3fa6bfbd1b539abb2ba2cf'

export interface Video {
    slug: string
    title: string
    info?: string
    type: 'asset' | 'live'
    src: string
    thumbnail?: string
    createdBy?: string
    createdAt?: number
}

export const videos: Video[] = [
    // {
    //     slug: 'cam1996',
    //     broadpeakId: 0,
    //     title: 'Caméscope 1996',
    //     info: 'Saint-Aubin & Dinard',
    //     type: 'asset',
    //     src: getVideoUrl('cam1996'),
    //     thumbnail: getThumbnailUrl('cam1996'),
    //     duration: 0,
    //     createdBy: 'Pierre',
    //     createdAt: 1996
    // },
    // {
    //     slug: 'cam2000',
    //     broadpeakId: 0,
    //     title: 'Caméscope 2000',
    //     info: 'Soirée Boulevard de la Tour d\'Auvergne',
    //     type: 'asset',
    //     src: getVideoUrl('cam2000'),
    //     thumbnail: getThumbnailUrl('cam2000'),
    //     duration: 0,
    //     createdBy: 'Pierre',
    //     createdAt: 2000
    // },
    {
        slug: 'flo60',
        title: 'Florence (60 ans)',
        info: 'Joan Baez - Diamonds & Rust',
        type: 'asset',
        src: getVideoUrl('flo60'),
        thumbnail: getThumbnailUrl('flo60'),
        createdBy: 'Les Quatre Cousins',
        createdAt: 2018
    },
    {
        slug: 'lily80',
        title: 'Lily (80 ans)',
        info: 'Simon & Garfunkel - The Sound of Silence',
        type: 'asset',
        src: getVideoUrl('lily80'),
        thumbnail: getThumbnailUrl('lily80'),
        createdBy: 'Les Quatre Cousins',
        createdAt: 2022
    },
    {
        slug: 'christine70',
        title: 'Christine (70 ans)',
        info: 'Tracy Chapman - Telling Stories',
        type: 'asset',
        src: getVideoUrl('christine70'),
        thumbnail: getThumbnailUrl('christine70'),
        createdBy: 'Les Quatre Cousins',
        createdAt: 2023
    },
    {
        slug: 'markanne40',
        title: 'Mark & Anne (40 ans)',
        info: 'Diaporama 40 ans de Mark & Anne',
        type: 'asset',
        src: getVideoUrl('markanne40'),
        thumbnail: getThumbnailUrl('markanne40'),
        createdBy: 'Corinne',
        createdAt: 2025
    },
    {
        slug: 'coco40',
        title: 'Coco (40 ans)',
        info: 'Kids United - On écrit sur les murs',
        type: 'asset',
        src: getVideoUrl('coco40'),
        thumbnail: getThumbnailUrl('coco40'),
        createdBy: 'Les Quatre Cousins',
        createdAt: 2026
    },
    {
        slug: 'sensdelafamille',
        title: 'Coco - Sens de la famille',
        info: 'Grand Corps Malade - Le sens de la famille',
        type: 'asset',
        src: getVideoUrl('sensdelafamille'),
        thumbnail: getThumbnailUrl('sensdelafamille'),
        createdBy: 'Hugo / Liam / Mark',
        createdAt: 2026
    },
    {
        slug: '10minside',
        title: 'Coco - 10 minutes inside',
        info: 'Reportage 40 ans de Coco',
        type: 'asset',
        src: getVideoUrl('10minside'),
        thumbnail: getThumbnailUrl('10minside'),
        createdBy: 'Mark',
        createdAt: 2026
    },
    {
        slug: 'zentv1',
        title: 'ZenTV1',
        info: '24/7 steaming channel',
        type: 'live',
        src: getLiveUrl('zentv1'),
        thumbnail: getThumbnailUrl('zentv1', 'gif'),
    },
    {
        slug: 'zentv1lite',
        title: 'ZenTV1 (ads)',
        info: '24/7 steaming channel with ads',
        type: 'live',
        src: getBpkioStreamUrl('zentv1'),
        thumbnail: getThumbnailUrl('zentv1lite'),
    },
    {
        slug: 'kidsclips',
        title: 'Kids Clips TV',
        info: '24/7 clips des cousins',
        type: 'live',
        src: getLiveUrl('kidsclips'),
        thumbnail: getThumbnailUrl('kidsclips', 'gif'),
    },
]

export function getVideoUrl(slug: string): string {
    return `${BASE_URL}/${slug}/master.m3u8`
}

export function getLiveUrl(slug: string): string {
    return `${LIVE_BASE_URL}/${slug}/master.m3u8`
}

export function getBpkioStreamUrl(slug: string): string {
    return `${BPKIO_STREAM_URL}/${slug}/master.m3u8`
}

export function getThumbnailUrl(slug: string, extension: string = 'jpg'): string {
    return `${BASE_URL}/${slug}/preview.${extension}`
}

export function getVideoBySlug(slug: string): Video | undefined {
    return videos.find((video) => video.slug === slug)
}
