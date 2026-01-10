/**
 * Admonitions for Markdown directives.
 * 注：由 GPT-5.2 生成
 */

import type { Paragraph, Root, Text } from 'mdast'
import type { ContainerDirective } from 'mdast-util-directive'
import { visit } from 'unist-util-visit'

const DEFAULT_TITLES: Record<string, string> = {
    note: 'Note',
    tip: 'Tip',
    important: 'Important',
    warning: 'Warning',
    caution: 'Caution',
}

const DEFAULT_TITLE_SET = new Set(Object.values(DEFAULT_TITLES))

const createTitleParagraph = (title: string): Paragraph => {
    const text: Text = { type: 'text', value: title }
    return {
        type: 'paragraph',
        data: {
            hName: 'p',
            hProperties: {
                className: ['r-admonition-title'],
            },
        },
        children: [text],
    }
}

const toPlainText = (node: unknown): string => {
    if (Array.isArray(node)) return node.map(toPlainText).join('')
    if (!node || typeof node !== 'object') return ''
    const anyNode = node as any
    if (anyNode.type === 'text' && typeof anyNode.value === 'string') return anyNode.value
    if (Array.isArray(anyNode.children)) return anyNode.children.map(toPlainText).join('')
    return ''
}

const pickCustomTitle = (directive: { label?: unknown; attributes?: Record<string, unknown> }): string | undefined => {
    // `:::note[title]` may be stored in `label` depending on directive parser.
    const label = directive.label
    const labelText = toPlainText(label).trim()
    if (labelText) return labelText

    // Also allow `:::note{title="..."}` style (not required, but harmless).
    const attrTitle = directive.attributes?.title
    const attrText = toPlainText(attrTitle).trim()
    return attrText || undefined
}

function remarkAdmonition() {
    return (tree: Root) => {
        visit(tree, (node) => {
            if (node.type !== 'containerDirective') return

            const directive = node as unknown as ContainerDirective & {
                data?: Record<string, unknown>
                label?: unknown
                attributes?: Record<string, unknown>
            }

            const name = directive.name
            if (!name || !(name in DEFAULT_TITLES)) return

            const type = name as keyof typeof DEFAULT_TITLES
            const title = pickCustomTitle(directive) || DEFAULT_TITLES[type]

            // Prevent downstream renderers from emitting the label as standalone content.
            if ((directive as any).label != null) (directive as any).label = undefined

            directive.data ||= {}
            directive.data.hName = 'aside'
            directive.data.hProperties = {
                className: ['r-admonition', `r-admonition-${name}`],
                'data-admonition': name,
            }

            directive.children ||= []
            directive.children.unshift(createTitleParagraph(title))
        })
    }
}

// -----------------------------
// Rehype phase fix-up
// -----------------------------

type HastElement = { type: 'element'; tagName: string; properties?: any; children?: any[] }

const isElement = (node: any): node is HastElement =>
    Boolean(node && typeof node === 'object' && node.type === 'element' && typeof node.tagName === 'string')

const getText = (node: any): string => {
    if (!node || typeof node !== 'object') return ''
    if (Array.isArray(node)) return node.map(getText).join('')
    if (node.type === 'text' && typeof node.value === 'string') return node.value
    if (Array.isArray(node.children)) return node.children.map(getText).join('')
    return ''
}

const hasClass = (node: any, className: string): boolean => {
    const cls = node?.properties?.className
    if (typeof cls === 'string') return cls.split(/\s+/).includes(className)
    if (Array.isArray(cls)) return cls.includes(className)
    return false
}

function rehypeAdmonitionTitle() {
    return (tree: any) => {
        visit(tree, 'element', (node: any) => {
            // 把被渲染为正文的 `[title]` 提升为真正标题（仅当当前标题还是默认值时）。
            if (!isElement(node)) return
            if (node.tagName !== 'aside') return
            if (!hasClass(node, 'r-admonition')) return
            if (!Array.isArray(node.children) || node.children.length < 3) return

            const first = node.children[0]
            const second = node.children[1]

            if (!isElement(first) || first.tagName !== 'p' || !hasClass(first, 'r-admonition-title')) return
            if (!isElement(second) || second.tagName !== 'p') return

            const currentTitle = getText(first).trim()
            if (!DEFAULT_TITLE_SET.has(currentTitle)) return

            const candidateTitle = getText(second).trim()
            if (!candidateTitle) return
            if (candidateTitle.length > 24) return

            first.children = [{ type: 'text', value: candidateTitle }]
            node.children.splice(1, 1)
        })
    }
}

const admonitions = {
    remark: remarkAdmonition,
    rehype: rehypeAdmonitionTitle,
} as const

export default admonitions
