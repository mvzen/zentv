export interface Video {
    id: string
    title: string
    info: string
    src: string
    thumbnail: string
    createdBy: string
    createdAt: number
}

const BASE_URL = 'https://videos.mvzen.com'

export const vod: Video[] = [
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
]

export function getStreamUrl(id: string): string {
    return `${BASE_URL}/${id}/master.m3u8`
}

export function getThumbnailUrl(id: string): string {
    return `${BASE_URL}/${id}/preview.jpg`
}

export function getVideoById(id: string): Video | undefined {
    return vod.find((video) => video.id === id)
}
