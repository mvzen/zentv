export interface Video {
    id: string
    title: string
    createdAt: number
}

const BASE_URL = 'https://videos.mvzen.com'

export const videos: Video[] = [
    { id: 'flo60', title: 'Florence (60 ans) - Diamonds & Rust', createdAt: 2018 },
    { id: 'lily80', title: 'Lily (80 ans) - The Sound of Silence', createdAt: 2022 },
    { id: 'christine70', title: 'Christine (70 ans) - Telling Stories', createdAt: 2023 },
    { id: 'coco40', title: 'Coco (40 ans) - On Ecrit sur les Murs', createdAt: 2026 },
    { id: 'sensdelafamille', title: 'Coco - Sens de la Famille', createdAt: 2026 },
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
