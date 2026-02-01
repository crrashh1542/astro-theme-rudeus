import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { genDescription } from '@/utils/genDescription'

export async function GET(context: any) {
    const posts = (await getCollection('archives')).sort(
        (a, b) => b.data.published.valueOf() - a.data.published.valueOf()
    )

    return rss({
        title: '云萧的咕咕屋 - RSS',
        description: '以万象之不息，致不息之万象',
        site: context.site,
        items: posts.map((post) => {
            const description = post.data.description?.trim() || genDescription(post.body)
            return {
                title: post.data.title,
                description,
                pubDate: post.data.published,
                link: `/archives/${post.slug}.html`,
            }
        }),
    })
}
