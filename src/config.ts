// 博客主题全局配置文件

// 站点基本信息
export const siteConfig = {
    title: 'Rudeus 主题文档', // 站点标题
    subtitle: '一个基于 Astro 的简洁博客主题', // 站点副标题
    description: 'Rudeus 是一个基于 Astro 的简洁的博客主题', // SEO 站点描述
    license: {
        enabled: true, // 是否启用版权声明
        name: 'CC BY-SA 4.0', // 版权类型
        url: 'https://creativecommons.org/licenses/by-sa/4.0/', // 版权链接
        prompt: '除特殊声明转载之外，本文由博主云萧原创且非 AI 生成内容，依据 [license] 许可协议授权，若需转载请注明出处及本声明。',
        // 显示在页面的版权提示语，可使用 [license] 占位符来插入协议链接
    },
}

// 导航栏链接配置
export const navConfig = [
    { name: '友情链接', url: '/friends' },
    { name: '关于', url: '/about' },
    { name: '归档', url: '/archives' },
]

// 个人信息配置
export const profileConfig = {
    name: '云萧是个咕咕怪', // 昵称
    avatar: '/avatar.jpg', // 头像路径
    // 如果头像在外部链接，直接填写 URL
    // 如果在项目内，填写以 /public 为 base 的相对链接
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', // 简介
}

// 页脚信息配置
export const footerConfig = {
    copyright: '© 2025-2026 crrashh1542.', // 版权
    message: `<a href="https://beian.miit.gov.cn" target="_blank">蜀ICP备2022029657号-2</a> |
              <a href="https://icp.gov.moe/?keyword=20220551">萌ICP备20220551号</a>`, // 额外需要展示的消息，可以是 HTML
}
