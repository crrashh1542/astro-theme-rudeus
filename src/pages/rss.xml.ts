import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { genDescription } from '@/utils/genDescription'

import { siteConfig } from '@/config'

export async function GET(context: any) {
    const posts = (await getCollection('archives')).sort(
        (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
    )

    return rss({
        title: siteConfig.title + ' - RSS',
        description: siteConfig.description,
        site: context.site,
        items: posts.map((post) => {
            const description = post.data.description?.trim() ?? genDescription(post.body)
            return {
                title: post.data.title,
                description,
                pubDate: post.data.pubDate,
                link: `/archives/${post.id + (siteConfig.isWithExt ? '.html' : '')}`,
            }
        }),
    })
}
