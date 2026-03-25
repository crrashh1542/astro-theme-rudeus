// 用于获取首页文章和说说列表

import { getCollection, type CollectionEntry } from 'astro:content'

export interface HomeArchiveItem {
    type: 'archive'
    entry: CollectionEntry<'archives'>
}

export interface HomeZoneItem {
    type: 'zone'
    entry: CollectionEntry<'zone'>
}

export type HomeFeedItem = HomeArchiveItem | HomeZoneItem

export const getHomeFeed = async (): Promise<HomeFeedItem[]> => {
    const [archives, zones] = await Promise.all([getCollection('archives'), getCollection('zone')])

    return [
        ...archives.map((entry) => ({ type: 'archive' as const, entry })),
        ...zones.map((entry) => ({ type: 'zone' as const, entry })),
    ].sort((a, b) => b.entry.data.pubDate.valueOf() - a.entry.data.pubDate.valueOf())
}
