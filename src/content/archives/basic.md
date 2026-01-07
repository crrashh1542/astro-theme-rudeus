---
title: Rudeus 主题样式预览
description: 本页用于展示 Rudeus 主题的基本 Markdown 样式
pubDate: 2026-01-07
tags: ['主题', '预览']
---

# Hello, world!

## 段落及行内样式
这是使用 **Astro** 构建的博客框架。这是使用 *Astro* 构建的博客框架。这是使用 ***Astro*** 构建的博客框架。这是使用 ~~Astro~~ 构建的博客框架。这是使用 `Astro` 构建的博客框架。

本项目的开源地址：[crrashh1542/astro-theme-rudeus](https://github.com/crrashh1542/astro-theme-rudeus)

回到[文档主页](/)

## 列表
- Astro
- Less
- TypeScript

## 图片
![Pixiv ID 121853651](https://mdn.alipayobjects.com/afts/video/A*OIdYSYjttQ4AAAAAa7AAAAgAevx4AQ)
作品 Pixiv ID：121853651

## 引用
> 天青色等烟雨  而我在等你
>
> 炊烟袅袅升起  晕开了结局
>
> 如传世的的青花瓷自顾自美丽
>
> 你眼带笑意

## 表格
|  名字       | 代表色  | 寿命 |
|------------|--------|------|
| Rudeus     | 橙黄色  | 74   |
| Sylphiette | 绿/白色 | 150+ |
| Eris       | 红色    | 74   |
| Roxy       | 蓝色    | 200+ |
| Orsterd    | 白色    | ?    |

## 代码块
```javascript
export default function(){
    console.log('Hello, world!')
}
```

## 任务列表
- [x] 和七星交谈
- [ ] 给艾莉丝写信
- [ ] 怀疑人神但不要与人神为敌

## 自定义 HTML

### 音频播放（APlayer）

<div id="ap-0"></div>
<link rel="stylesheet" href="https://lf3-cdn-tos.bytedcdn.com/cdn/expire-1-M/aplayer/1.10.1/APlayer.min.css" />
<script>
    let scriptA = document.createElement('script')
    scriptA.src = 'https://lf3-cdn-tos.bytedcdn.com/cdn/expire-1-M/aplayer/1.10.1/APlayer.min.js'
    scriptA.onload = () => {
        new APlayer({
            container: document.getElementById('ap-0'),
            lrcType: 3,
            loop: 'none',
            audio: [
                {
                    name: '不为谁而作的歌',
                    artist: '林俊杰',
                    cover: 'https://mdn.alipayobjects.com/afts/video/A*KDUwTJphimIAAAAAQPAAAAgAevx4AQ',
                    url: 'https://s3plus.meituan.net/opapisdk/op_ticket_1_5673241091_1767601449151_qdqqd_j22khu.mp3',
                    lrc: 'https://s3plus.meituan.net/opapisdk/op_ticket_1_5677168484_1767601309022_qdqqd_pu1zfr.lrc'
                },
                {
                    name: '夜的第七章',
                    artist: '周杰伦',
                    cover: 'https://mdn.alipayobjects.com/afts/video/A*w_BdTo326s4AAAAAQpAAAAgAevx4AQ',
                    url: 'https://s3plus.meituan.net/opapisdk/op_ticket_1_5673241091_1767601729441_qdqqd_mpyue3.mp3',
                    lrc: 'https://s3plus.meituan.net/opapisdk/op_ticket_1_5677168484_1767601765484_qdqqd_mmo7nr.lrc'
                },
                {
                    name: '夜に駆ける',
                    artist: 'YOASOBI',
                    cover: 'https://mdn.alipayobjects.com/afts/video/A*sh8tQY1SVIwAAAAAQXAAAAgAevx4AQ',
                    url: 'https://s3plus.meituan.net/opapisdk/op_ticket_1_885190757_1767602419737_qdqqd_bgfe3k.mp3',
                    lrc: 'https://s3plus.meituan.net/opapisdk/op_ticket_1_5677168484_1767602492030_qdqqd_l5zivl.lrc'
                }
            ]
        })
    }
    document.head.appendChild(scriptA)
</script>

### 视频播放（DPlayer）
<div id="dp-0"></div>
<script>
    let scriptD = document.createElement('script')
    scriptD.src = 'https://lf3-cdn-tos.bytedcdn.com/cdn/expire-1-M/dplayer/1.26.0/DPlayer.min.js'
    scriptD.onload = () => {
        new DPlayer({
            container: document.getElementById('dp-0'),
            screenshot: true,
            video: {
                url: 'https://printidea-img.oss-cn-hangzhou.aliyuncs.com/reference/pc/2025/09/23/4910920//695b7eafd3ef3/c27e263b66a1631df3b00d8eccaac8db.mp4',
                pic: 'https://mdn.alipayobjects.com/afts/video/A*bnFTRL3Mb6YAAAAAXUAAAAgAevx4AQ',
            }
        })
    }
    document.head.appendChild(scriptD)
</script>

注：由于路由的加载情况特殊，如果需要从外部引入 JS 脚本，请不要使用以下方式：
```html
<script src="path/to/foo.js"></script>
<script>
    console.log(foo)
</script>
```
因为这会导致每次重载页面的时候，下方的 `<script>` 同时加载，导致其中部分来自 `src` 中的变量无法读取。以下是正确姿势：
```html
<script>
    // 通过 JS 动态创建 script 标签
    let script = document.createElement('script')
    script.src = 'path/to/foo.js'
    // 等到加载完再执行程序体
    script.onload = () => {
        console.log(foo)
    }
</script>
```