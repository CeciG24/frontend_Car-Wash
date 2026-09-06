// Official TikTok player: https://developers.tiktok.com/doc/embed-player
export function getPortfolioMedia(value) {
  try {
    const url = new URL(value);
    if (!['https:', 'http:'].includes(url.protocol)) return { type: 'invalid' };
    const isTikTok = url.hostname === 'tiktok.com' || url.hostname.endsWith('.tiktok.com');
    if (isTikTok) {
      const match = url.pathname.match(/^\/@[^/]+\/video\/(\d+)\/?$/) ||
        url.pathname.match(/^\/player\/v1\/(\d+)\/?$/);
      if (match) return {
        type: 'tiktok',
        url: url.href,
        embed: `https://www.tiktok.com/player/v1/${match[1]}?autoplay=0&controls=1&rel=0`
      };
      return { type: 'link', url: url.href };
    }
    if (/\.(mp4|webm|ogg|mov)$/i.test(url.pathname)) return { type: 'video', url: url.href };
    return { type: 'invalid' };
  } catch { return { type: 'invalid' }; }
}

