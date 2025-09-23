export function extractIdFromUrl(url: string): string | null {
  const match = url.match(/\/([a-f0-9-]+)$/);
  return match ? match[1] : null;
}
