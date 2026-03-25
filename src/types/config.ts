// src/config.ts 站点配置类型定义

export type SiteConfig = {
    title: string
    subtitle: string
    description: string
    license: {
        enabled: boolean
        name?: string
        url?: string
        prompt?: string
    }
    isWithExt: boolean
    background: {
        enabled: boolean
        url?: {
            light?: string
            dark?: string
        }
        opacity?: number
    }
}

export type NavConfig = Array<{
    name: string
    url: string
}>

export type ProfileConfig = {
    name: string
    avatar: string
    description: string
}

export type FooterConfig = {
    copyright?: string
    message?: string
}
