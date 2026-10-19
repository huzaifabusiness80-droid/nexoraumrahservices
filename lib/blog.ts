export function createBlogSlug(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180);
}

export function getBlogReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export type BlogContentBlock =
  | { type: "paragraph"; content: string }
  | { type: "heading"; level: 2 | 3; content: string }
  | { type: "list"; items: string[] };

export function parseBlogContent(content: string): BlogContentBlock[] {
  const blocks: BlogContentBlock[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: "paragraph", content: paragraph.join("\n") });
      paragraph = [];
    }
  };
  const flushList = () => {
    if (listItems.length) {
      blocks.push({ type: "list", items: listItems });
      listItems = [];
    }
  };

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    const headingMatch = line.match(/^(#{2,3})\s+(.+)$/);
    const listMatch = line.match(/^[-*]\s+(.+)$/);

    if (!line) {
      flushParagraph();
      flushList();
    } else if (headingMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading",
        level: headingMatch[1].length === 2 ? 2 : 3,
        content: headingMatch[2],
      });
    } else if (listMatch) {
      flushParagraph();
      listItems.push(listMatch[1]);
    } else {
      flushList();
      paragraph.push(line);
    }
  }

  flushParagraph();
  flushList();
  return blocks;
}
