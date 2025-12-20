export interface ReadingStats {
  wordsEN: number;
  charsCJK: number;
  estimatedChars: number; // 用于展示的“字数”估算
  minutes: number; // 向上取整后的分钟数
}

// 粗略移除 Markdown 语法标记，避免被统计进字数
function stripMarkdown(src: string): string {
  return src
    // 代码块
    .replace(/```[\s\S]*?```/g, " ")
    // 行内代码
    .replace(/`[^`]*`/g, " ")
    // 图片与链接
    .replace(/!\[[^\]]*\]\([^\)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^\)]*\)/g, " ")
    // 标题/列表标记
    .replace(/^\s{0,3}[#*>\-+]+\s+/gm, " ")
    // 粗体/斜体/删除线
    .replace(/([*_~]{1,3})(.*?)\1/g, "$2")
    // HTML 标签
    .replace(/<[^>]+>/g, " ");
}

export function analyzeReading(raw: string): ReadingStats {
  const text = stripMarkdown(raw || "");

  const enWords = text.match(/[A-Za-z]+/g) ?? [];
  const wordsEN = enWords.length;

  const cjkChars = text.match(/[\u4E00-\u9FFF]/g) ?? []; // 仅统计常用汉字区
  const charsCJK = cjkChars.length;

  // 展示用“字数”：汉字按 1 字计，英语粗略按 5 字母≈1 个“字”的可读体量折算
  const estimatedChars = charsCJK + Math.round(wordsEN * 5);

  // 阅读时间估算：英语 ~200 wpm，中文 ~450 cpm（每分钟字符数）
  const minutesFloat = wordsEN / 200 + charsCJK / 450;
  const minutes = Math.max(1, Math.ceil(minutesFloat));

  return { wordsEN, charsCJK, estimatedChars, minutes };
}
