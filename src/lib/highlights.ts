export interface HighlightPhoto {
  key: string;
  src: string;
  srcSet: string;
}

const SIZED_FILE = /^(.+)-(800|1800)\.jpg$/;
const WIDTHS = ["800", "1800"] as const;

export function pairHighlights(files: Record<string, string>): HighlightPhoto[] {
  const byPhoto = new Map<string, Partial<Record<(typeof WIDTHS)[number], string>>>();

  for (const [filePath, url] of Object.entries(files)) {
    const name = filePath.split("/").pop() ?? filePath;
    const match = SIZED_FILE.exec(name);
    if (!match) continue;
    const base = match[1];
    const width = match[2] as (typeof WIDTHS)[number];
    byPhoto.set(base, { ...byPhoto.get(base), [width]: url });
  }

  return [...byPhoto.keys()]
    .sort((a, b) => a.localeCompare(b))
    .map((base) => {
      const sizes = byPhoto.get(base) ?? {};
      const available = WIDTHS.filter((w) => sizes[w]);
      return {
        key: base,
        src: sizes["1800"] ?? sizes["800"] ?? "",
        srcSet: available.map((w) => `${sizes[w]} ${w}w`).join(", "),
      };
    });
}
