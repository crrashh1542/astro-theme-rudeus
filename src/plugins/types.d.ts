type Text = {
    type: string
    value: string
}

type Paragraph = {
    type: 'paragraph'
    data?: {
        hName?: string
        hProperties?: {
            className?: string[]
        }
    }
    children: Array<Text | any>
}

type Root = {
    type: 'root'
    children: any[]
}

type ContainerDirective = {
    type?: string
    name?: string
    children?: any[]
    data?: Record<string, unknown>
    label?: unknown
    attributes?: Record<string, unknown>
}
