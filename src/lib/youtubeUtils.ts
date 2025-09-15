// src/lib/youtubeUtils.ts

export interface YouTubeVideoInfo {
  videoId: string;
  watchUrl: string;
  embedUrl: string;
  thumbnail: string;
  title?: string;
}

export class YouTubeService {
  private static ID_PATTERN = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|.*[?&]v=))([\w-]{11})/;

  static extractVideoId(url: string): string | null {
    const match = url.match(this.ID_PATTERN);
    return match ? match[1] : null;
  }

  static isValidUrl(url: string): boolean {
    return !!this.extractVideoId(url);
  }

  static async getVideoInfo(url: string): Promise<YouTubeVideoInfo | null> {
    const videoId = this.extractVideoId(url);
    if (!videoId) return null;

    const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    let thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    let title: string | undefined;

    try {
      const res = await fetch(
        `https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`
      );
      if (res.ok) {
        const data = await res.json();
        title = data.title;
        thumbnail = data.thumbnail_url || thumbnail;
      }
    } catch {
      // ignore
    }

    return { videoId, watchUrl, embedUrl, thumbnail, title };
  }

  static generateEmbedHtml(
    videoId: string,
    opts: { width?: number; height?: number } = {}
  ): string {
    const { width = 560, height = 315 } = opts;
    const src = `https://www.youtube.com/embed/${videoId}`;
    return `<iframe width="${width}" height="${height}" src="${src}" frameborder="0" allowfullscreen></iframe>`;
  }
}
