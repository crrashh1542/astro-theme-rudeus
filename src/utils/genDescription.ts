// 此脚本用于在未提供 description 的 frontmatter 时，
// 自动文章的提取前 80 字作为 description

export function genDescription(raw: string, maxLength = 80): string {
    // 干掉 frontmatter
    const prePlain = raw.replace(/^---[\s\S]*?---\s*/, '')
    // 干掉 md 语法，合并空白字符
    const plain = prePlain
        .replace(/`{3}[\s\S]*?`{3}/g, ' ')
        .replace(/`[^`]*`/g, ' ')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/<[^>]*>/g, ' ')
        .replace(/[#>*_~\-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()

    return plain.slice(0, maxLength)
}
