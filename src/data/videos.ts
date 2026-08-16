export interface Video {
  id: string
  title: string
}

const BASE_URL = 'https://videos.mvzen.com'

export const videos: Video[] = [
  { id: 'flo60', title: 'Florence (60 ans) - Diamonds & Rust' },
  { id: 'lily80', title: 'Lily (80 ans) - The Sound of Silence' },
  { id: 'christine70', title: 'Christine (70 ans) - Telling Stories' },
  { id: 'coco40', title: 'Coco (40 ans) - On Ecrit sur les Murs' },
  { id: 'sensdelafamille', title: 'Coco - Sens de la Famille' },
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
